"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import D6Chatbot from "../D6Chatbot";
import ExistingUsers from "../JoinUs/ExistingUsers";
import SiteHeader from "../SiteHeader/SiteHeader";
import JobQuery from "./JobQuery";
import styles from "./JobOpenings.module.css";

type Job = {
  category:
    | "Solution Engineering"
    | "Business Service"
    | "Business Empowerment";
  experience: string;
  title: string;
  type: string;
};

const jobs: Job[] = [
  {
    category: "Solution Engineering",
    title: "Security Supervisor",
    type: "Full Time",
    experience: "Experience",
  },
  {
    category: "Solution Engineering",
    title: "Solar Project Engineer",
    type: "Full Time",
    experience: "Experience",
  },
  {
    category: "Solution Engineering",
    title: "Security Supervisor",
    type: "Full Time",
    experience: "Experience",
  },
  {
    category: "Business Service",
    title: "Client Service Coordinator",
    type: "Full Time",
    experience: "Experience",
  },
  {
    category: "Business Empowerment",
    title: "Community Energy Officer",
    type: "Full Time",
    experience: "Experience",
  },
];

const categories = [
  "Solution Engineering",
  "Business Service",
  "Business Empowerment",
] as const;

const programmes = [
  "Career Enhancement Programme",
  "Career Initiation Programme",
  "Corporate Wellness Programme",
  "Employee Benefits",
  "Employee Engagement",
  "Employee Experience",
  "Organizational Culture",
  "Performance Reward Programme",
  "Work Life Balance",
];

function ApplyLink() {
  return (
    <Link className={styles.apply} href="/empower/join-us#new-users">
      <img
        alt=""
        aria-hidden="true"
        src="/images/job-openings/apply-button.svg"
      />
      <span>Apply</span>
    </Link>
  );
}

/** Figma node 7077:17124 — destination of the Join Us vacancies CTA. */
export default function JobOpenings() {
  const [activeCategory, setActiveCategory] = useState<
    (typeof categories)[number]
  >("Solution Engineering");
  const [isJobQueryOpen, setIsJobQueryOpen] = useState(false);
  const [isCandidatureOpen, setIsCandidatureOpen] = useState(false);
  const visibleJobs = useMemo(
    () => jobs.filter((job) => job.category === activeCategory),
    [activeCategory],
  );
  const featuredJob = jobs[0];

  return (
    <main className={styles.page} data-node-id="7077:17124">
      <SiteHeader layout="figmaCanvas" figmaPanelVariant="flagship" />
      <div className={styles.artwork} aria-hidden="true">
        <img src="/images/careers-green/careers-green.png" alt="" />
      </div>
      <p className={styles.verticalLabel}>
        <span>Job Openings</span>
      </p>

      <section className={styles.content} aria-labelledby="job-openings-title">
        <h1 className={styles.srOnly} id="job-openings-title">
          Job Openings
        </h1>
        <p className={styles.intro}>
          <span>
            Future Envisioned Energy Disruptors, Engaging with Difference
          </span>
          Are you the one?
        </p>

        <section className={styles.openings} aria-labelledby="latest-openings">
          <h2 id="latest-openings">Latest Job Opening</h2>
          <div className={styles.rule} />
          <article className={`${styles.job} ${styles.featuredJob}`}>
            <div>
              <h3>{featuredJob.title}</h3>
              <p>{featuredJob.type}</p>
            </div>
            <span>{featuredJob.experience}</span>
            <span>Salary</span>
            <div>
              <strong>Papua New Guinea</strong>
              <time>Posted 4 Days Ago</time>
            </div>
            <ApplyLink />
          </article>
          <img
            alt=""
            aria-hidden="true"
            className={styles.featuredPagination}
            src="/images/job-openings/featured-pagination.svg"
          />

          <section className={styles.categories} aria-labelledby="job-category">
            <h2 id="job-category">Job Category</h2>
            <div className={styles.categoryButtons}>
              {categories.map((category) => (
                <button
                  aria-pressed={activeCategory === category}
                  className={
                    activeCategory === category ? styles.selected : undefined
                  }
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  {category}
                  <small>{`${jobs.filter((job) => job.category === category).length} Openings`}</small>
                </button>
              ))}
            </div>
            <div className={styles.categoryRule} />
          </section>
          <div className={styles.jobs}>
            {visibleJobs.map((job, index) => (
              <article className={styles.job} key={`${job.title}-${index}`}>
                <div>
                  <h3>{job.title}</h3>
                  <p>{job.type}</p>
                </div>
                <span>{job.experience}</span>
                <span>Salary</span>
                <div>
                  <strong>Papua New Guinea</strong>
                  <time>Posted 4 Days Ago</time>
                </div>
                <ApplyLink />
              </article>
            ))}
          </div>
        </section>
      </section>

      <aside className={styles.programmes} aria-label="Career programmes">
        {programmes.map((programme) => (
          <p key={programme}>
            <img
              alt=""
              aria-hidden="true"
              src="/images/job-openings/programme-bolt.png"
            />
            {programme}
          </p>
        ))}
      </aside>

      <div className={styles.actions}>
        <button onClick={() => setIsJobQueryOpen(true)} type="button">
          <img
            alt=""
            aria-hidden="true"
            src="/images/job-openings/job-query-button.svg"
          />
          <span>Job Query</span>
          <span aria-hidden="true">›</span>
        </button>
        <button onClick={() => setIsCandidatureOpen(true)} type="button">
          <img
            alt=""
            aria-hidden="true"
            src="/images/job-openings/track-candidature-button.svg"
          />
          <span>Track Your Candidature</span>
          <span aria-hidden="true">›</span>
        </button>
      </div>
      <D6Chatbot canvasAnchored triggerVariant="figmaCanvas" />
      <JobQuery
        isOpen={isJobQueryOpen}
        onClose={() => setIsJobQueryOpen(false)}
      />
      <ExistingUsers
        isOpen={isCandidatureOpen}
        onClose={() => setIsCandidatureOpen(false)}
        variant="track"
      />
    </main>
  );
}
