"use client";

import { useMemo, useState } from "react";
import { useReportsWhitepapers } from "../../../hooks/useReportsWhitepapers";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./ReportWhitePapers.module.css";

type Report = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  year: number;
};

const figmaReports: Report[] = [
  {
    id: 1,
    title: "GRID-INTEL™ Technical Brief (2025)",
    subtitle: "AI in Energy Management",
    description:
      "A practical briefing on intelligent monitoring and better energy decisions.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
  },
  {
    id: 2,
    title: "Microgrid Feasibility in Islanded PNG (2025)",
    subtitle: "Hybrid Systems",
    description:
      "Field-tested guidance for resilient hybrid systems in islanded communities.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
  },
  {
    id: 3,
    title: "Renewable Energy Integration for Resilience",
    subtitle: "Integration Models",
    description:
      "Models for integrating renewable generation into dependable local networks.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
  },
  {
    id: 4,
    title: "Energy Storage Landscape: PNG & Pacific",
    subtitle: "Storage Innovations",
    description:
      "A regional view of storage technologies, use cases, and delivery conditions.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
  },
  {
    id: 5,
    title: "GRID-INTEL™ Technical Brief (2025)",
    subtitle: "AI in Energy Management",
    description:
      "A practical briefing on intelligent monitoring and better energy decisions.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
  },
  {
    id: 6,
    title: "Microgrid Feasibility in Islanded PNG (2025)",
    subtitle: "Hybrid Systems",
    description:
      "Field-tested guidance for resilient hybrid systems in islanded communities.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
  },
];

const yearGroups = [
  {
    year: 2025,
    count: 36,
    items: [
      "GRID-INTEL™ Technical Brief (2025)",
      "Microgrid Feasibility in Islanded PNG (2025)",
      "Renewable Energy Integration for Resilience",
      "Energy Storage Landscape: PNG & Pacific",
      "GRID-INTEL™ Technical Brief (2025)",
      "Microgrid Feasibility in Islanded PNG (2025)",
    ],
  },
  { year: 2024, count: 145, items: [] },
  { year: 2023, count: 135, items: [] },
  { year: 2023, count: 95, items: [] },
] as const;

interface ReportWhitePapersProps {
  canvas?: boolean;
}

export default function ReportWhitePapers({
  canvas = false,
}: ReportWhitePapersProps) {
  const [view, setView] = useState<"list" | "grid">("list");
  const [year, setYear] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const { data: apiReports } = useReportsWhitepapers();

  const reports = useMemo<Report[]>(() => {
    // The Figma canvas is a curated six-card editorial state. Keep it
    // deterministic so a live API response cannot change the visual frame.
    if (canvas || !apiReports?.length) return figmaReports;

    return apiReports.map((report) => ({
      id: report.id,
      title: report.title,
      subtitle: report.subtitle,
      description: report.description,
      image: report.featuredImg.src,
      href: report.pptx,
      year: Number.parseInt(report.year, 10) || 2025,
    }));
  }, [apiReports, canvas]);

  const visibleReports = year
    ? reports.filter((report) => report.year === year)
    : reports;

  return (
    <main className={styles.page} data-node-id="7077:5298">
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />
      <img
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
            work in the field is driving data-based insights, engineering
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
              <h3>{view === "list" ? "Title" : "Reports"}</h3>
              <div className={styles.toggles}>
                <button
                  type="button"
                  className={view === "list" ? styles.selected : ""}
                  onClick={() => setView("list")}
                  aria-label="List view"
                >
                  <img src="/images/reports/threeBar.png" alt="" />
                </button>
                <button
                  type="button"
                  className={view === "grid" ? styles.selected : ""}
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                >
                  <img src="/images/reports/grid.png" alt="" />
                </button>
              </div>
            </div>
            {view === "list" ? (
              <>
                <div className={styles.list}>
                  {visibleReports.map((report) => (
                    <ReportRow key={report.id} report={report} />
                  ))}
                </div>
                <Pagination page={page} onChange={setPage} />
              </>
            ) : (
              <div className={styles.cards}>
                {visibleReports.map((report) => (
                  <article className={styles.card} key={report.id}>
                    <img
                      className={styles.cardImage}
                      src={report.image}
                      alt=""
                    />
                    <div>
                      <span>
                        {report.year} · {report.subtitle}
                      </span>
                      <h4>{report.title}</h4>
                      <p>{report.description}</p>
                      <ReportActions report={report} />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <aside className={styles.sidebar} aria-label="Reports by year">
            <div className={styles.filters}>
              {yearGroups.map((group, index) => (
                <div className={styles.yearGroup} key={`${group.year}-${index}`}>
                  <button
                    type="button"
                    className={year === group.year ? styles.active : ""}
                    onClick={() => setYear(year === group.year ? null : group.year)}
                  >
                    {group.year} ({group.count})
                  </button>
                  {group.items.length ? (
                    <ul>
                      {group.items.map((item, itemIndex) => (
                        <li key={`${item}-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
            <div className={styles.quote}>
              <img
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
                className={styles.quoteRight}
                src="/images/reports/shape2.png"
                alt=""
              />
            </div>
          </aside>
        </div>
      </div>

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
    ? "https://g-stack.green.com.pg/" + href.replace(/^\/+/, "")
    : "#";
}

function ReportActions({ report }: { report: Report }) {
  const href = reportUrl(report.href);
  return (
    <div className={styles.actions}>
      <a href={href} download={Boolean(report.href)}>
        <img src="/images/reports/download.png" alt="Download report" />
      </a>
      <a
        href={href}
        target={report.href ? "_blank" : undefined}
        rel={report.href ? "noopener noreferrer" : undefined}
      >
        <img src="/images/reports/view.png" alt="View report" />
      </a>
    </div>
  );
}

function ReportRow({ report }: { report: Report }) {
  return (
    <article className={styles.row}>
      <h4>{report.title}</h4>
      <span>{report.subtitle}</span>
      <ReportActions report={report} />
    </article>
  );
}

function Pagination({ page, onChange }: { page: number; onChange: (page: number) => void }) {
  return (
    <nav className={styles.pagination} aria-label="Reports pages">
      <button type="button" aria-label="Previous page" onClick={() => onChange(Math.max(1, page - 1))}>
        ‹‹
      </button>
      {Array.from({ length: 6 }, (_, index) => index + 1).map((item) => (
        <button
          type="button"
          key={item}
          className={item === page ? styles.pageActive : ""}
          aria-current={item === page ? "page" : undefined}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
      <button type="button" aria-label="Next page" onClick={() => onChange(Math.min(6, page + 1))}>
        ››
      </button>
    </nav>
  );
}
