"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReportsWhitepapers } from "../../../hooks/useReportsWhitepapers";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./ReportWhitePapers.module.css";

export type Report = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  year: number;
  groupId: string;
};

const figmaReports: Report[] = [
  {
    id: 1,
    title: "GRID-INTEL™ Technical Brief (2025)",
    subtitle: "AI in Energy Management",
    description:
      "What we’ve learned deploying solar-diesel-battery systems for off-grid clinics.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
    groupId: "2025-current",
  },
  {
    id: 2,
    title: "Microgrid Feasibility in Islanded PNG (2025)",
    subtitle: "Hybrid Systems",
    description:
      "What we’ve learned deploying solar-diesel-battery systems for off-grid clinics.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
    groupId: "2025-current",
  },
  {
    id: 3,
    title: "Renewable Energy Integration for Resilience",
    subtitle: "Integration Models",
    description:
      "What we’ve learned deploying solar-diesel-battery systems for off-grid clinics.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
    groupId: "2025-current",
  },
  {
    id: 4,
    title: "Energy Storage Landscape: PNG & Pacific",
    subtitle: "Storage Innovations",
    description:
      "What we’ve learned deploying solar-diesel-battery systems for off-grid clinics.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
    groupId: "2025-current",
  },
  {
    id: 5,
    title: "GRID-INTEL™ Technical Brief (2025)",
    subtitle: "AI in Energy Management",
    description:
      "What we’ve learned deploying solar-diesel-battery systems for off-grid clinics.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
    groupId: "2025-current",
  },
  {
    id: 6,
    title: "Microgrid Feasibility in Islanded PNG (2025)",
    subtitle: "Hybrid Systems",
    description:
      "What we’ve learned deploying solar-diesel-battery systems for off-grid clinics.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
    groupId: "2025-current",
  },
  {
    id: 7,
    title: "Renewable Energy Integration for Resilience",
    subtitle: "Integration Models",
    description:
      "What we’ve learned deploying solar-diesel-battery systems for off-grid clinics.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
    groupId: "2025-current",
  },
  {
    id: 8,
    title: "Energy Storage Landscape: PNG & Pacific",
    subtitle: "Storage Innovations",
    description:
      "What we’ve learned deploying solar-diesel-battery systems for off-grid clinics.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
    groupId: "2025-current",
  },
  {
    id: 9,
    title: "GRID-INTEL™ Technical Brief (2025)",
    subtitle: "AI in Energy Management",
    description:
      "What we’ve learned deploying solar-diesel-battery systems for off-grid clinics.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
    groupId: "2025-current",
  },
  {
    id: 10,
    title: "Solar Mini-Grid Standards & Operational Reliability (2024)",
    subtitle: "Mini-Grid Architectures",
    description:
      "Benchmark operational metrics and resilience data from Pacific solar mini-grid installations.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2024,
    groupId: "2024",
  },
  {
    id: 11,
    title: "Decentralized Clean Power Frameworks for Rural Healthcare (2024)",
    subtitle: "Healthcare Energy Access",
    description:
      "Engineering specifications for continuous 24/7 power delivery to rural clinics.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2024,
    groupId: "2024",
  },
  {
    id: 12,
    title: "Battery Energy Storage Integration in Tropical Climates (2024)",
    subtitle: "Storage Innovations",
    description:
      "Thermal management strategies and degradation profiles for containerized BESS units.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2024,
    groupId: "2024",
  },
  {
    id: 13,
    title: "Off-Grid Solar Electrification Benchmark (2023)",
    subtitle: "Deployment Study",
    description:
      "Comprehensive field evaluation of early mini-grid pilot projects across remote terrains.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2023,
    groupId: "2023-primary",
  },
  {
    id: 14,
    title: "Pacific Clean Energy Transition Roadmap (2023)",
    subtitle: "Regional Policy",
    description:
      "Strategic frameworks for donor-aligned renewable energy investments and infrastructure.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2023,
    groupId: "2023-primary",
  },
  {
    id: 15,
    title: "Solar PV Performance in Tropical Climates (2023)",
    subtitle: "Performance Study",
    description:
      "Measured solar PV performance across tropical operating conditions.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2023,
    groupId: "2023-archive",
  },
  {
    id: 16,
    title: "Remote Power Logistics in Highlands (2023)",
    subtitle: "Deployment Logistics",
    description:
      "A field guide to reliable energy delivery in remote highland communities.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2023,
    groupId: "2023-archive",
  },
];

// The four canonical sidebar buckets matching Figma exact character strings.
const YEAR_GROUP_META = [
  {
    id: "2025-current",
    year: 2025,
    figmaCount: 36,
    figmaItems: [
      "GRID-INTEL™ Technical Brief (2025)",
      "Microgrid Feasibility in Islanded PNG (2025)",
      "Renewable Energy Integration for Resilience",
      "Energy Storage Landscape: PNG & Pacific",
      "GRID-INTEL™ Technical Brief (2025)",
      "Microgrid Feasibility in Islanded PNG (2025)",
    ],
  },
  { id: "2024", year: 2024, figmaCount: 145 },
  { id: "2023-primary", year: 2023, figmaCount: 135 },
  { id: "2023-archive", year: 2023, figmaCount: 95 },
] as const;

type ReportGroupId = (typeof YEAR_GROUP_META)[number]["id"] | "other";

const reportGroupForApiRecord = (report: {
  year: string;
  groupId?: ReportGroupId;
  archived?: boolean;
  isArchived?: boolean;
}): ReportGroupId => {
  if (
    report.groupId &&
    ([...YEAR_GROUP_META.map((g) => g.id), "other"] as string[]).includes(
      report.groupId,
    )
  ) {
    return report.groupId;
  }

  const year = Number.parseInt(report.year, 10);
  if (!year || Number.isNaN(year)) return "other";
  if (year === 2025) return "2025-current";
  if (year === 2024) return "2024";
  if (year === 2023) {
    return report.archived || report.isArchived
      ? "2023-archive"
      : "2023-primary";
  }

  return "other";
};

/** Build sidebar groups from the actual loaded reports so counts and titles
 *  reflect Figma frame specs or live API data. */
function buildYearGroups(reports: Report[], isCanvas = false) {
  const byGroup = new Map<string, Report[]>();

  for (const report of reports) {
    const id = report.groupId;
    if (!byGroup.has(id)) byGroup.set(id, []);
    // biome-ignore lint/style/noNonNullAssertion: initialised in line above.
    byGroup.get(id)!.push(report);
  }

  const groups: Array<{
    id: string;
    year: number | string;
    count: number;
    items: string[];
  }> = [];

  for (const meta of YEAR_GROUP_META) {
    const groupReports = byGroup.get(meta.id) ?? [];
    if (!isCanvas && groupReports.length === 0) continue;
    const items =
      isCanvas && "figmaItems" in meta && meta.figmaItems
        ? [...meta.figmaItems]
        : groupReports.map((r) => r.title);

    groups.push({
      id: meta.id,
      year: meta.year,
      count:
        isCanvas && "figmaCount" in meta
          ? meta.figmaCount
          : groupReports.length,
      items,
    });
  }

  const otherReports = byGroup.get("other") ?? [];
  if (otherReports.length > 0) {
    groups.push({
      id: "other",
      year: "Other",
      count: otherReports.length,
      items: otherReports.map((r) => r.title),
    });
  }

  return groups;
}

export interface ReportWhitePapersProps {
  canvas?: boolean;
  onNodeChange?: (nodeId: string) => void;
  initialView?: "list" | "grid";
}

export default function ReportWhitePapers({
  canvas = false,
  onNodeChange,
  initialView = "list",
}: ReportWhitePapersProps) {
  const [view, setView] = useState<"list" | "grid">(initialView);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(
    "2025-current",
  );
  const [expandedYear, setExpandedYear] = useState("2025-current");
  const [page, setPage] = useState(1);
  const [previewReport, setPreviewReport] = useState<Report | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previewInvokerRef = useRef<HTMLElement | null>(null);
  const { data: apiReports } = useReportsWhitepapers();

  // Support URL param ?view=grid or ?view=list on direct navigation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get("view");
      if (viewParam === "grid" || viewParam === "list") {
        setView(viewParam);
      }
    }
  }, []);

  // Compute active Figma node ID across the three target states:
  // 7077:5959 -> Document Preview Modal
  // 7077:5454 -> Grid View
  // 7077:5298 -> Default List View
  const activeNodeId = useMemo(() => {
    if (previewReport) return "7077:5959";
    if (view === "grid") return "7077:5454";
    return "7077:5298";
  }, [previewReport, view]);

  useEffect(() => {
    onNodeChange?.(activeNodeId);
  }, [activeNodeId, onNodeChange]);

  useEffect(() => {
    if (!previewReport) return;
    const previouslyFocused =
      previewInvokerRef.current ?? document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewReport(null);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      (previouslyFocused as HTMLElement | null)?.focus();
    };
  }, [previewReport]);

  const reports = useMemo<Report[]>(() => {
    if (!apiReports?.length) return figmaReports;

    return apiReports.map((report) => ({
      id: report.id,
      title: report.title,
      subtitle: report.subtitle,
      description: report.description,
      image: report.featuredImg.src,
      href: report.pptx,
      year: Number.parseInt(report.year, 10) || 2025,
      groupId: reportGroupForApiRecord(report),
    }));
  }, [apiReports]);

  // List view displays 6 rows per page (Figma 7077:5298).
  // Grid view displays 9 cards in a 3x3 matrix (Figma 7077:5454).
  const PAGE_SIZE = view === "grid" ? 9 : 6;

  const filteredReports = useMemo(() => {
    return activeGroupId
      ? reports.filter((report) => report.groupId === activeGroupId)
      : reports;
  }, [activeGroupId, reports]);

  const pageCount = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, pageCount));
  }, [pageCount]);

  const visibleReports = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredReports.slice(start, start + PAGE_SIZE);
  }, [filteredReports, page, PAGE_SIZE]);

  const yearGroups = useMemo(
    () => buildYearGroups(reports, canvas && !apiReports?.length),
    [reports, canvas, apiReports],
  );

  const openPreview = (report: Report, invoker: HTMLButtonElement) => {
    previewInvokerRef.current = invoker;
    setPreviewReport(report);
  };

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`.trim()}
      data-node-id={activeNodeId}
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />
      <img
        loading="lazy"
        decoding="async"
        className={styles.verticalTitle}
        src="/images/reports/reports.png"
        alt="Reports and Whitepapers"
      />

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1>
            <span>Reports &amp;</span> Whitepapers
          </h1>
          <h2>Research that powers policy, investment, and innovation.</h2>
          <p>
            From remote microgrids to intelligent hybrid architectures — our
            work in the field is driving data-backed insights, engineering
            frameworks, and decision-grade research. <strong>GREEN</strong>{" "}
            publishes original reports to inform ministries, funders, policy
            developers, and sector innovators shaping the energy transition
            across PNG and beyond.
          </p>
        </header>

        <div className={styles.layout}>
          <section
            className={styles.results}
            aria-label="Reports and whitepapers"
          >
            <div className={styles.toolbar}>
              <h3 className={view === "grid" ? styles.toolbarPlaceholder : ""}>
                Title
              </h3>
              <div className={styles.toggles}>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${view === "list" ? styles.toggleActive : ""}`}
                  onClick={() => setView("list")}
                  aria-label="List view"
                  aria-pressed={view === "list"}
                >
                  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
                    <rect width="20" height="3" rx="1" fill="currentColor" />
                    <rect
                      y="6"
                      width="20"
                      height="3"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      y="12"
                      width="20"
                      height="3"
                      rx="1"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${view === "grid" ? styles.toggleActive : ""}`}
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect
                      width="7.5"
                      height="7.5"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <rect
                      x="10.5"
                      width="7.5"
                      height="7.5"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <rect
                      y="10.5"
                      width="7.5"
                      height="7.5"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <rect
                      x="10.5"
                      y="10.5"
                      width="7.5"
                      height="7.5"
                      rx="1.5"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {view === "list" ? (
              <>
                <div className={styles.list}>
                  {visibleReports.map((report) => (
                    <ReportRow
                      key={report.id}
                      report={report}
                      onView={openPreview}
                    />
                  ))}
                </div>
                <Pagination
                  page={page}
                  pageCount={pageCount}
                  onChange={setPage}
                />
              </>
            ) : (
              <>
                <div className={styles.cards}>
                  {visibleReports.map((report) => (
                    <ReportCard
                      key={report.id}
                      report={report}
                      onView={openPreview}
                    />
                  ))}
                </div>
                {pageCount > 1 ? (
                  <Pagination
                    page={page}
                    pageCount={pageCount}
                    onChange={setPage}
                  />
                ) : null}
              </>
            )}
          </section>

          <aside className={styles.sidebar} aria-label="Reports by year">
            <div className={styles.filters}>
              {yearGroups.map((group) => (
                <div className={styles.yearGroup} key={group.id}>
                  <button
                    type="button"
                    className={expandedYear === group.id ? styles.active : ""}
                    aria-expanded={expandedYear === group.id}
                    aria-controls={`reports-year-${group.id}`}
                    onClick={() => {
                      const isExpanded = expandedYear === group.id;
                      setExpandedYear(isExpanded ? "" : group.id);
                      setActiveGroupId(isExpanded ? null : group.id);
                      setPage(1);
                    }}
                  >
                    {group.year}{" "}
                    <span className={styles.yearCount}>({group.count})</span>
                  </button>
                  {expandedYear === group.id && group.items.length > 0 ? (
                    <ul id={`reports-year-${group.id}`}>
                      {group.items.map((item, itemIndex) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: titles can repeat across groups.
                        <li key={`${group.id}-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
            <div className={styles.quote}>
              <img
                loading="lazy"
                decoding="async"
                className={styles.quoteLeft}
                src="/images/reports/shape1.png"
                alt=""
              />
              <p>
                We Don&apos;t Just <strong>Build</strong> Systems.
                <br />
                We Build <strong>Evidence.</strong>
              </p>
              <img
                loading="lazy"
                decoding="async"
                className={styles.quoteRight}
                src="/images/reports/shape2.png"
                alt=""
              />
            </div>
          </aside>
        </div>
      </div>

      {previewReport ? (
        <div
          className={canvas ? styles.canvasModalBackdrop : styles.modalBackdrop}
          onClick={() => setPreviewReport(null)}
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Document Preview"
          >
            <button
              type="button"
              ref={closeButtonRef}
              className={styles.modalClose}
              onClick={() => setPreviewReport(null)}
              aria-label="Close document preview"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 4L16 16M16 4L4 16"
                  stroke="#303030"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className={styles.modalScrollTrack} aria-hidden="true" />
            <div className={styles.modalDocScroll}>
              <img
                src="/images/reports/report-modal-doc.png"
                alt={previewReport.title}
                className={styles.modalDocImage}
              />
            </div>
          </div>
        </div>
      ) : null}

      {canvas ? (
        <D6Chatbot canvasAnchored triggerVariant="figmaCanvas" />
      ) : (
        <D6Chatbot />
      )}
    </main>
  );
}

function reportUrl(href: string) {
  return href
    ? `https://greencms.percepco.co.uk/${href.replace(/^\/+/, "")}`
    : "#";
}

function ReportRow({
  report,
  onView,
}: {
  report: Report;
  onView?: (report: Report, invoker: HTMLButtonElement) => void;
}) {
  const href = reportUrl(report.href);
  return (
    <article className={styles.row}>
      <h4>{report.title}</h4>
      <span>{report.subtitle}</span>
      <div className={styles.actions}>
        <a
          href={href}
          download={Boolean(report.href)}
          className={styles.listDownloadBtn}
          aria-label={`Download ${report.title}`}
        >
          <img
            loading="lazy"
            decoding="async"
            src="/images/reports/download.png"
            alt="Download report"
          />
        </a>
        <button
          type="button"
          className={styles.listViewBtn}
          onClick={(event) => onView?.(report, event.currentTarget)}
          aria-label={`View ${report.title}`}
        >
          <img
            loading="lazy"
            decoding="async"
            src="/images/reports/view.png"
            alt="View report"
          />
        </button>
      </div>
    </article>
  );
}

function ReportCard({
  report,
  onView,
}: {
  report: Report;
  onView?: (report: Report, invoker: HTMLButtonElement) => void;
}) {
  const href = reportUrl(report.href);
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h4 className={styles.cardTitle}>{report.title}</h4>
        <span className={styles.cardSubtitle}>{report.subtitle}</span>
      </div>
      <div className={styles.cardBody}>
        <img
          loading="lazy"
          decoding="async"
          className={styles.cardThumb}
          src={report.image}
          alt={report.title}
        />
        <div className={styles.cardDetails}>
          <p className={styles.cardDesc}>{report.description}</p>
          <div className={styles.cardActions}>
            <a
              href={href}
              download={Boolean(report.href)}
              className={styles.gridDownloadBtn}
              aria-label={`Download ${report.title}`}
            >
              <img
                loading="lazy"
                decoding="async"
                src="/images/reports/download.png"
                alt="Download report"
              />
            </a>
            <button
              type="button"
              className={styles.gridViewBtn}
              onClick={(event) => onView?.(report, event.currentTarget)}
              aria-label={`View ${report.title}`}
            >
              <img
                loading="lazy"
                decoding="async"
                src="/images/reports/view.png"
                alt="View report"
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  return (
    <nav className={styles.pagination} aria-label="Reports pages">
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        ‹‹
      </button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map(
        (item) => (
          <button
            type="button"
            key={item}
            className={item === page ? styles.pageActive : ""}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="Next page"
        onClick={() => onChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
      >
        ››
      </button>
    </nav>
  );
}
