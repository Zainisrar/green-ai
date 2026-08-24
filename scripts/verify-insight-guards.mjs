/**
 * Logic check for the /insights/[slug] CMS-payload guards.
 *
 * Mirrors the expressions in src/app/insights/[slug]/page.tsx and runs the OLD
 * and NEW versions against the malformed records a CMS realistically returns,
 * to confirm the old code threw and the new code does not.
 *
 * Run: node scripts/verify-insight-guards.mjs
 */

const payloads = {
  "record with slug: null in the collection": {
    data: [{ slug: null }, { slug: "/real-insight", title: "Real", keypoints: [] }],
  },
  "matched record missing keypoints": {
    data: [{ slug: "real-insight", title: "T", name2: "N", cardTitle: "C" }],
  },
  "matched record with keypoints: null": {
    data: [{ slug: "real-insight", title: "T", name2: "N", cardTitle: "C", keypoints: null }],
  },
  "matched record with null title/name2/cardTitle": {
    data: [{ slug: "real-insight", title: null, name2: null, cardTitle: null, keypoints: [] }],
  },
  "data is not an array": { data: null },
  "data omitted entirely": {},
  "healthy record (regression check)": {
    data: [{
      slug: "/real-insight/", title: "Solar", subheadline: "S", description: "D",
      name1: "A", name2: "Hotel B", cardTitle: " Card ", bgImg: "/x.png",
      keypoints: [{ icon: "i1", text: "t1" }, { icon: "i2", text: "t2" }, { icon: "i3", text: "t3" }],
      imageDirection: "right", createdAt: "2026-01-01", updatedAt: "2026-02-01",
    }],
  },
};

const SLUG = "real-insight";

// ---- OLD behaviour (pre-fix) --------------------------------------------
function oldPath(payload) {
  const found = payload.data?.find((item) => {
    const itemSlug = item.slug.replace(/^\/+|\/+$/g, ""); // throws on null slug
    return itemSlug === SLUG || itemSlug.endsWith(`/${SLUG}`);
  }) ?? null;
  if (!found) return { outcome: "404" };

  const keypoints1 = found.keypoints.slice(0, 2); // throws if keypoints missing
  const keypoints2 = found.keypoints.slice(2);
  // Downstream Insight24 does this on the default render path:
  const figmaTitle = found.title.replace(/\s*:/, " :");
  const isHotel = found.name2.toLowerCase().includes("hotel");
  const card = found.cardTitle.trim();
  return { outcome: "rendered", k1: keypoints1.length, k2: keypoints2.length, figmaTitle, isHotel, card };
}

// ---- NEW behaviour (post-fix) -------------------------------------------
function newPath(payload) {
  const records = Array.isArray(payload?.data) ? payload.data : [];
  const found = records.find((item) => {
    const itemSlug = String(item?.slug ?? "").replace(/^\/+|\/+$/g, "");
    if (!itemSlug) return false;
    return itemSlug === SLUG || itemSlug.endsWith(`/${SLUG}`);
  }) ?? null;
  if (!found) return { outcome: "404" };

  const keypoints = Array.isArray(found.keypoints) ? found.keypoints : [];
  const keypoints1 = keypoints.slice(0, 2);
  const keypoints2 = keypoints.slice(2);
  const title = found.title ?? "";
  const name2 = found.name2 ?? "";
  const cardTitle = found.cardTitle ?? "";

  const figmaTitle = title.replace(/\s*:/, " :");
  const isHotel = name2.toLowerCase().includes("hotel");
  const card = cardTitle.trim();
  return { outcome: "rendered", k1: keypoints1.length, k2: keypoints2.length, figmaTitle, isHotel, card };
}

const run = (fn, payload) => {
  try {
    return { ok: true, ...fn(payload) };
  } catch (error) {
    return { ok: false, error: `${error.constructor.name}: ${error.message}` };
  }
};

let failures = 0;
for (const [label, payload] of Object.entries(payloads)) {
  const before = run(oldPath, payload);
  const after = run(newPath, payload);

  const beforeLabel = before.ok ? before.outcome : `THREW -> 500 (${before.error})`;
  const afterLabel = after.ok ? after.outcome : `THREW -> 500 (${after.error})`;

  if (!after.ok) failures++;

  console.log(`\n${label}`);
  console.log(`  before: ${beforeLabel}`);
  console.log(`  after : ${afterLabel}`);
  if (after.ok && after.outcome === "rendered") {
    console.log(`          keypoints ${after.k1}+${after.k2}, isHotel=${after.isHotel}, card="${after.card}"`);
  }
}

console.log(
  failures === 0
    ? "\nPASS - no malformed payload throws under the new logic."
    : `\nFAIL - ${failures} payload(s) still throw.`,
);
process.exit(failures === 0 ? 0 : 1);
