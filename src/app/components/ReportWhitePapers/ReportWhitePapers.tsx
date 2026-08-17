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

const fallbackReports: Report[] = [
  {
    id: 1,
    title: "Energy Transition in Papua New Guinea",
    subtitle: "Research brief",
    description:
      "A practical view of the infrastructure, investment, and delivery conditions shaping PNG's energy transition.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
  },
  {
    id: 2,
    title: "Building Resilient Microgrids",
    subtitle: "Technical paper",
    description:
      "Lessons from remote energy systems designed around reliability, local capability, and long-term operation.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2025,
  },
  {
    id: 3,
    title: "Evidence for Better Energy Decisions",
    subtitle: "GREEN field report",
    description:
      "Decision-grade insights for ministries, funders, developers, and energy-sector innovators.",
    image: "/images/articles/article1.png",
    href: "",
    year: 2024,
  },
];

interface ReportWhitePapersProps {
  canvas?: boolean;
}

export default function ReportWhitePapers({
  canvas = false,
}: ReportWhitePapersProps) {
  const [view, setView] = useState<"list" | "grid">("list");
  const [year, setYear] = useState<number | null>(null);
  const { data: apiReports } = useReportsWhitepapers();

  const reports = useMemo<Report[]>(() => {
    if (!apiReports?.length) return fallbackReports;
    return apiReports.map((report) => ({
      id: report.id,
      title: report.title,
      subtitle: report.subtitle,
      description: report.description,
      image: report.featuredImg.src,
      href: report.pptx,
      year: Number.parseInt(report.year, 10) || 2025,
    }));
  }, [apiReports]);

  const years = [...new Set(reports.map((report) => report.year))].sort(
    (a, b) => b - a,
  );
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
              <div className={styles.list}>
                {visibleReports.map((report) => (
                  <ReportRow key={report.id} report={report} />
                ))}
              </div>
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

          <aside className={styles.sidebar}>
            <div className={styles.filters}>
              <button
                type="button"
                className={year === null ? styles.active : ""}
                onClick={() => setYear(null)}
              >
                All Years ({reports.length})
              </button>
              {years.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={year === item ? styles.active : ""}
                  onClick={() => setYear(item)}
                >
                  {item} (
                  {reports.filter((report) => report.year === item).length})
                </button>
              ))}
            </div>
            <div className={styles.quote}>
              <img
                className={styles.quoteStart}
                src="/images/reports/shape1.png"
                alt=""
              />
              <p>
                We Don&apos;t Just <strong>Build</strong> Systems.
                <br />
                We Build <strong>Evidence.</strong>
              </p>
              <img
                className={styles.quoteEnd}
                src="/images/reports/shape2.png"
                alt=""
              />
            </div>
          </aside>
        </div>
      </div>

      {canvas ? (
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
          triggerClassName={styles.chatTrigger}
          triggerStyle={{
            top: 899,
            right: "auto",
            bottom: "auto",
            left: 1498,
            width: 418,
          }}
        />
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
      <div>
        <h4>{report.title}</h4>
        <span>{report.subtitle}</span>
      </div>
      <ReportActions report={report} />
    </article>
  );
}
