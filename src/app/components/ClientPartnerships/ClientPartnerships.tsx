"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useClientPartnerships } from "@/hooks/useClientPartnerships";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./ClientPartnerships.module.css";
import OurClientPartnershipModel from "./Dialog/OurClientPartnershipModel";
import PartnershipOnboarding from "./Dialog/PartnershipOnboarding";
import UseCases from "./Dialog/UseCases";
import WhatSetsGREENApart from "./Dialog/WhatSetsGREENApart";
import WhoWePartnerWith from "./Dialog/WhoWePartnerWith";
import BookDiscoveryCall from "./Modals/BookDiscoveryCall";

// Figma-locked design content (node 7077:15858). Rows open the same
// data-driven dialogs; canvas geometry is exact to the Figma node tree.
const FALLBACK = {
  subHeadline: "We Don\u2019t Just Serve Clients. We Scale Their Missions.",
  description:
    "From electrifying rural provinces to powering national infrastructure, GREEN partners with clients whose ambitions match our execution.  We don\u2019t just deliver energy \u2014 we deliver outcomes that endure.",
  rows: [
    {
      key: "whoWePartnerWith",
      title: "Who We Partner With",
      subtitle: "Strategic Clients. Transformational Outcomes.",
      cta: "Explore",
      ctaX: 943,
      ctaY: 364,
      titleY: 360,
      subtitleY: 386,
      lineX: 264,
      lineY: 424,
    },
    {
      key: "ourClientPartnership",
      title: "Our Client Partnership Model",
      subtitle: "Aligned by Design. Delivered with Accountability.",
      cta: "Explore",
      ctaX: 943,
      ctaY: 442,
      titleY: 438,
      subtitleY: 464,
      lineX: 262,
      lineY: 507,
    },
    {
      key: "whatSetsGreenApart",
      title: "What Sets GREEN Apart",
      subtitle: "Strategic Clients. Transformational Outcomes.",
      cta: "Explore",
      ctaX: 937,
      ctaY: 526,
      titleY: 522,
      subtitleY: 549,
      lineX: 262,
      lineY: 592,
    },
    {
      key: "useCases",
      title: "Client Testimonials / Use Cases",
      subtitle: "Strategic Clients. Transformational Outcomes.",
      cta: "Explore",
      ctaX: 933,
      ctaY: 610,
      titleY: 606,
      subtitleY: 632,
      lineX: 266,
      lineY: 677,
    },
    {
      key: "partnershipOnboarding",
      title: "Partnership Onboarding",
      subtitle: "Let\u2019s Build What Your Nation or Enterprise Needs Next.",
      cta: "Explore",
      ctaX: 926,
      ctaY: 698,
      titleY: 690,
      subtitleY: 719,
      lineX: 266,
      lineY: 767,
    },
    {
      key: "clientPartnerLogin",
      title: "CLIENT PARTNER LOGIN",
      subtitle: "Let\u2019s Build What Your Nation or Enterprise Needs Next.",
      cta: "Login",
      ctaX: 926,
      ctaY: 788,
      titleY: 780,
      subtitleY: 809,
      lineX: 266,
      lineY: 767,
    },
  ],
  quote1:
    "\u201cISO Compliant \u2022 Donor Trusted \u2022 Built Across PNG\u201d",
  quote2: "From Brief to  Commissioning in 90 Days",
  statement: "Let\u2019s Build What Your Nation or Enterprise Needs Next.",
};

interface ClientPartnershipsProps {
  canvas?: boolean;
}

export default function ClientPartnerships({
  canvas = false,
}: ClientPartnershipsProps) {
  const { data } = useClientPartnerships();
  const cmsSections = data
    ? [
        data.whoWePartnerWith,
        data.ourClientPartnership,
        data.whatSetsGreenApart,
        data.useCases,
      ]
    : [];
  const d = data
    ? {
        ...FALLBACK,
        subHeadline: data.mainPage.subHeadline,
        description: data.mainPage.description,
        rows: FALLBACK.rows.map((row, index) => {
          const section = cmsSections[index];
          return section
            ? {
                ...row,
                title: section.title?.trim() || row.title,
                subtitle:
                  ("subHeadline" in section && section.subHeadline) ||
                  row.subtitle,
              }
            : row;
        }),
        quote1:
          data.mainPage.quote1.text1
            ?.split(/[\r\n\u2028]+/)[0]
            ?.trim() || FALLBACK.quote1,
        quote2: data.mainPage.quote1.text2 || FALLBACK.quote2,
        statement: data.mainPage.quote2 || FALLBACK.statement,
      }
    : FALLBACK;
  const [isWhoWePartnerOpen, setIsWhoWePartnerOpen] = useState(false);
  const [isOurModelOpen, setIsOurModelOpen] = useState(false);
  const [isWhatSetsOpen, setIsWhatSetsOpen] = useState(false);
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
  const [isPartnershipOnboardingOpen, setIsPartnershipOnboardingOpen] =
    useState(false);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  return (
    <main className={styles.page} data-node-id="7077:15858">
      <SiteHeader
        layout={canvas ? "figmaCanvas" : "viewport"}
        panel="logoOnly"
      />

      {/* Left green/yellow angled panel (Group 1171277870, 326×662 at -15,-1) */}
      <div
        className={`${styles.leftPanel} ${styles.desktopOnly}`}
        aria-hidden="true"
      />

      {/* Vertical outlined side title (Raleway 900 70px, stroke #989898) */}
      <span
        className={`${styles.verticalTitle} ${styles.desktopOnly}`}
        aria-hidden="true"
      >
        {data?.mainPage?.title ?? "CLIENT PARTNERSHIPS"}
      </span>

      {/* Right-side photo collage (Mask group at 1063,-59, 1003×2134) */}
      <div
        className={`${styles.rightCollage} ${styles.desktopOnly}`}
        aria-hidden="true"
      >
        <img
          loading="lazy"
          decoding="async"
          src="/images/client-partnerships/mask_composite.png"
          alt=""
        />
      </div>

      {/* Header section */}
      <div className={`${styles.headerBlock} ${styles.desktopOnly}`}>
        <h1 className={styles.mainTitle}>
          {data?.mainPage?.title ?? "CLIENT PARTNERSHIPS"}
        </h1>
        <p className={styles.subHeadline}>{d.subHeadline}</p>
        <p className={styles.description}>{d.description}</p>
      </div>

      {/* Five menu rows (titles, subtitles, green divider lines, angled pills) */}
      {d.rows.map((row) => (
        <React.Fragment key={row.key}>
          <div
            className={`${styles.rowLine} ${styles.desktopOnly}`}
            style={{
              position: "absolute",
              left: row.lineX,
              top: row.lineY,
              width: 812,
              display: row.key === "clientPartnerLogin" ? "none" : "block",
            }}
            aria-hidden="true"
          />
          <div
            className={`${styles.rowText} ${styles.desktopOnly}`}
            style={{ position: "absolute", left: 266, top: row.titleY }}
          >
            <h3 className={styles.rowTitle}>
              {row.key === "clientPartnerLogin" ? (
                <Link href="/client-value-engineering">{row.title}</Link>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    row.key === "whoWePartnerWith"
                      ? setIsWhoWePartnerOpen(true)
                      : row.key === "ourClientPartnership"
                        ? setIsOurModelOpen(true)
                        : row.key === "whatSetsGreenApart"
                          ? setIsWhatSetsOpen(true)
                          : row.key === "partnershipOnboarding"
                            ? setIsPartnershipOnboardingOpen(true)
                            : setIsUseCasesOpen(true)
                  }
                >
                  {row.title}
                </button>
              )}
            </h3>
            <p className={styles.rowSubtitle}>{row.subtitle}</p>
          </div>
          <FigmaAngledCta
            className={`${styles.rowCta} ${styles.desktopOnly} ${
              row.cta === "Explore"
                ? styles.exploreCta
                : row.key === "clientPartnerLogin"
                  ? styles.loginCta
                  : ""
            }`}
            size="sm"
            style={{ position: "absolute", left: row.ctaX, top: row.ctaY }}
            href={
              row.key === "clientPartnerLogin"
                ? "/client-value-engineering"
                : undefined
            }
            onClick={
              row.key === "clientPartnerLogin"
                ? undefined
                : row.key === "partnershipOnboarding"
                  ? () => setIsPartnershipOnboardingOpen(true)
                  : () =>
                      row.key === "whoWePartnerWith"
                        ? setIsWhoWePartnerOpen(true)
                        : row.key === "ourClientPartnership"
                          ? setIsOurModelOpen(true)
                          : row.key === "whatSetsGreenApart"
                            ? setIsWhatSetsOpen(true)
                            : setIsUseCasesOpen(true)
            }
          >
            {row.cta}
          </FigmaAngledCta>
        </React.Fragment>
      ))}

      {/* Right-column quote over the collage */}
      <p className={`${styles.rightQuote} ${styles.desktopOnly}`}>{d.quote1}</p>
      <p className={`${styles.rightSubQuote} ${styles.desktopOnly}`}>
        {d.quote2}
      </p>

      {/* Bracketed statement (Vectors 7374 / 7375) */}
      <div className={`${styles.statementBlock} ${styles.desktopOnly}`}>
        <img
          loading="lazy"
          decoding="async"
          src="/images/client-partnerships/quote_left.png"
          alt=""
          className={styles.statementBracketLeft}
          aria-hidden="true"
        />
        <p className={styles.statementText}>{d.statement}</p>
        <img
          loading="lazy"
          decoding="async"
          src="/images/client-partnerships/quote_right.png"
          alt=""
          className={styles.statementBracketRight}
          aria-hidden="true"
        />
      </div>

      {/* Bottom-right CTAs (desktop only) */}
      <FigmaAngledCta
        className={`${styles.bookCta} ${styles.desktopOnly}`}
        style={{ position: "absolute", left: 1647, top: 732 }}
        onClick={() => setIsBookCallOpen(true)}
      >
        {data?.mainPage?.cta?.[0]?.text?.trim() ?? "Book a Discovery Call"}
      </FigmaAngledCta>
      <FigmaAngledCta
        className={`${styles.prospectusCta} ${styles.desktopOnly}`}
        style={{ position: "absolute", left: 1516, top: 812 }}
        icon="download"
        href={
          data?.mainPage?.cta?.[1]?.href ||
          "mailto:programs@green.com.pg?subject=Client%20Partnership%20Prospectus%20Request"
        }
      >
        {data?.mainPage?.cta?.[1]?.text ??
          "Request Client Partnership Prospectus"}
      </FigmaAngledCta>
      <a
        className={`${styles.readMore} ${styles.desktopOnly}`}
        href="#read-more"
        style={{ position: "absolute", left: 1521, top: 789 }}
      >
        Read more
      </a>

      {/* ===== MOBILE-ONLY LAYOUT ===== */}
      {!canvas && (
        <div className={styles.mobileLayout}>
          {/* Hero header */}
          <div className={styles.mobileHero}>
            <h1 className={styles.mobileH1}>
              {data?.mainPage?.title ?? "CLIENT PARTNERSHIPS"}
            </h1>
            <p className={styles.mobileTagline}>{d.subHeadline}</p>
            <p className={styles.mobileBlurb}>{d.description}</p>
          </div>

          {/* Clickable rows */}
          <div className={styles.mobileRowList}>
            {d.rows.map((row) =>
              row.key === "clientPartnerLogin" ? (
                <Link
                  key={row.key}
                  href="/client-value-engineering"
                  className={styles.mobileRowItem}
                >
                  <div className={styles.mobileRowLeft}>
                    <span className={styles.mobileRowName}>{row.title}</span>
                    <span className={styles.mobileRowNote}>{row.subtitle}</span>
                  </div>
                  <span className={styles.mobileChevron} aria-hidden="true">
                    ›
                  </span>
                </Link>
              ) : (
                <button
                  key={row.key}
                  type="button"
                  className={styles.mobileRowItem}
                  onClick={() =>
                    row.key === "whoWePartnerWith"
                      ? setIsWhoWePartnerOpen(true)
                      : row.key === "ourClientPartnership"
                        ? setIsOurModelOpen(true)
                        : row.key === "whatSetsGreenApart"
                          ? setIsWhatSetsOpen(true)
                          : row.key === "partnershipOnboarding"
                            ? setIsPartnershipOnboardingOpen(true)
                            : setIsUseCasesOpen(true)
                  }
                >
                  <div className={styles.mobileRowLeft}>
                    <span className={styles.mobileRowName}>{row.title}</span>
                    <span className={styles.mobileRowNote}>{row.subtitle}</span>
                  </div>
                  <span className={styles.mobileChevron} aria-hidden="true">
                    ›
                  </span>
                </button>
              ),
            )}
          </div>

          {/* Mobile CTAs — uses same FigmaAngledCta as desktop for exact design parity */}
          <div className={styles.mobileCtaBar}>
            <FigmaAngledCta
              className={styles.mobileDiscoveryCta}
              onClick={() => setIsBookCallOpen(true)}
            >
              Book a Discovery Call
            </FigmaAngledCta>
            <FigmaAngledCta
              className={styles.mobileProspectusCta}
              icon="download"
              href="mailto:programs@green.com.pg?subject=Client%20Partnership%20Prospectus%20Request"
            >
              Request Client Partnership Prospectus
            </FigmaAngledCta>
          </div>
        </div>
      )}

      {/* Chatbot */}
      {canvas ? (
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
          figmaPlaceholder="Let's Talk Energy"
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

      {/* Modals & Dialogs */}
      <WhoWePartnerWith
        isOpen={isWhoWePartnerOpen}
        onClose={() => setIsWhoWePartnerOpen(false)}
        data={data?.whoWePartnerWith}
      />
      <OurClientPartnershipModel
        isOpen={isOurModelOpen}
        onClose={() => setIsOurModelOpen(false)}
        data={data?.ourClientPartnership}
      />
      <WhatSetsGREENApart
        isOpen={isWhatSetsOpen}
        onClose={() => setIsWhatSetsOpen(false)}
        data={data?.whatSetsGreenApart}
      />
      <UseCases
        isOpen={isUseCasesOpen}
        onClose={() => setIsUseCasesOpen(false)}
        data={data?.useCases}
      />
      <PartnershipOnboarding
        isOpen={isPartnershipOnboardingOpen}
        onClose={() => setIsPartnershipOnboardingOpen(false)}
      />

      {/* Discovery Call Inquiry Modal */}
      <BookDiscoveryCall
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
      />
    </main>
  );
}
