"use client";
import { useEffect, useState } from "react";
import { useMediaPress } from "../../../hooks/useMediaPress";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import FigmaQuoteBrackets from "../FigmaQuoteBrackets/FigmaQuoteBrackets";
import SiteHeader from "../SiteHeader/SiteHeader";
import GreenInTheNews from "./Dialog/GreenInTheNews";
import LatestPressReleases from "./Dialog/LatestPressReleases";
import MediaContactInterviewRequests from "./Dialog/MediaContactInterviewRequests";
import MediaKitDownload from "./Dialog/MediaKitDownload";
import OfficialSpokesPeople from "./Dialog/OfficialSpokesPeople";
import styles from "./MediaPress.module.css";
import RequestQuoteAppointment from "./Modals/RequestQuoteAppointment";

const CTA_LINKS = {
  pressKit: "mailto:media@green.com.pg?subject=GREEN%20Press%20Kit%20Request",
  partnershipFramework:
    "mailto:innovation@green.com.pg?subject=Innovation%20Partnership%20Framework%20Request",
};

const ROWS = [
  {
    id: "latest-press-releases",
    title: "Latest Press Releases",
    titlePos: { left: 392, top: 316 },
    explorePos: { left: 1208, top: 309 },
    lineY: 381,
    dialog: "latest" as const,
  },
  {
    id: "media-contact",
    title: "Media Contact & Interview Requests",
    titlePos: { left: 351, top: 420 },
    explorePos: { left: 1167, top: 412 },
    lineY: 485,
    dialog: "contact" as const,
  },
  {
    id: "media-kit",
    title: " Media Kit Download",
    titlePos: { left: 306, top: 530 },
    explorePos: { left: 1122, top: 521 },
    lineY: 597,
    dialog: "kit" as const,
  },
  {
    id: "green-news",
    title: "GREEN in the News",
    titlePos: { left: 259, top: 636 },
    explorePos: { left: 1075, top: 627 },
    lineY: 701,
    dialog: "news" as const,
  },
  {
    id: "spokes-people",
    title: "Official Spokes people",
    titlePos: { left: 217, top: 740 },
    explorePos: { left: 1033, top: 731 },
    lineY: null,
    dialog: "spokes" as const,
  },
];

interface MediaPressProps {
  canvas?: boolean;
}

export default function MediaPress({ canvas = false }: MediaPressProps) {
  const { data: mediaPressResponse } = useMediaPress();
  const mainPage = mediaPressResponse?.data?.mainPage;
  const [latestOpen, setLatestOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [kitOpen, setKitOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [spokesOpen, setSpokesOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1023);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const open = {
    latest: setLatestOpen,
    contact: setContactOpen,
    kit: setKitOpen,
    news: setNewsOpen,
    spokes: setSpokesOpen,
  } as const;

  if (!canvas || isMobile) {
    return (
      <main className={styles.mobilePage} data-node-id="7077:23952">
        <SiteHeader layout="viewport" />

        {/* Top ambient decor */}
        <div className={styles.mobileBgDecor} aria-hidden="true">
          <img
            loading="lazy"
            decoding="async"
            src="/images/media-press/mainImg.png"
            alt=""
          />
        </div>

        {/* Hero Header */}
        <div className={styles.mobileHero}>
          <h1 className={styles.mobileTitle}>
            {mainPage?.title || "Media & Press"}
          </h1>
          <p className={styles.mobileSubtitle}>
            {mainPage?.subHeadline ||
              "Telling the Energy Story — The Right Way."}
          </p>
          <p className={styles.mobileDescription}>
            {mainPage?.description?.text ||
              "GREEN Limited is shaping the future of energy access in PNG and the Pacific. For accurate information, interviews, brand assets, and official statements — this is your source."}
          </p>
        </div>

        {/* Menu rows */}
        <div className={styles.mobileRowsList}>
          {ROWS.map((row, idx) => (
            <div key={row.id} className={styles.mobileRow}>
              <div className={styles.mobileRowContent}>
                <h3 className={styles.mobileRowTitle}>{row.title}</h3>
                <FigmaAngledCta
                  className={styles.mobileExploreBtn}
                  onClick={() => open[row.dialog](true)}
                >
                  Explore
                </FigmaAngledCta>
              </div>
              {idx < ROWS.length - 1 && (
                <hr className={styles.mobileRowDivider} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className={styles.mobileQuoteCard}>
          <p className={styles.mobileQuoteText}>
            {mainPage?.quote?.text ||
              "We Don’t Tell Stories To Impress. We Share Stories That Prove What Energy Can Do."}
          </p>
        </div>

        {/* Bottom CTAs */}
        <div className={styles.mobileCtas}>
          <a
            href={CTA_LINKS.pressKit}
            className={styles.figmaCtaButton}
          >
            <img
              loading="lazy"
              decoding="async"
              className={styles.figmaCtaFrame}
              src="/images/media-press/request-quote-appearance-frame.svg"
              alt=""
              aria-hidden="true"
            />
            <span className={styles.figmaCtaLabel}>Request the Press Kit</span>
            <img
              loading="lazy"
              decoding="async"
              className={styles.figmaCtaArrow}
              src="/images/media-press/cta-arrow.svg"
              alt=""
              aria-hidden="true"
            />
          </a>

          <a
            href={CTA_LINKS.partnershipFramework}
            className={styles.figmaCtaButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              loading="lazy"
              decoding="async"
              className={styles.figmaCtaFrame}
              src="/images/media-press/request-quote-appearance-frame.svg"
              alt=""
              aria-hidden="true"
            />
            <span className={styles.figmaCtaLabel}>
              Request Partnership Framework
            </span>
            <img
              loading="lazy"
              decoding="async"
              className={styles.figmaCtaArrow}
              src="/images/media-press/cta-arrow.svg"
              alt=""
              aria-hidden="true"
            />
          </a>

          <button
            type="button"
            className={styles.figmaCtaButton}
            onClick={() => setQuoteOpen(true)}
          >
            <img
              loading="lazy"
              decoding="async"
              className={styles.figmaCtaFrame}
              src="/images/media-press/request-quote-appearance-frame.svg"
              alt=""
              aria-hidden="true"
            />
            <span className={styles.figmaCtaLabel}>
              Request Quote Or Appearance
            </span>
            <img
              loading="lazy"
              decoding="async"
              className={styles.figmaCtaArrow}
              src="/images/media-press/cta-arrow.svg"
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>

        <D6Chatbot />

        <LatestPressReleases
          isOpen={latestOpen}
          onClose={() => setLatestOpen(false)}
        />
        <MediaContactInterviewRequests
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
        />
        <MediaKitDownload isOpen={kitOpen} onClose={() => setKitOpen(false)} />
        <GreenInTheNews isOpen={newsOpen} onClose={() => setNewsOpen(false)} />
        <OfficialSpokesPeople
          isOpen={spokesOpen}
          onClose={() => setSpokesOpen(false)}
        />
        <RequestQuoteAppointment
          isOpen={quoteOpen}
          onClose={() => setQuoteOpen(false)}
        />
      </main>
    );
  }

  return (
    <main className={styles.page} data-node-id="7077:23952">
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />

      {/* Vertical side title (Raleway Black, outlined, bottom-up) */}
      <div className={styles.verticalTitle} aria-hidden="true">
        <p>Media &amp; Press</p>
      </div>

      {/* Right faint collage */}
      <div className={styles.rightCollage} aria-hidden="true">
        <img
          loading="lazy"
          decoding="async"
          src="/images/media-press/mainImg.png"
          alt=""
        />
      </div>

        {/* Header block */}
        <div className={styles.headerBlock}>
          <h1 className={styles.mainTitle}>
            {mainPage?.title?.trim() === "Media & Press" || !mainPage?.title ? (
              <>
                Media &amp; <span>Press</span>
              </>
            ) : (
              mainPage.title
            )}
        </h1>
        <p className={styles.subHeadline}>
          {mainPage?.subHeadline || "Telling the Energy Story — The Right Way."}
        </p>
        <p className={styles.description}>
          {mainPage?.description?.text || (
            <>
              <span className={styles.greenText}>GREEN</span> Limited is
              shaping the future of energy access in PNG and the Pacific. For
              accurate information, interviews, brand assets, and official
              statements — this is your source.
            </>
          )}
        </p>
      </div>

      {/* Menu rows with Explore pills and separator lines */}
      {ROWS.map((row) => (
        <div key={row.id}>
          <h3 className={styles.rowTitle} style={row.titlePos}>
            {row.title}
          </h3>
          <FigmaAngledCta
            className={styles.exploreBtn}
            style={{
              position: "absolute",
              left: row.explorePos.left,
              top: row.explorePos.top,
            }}
            onClick={() => open[row.dialog](true)}
          >
            Explore
          </FigmaAngledCta>
          {row.lineY !== null ? (
            <hr
              className={styles.rowLine}
              style={{ top: row.lineY, left: row.titlePos.left - 16 }}
              aria-hidden="true"
            />
          ) : null}
        </div>
      ))}

      {/* Bottom-left quote */}
      <div className={styles.quoteBlock}>
        <FigmaQuoteBrackets
          leftStyle={{ left: -64, top: -16 }}
          rightStyle={{ right: -34, top: -9 }}
        />
        <p className={styles.quoteText}>
          {mainPage?.quote?.text || (
            <>
              We don&apos;t tell stories to impress. We share stories that prove
              what <span className={styles.greenText}>energy</span> can do.
            </>
          )}
        </p>
      </div>

      {/* Right CTAs */}
      <div className={styles.desktopCtas}>
        <a
          href={CTA_LINKS.pressKit}
          className={`${styles.figmaCtaButton} ${styles.downloadPressKit}`}
        >
          <img
            loading="lazy"
            decoding="async"
            className={styles.figmaCtaFrame}
            src="/images/media-press/request-quote-appearance-frame.svg"
            alt=""
            aria-hidden="true"
          />
          <span className={styles.figmaCtaLabel}>Request the Press Kit</span>
          <img
            loading="lazy"
            decoding="async"
            className={styles.figmaCtaArrow}
            src="/images/media-press/cta-arrow.svg"
            alt=""
            aria-hidden="true"
          />
        </a>

        <button
          type="button"
          className={`${styles.figmaCtaButton} ${styles.requestQuote}`}
          onClick={() => setQuoteOpen(true)}
        >
          <img
            loading="lazy"
            decoding="async"
            className={styles.figmaCtaFrame}
            src="/images/media-press/request-quote-appearance-frame.svg"
            alt=""
            aria-hidden="true"
          />
          <span className={styles.figmaCtaLabel}>
            Request Quote Or Appearance
          </span>
          <img
            loading="lazy"
            decoding="async"
            className={styles.figmaCtaArrow}
            src="/images/media-press/cta-arrow.svg"
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Chatbot */}
      {canvas ? (
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
          figmaPlaceholder="Let's Talk Energy"
          triggerStyle={{
            top: 853,
            right: "auto",
            bottom: "auto",
            left: 1499,
            width: 418,
          }}
        />
      ) : (
        <D6Chatbot />
      )}

      <LatestPressReleases
        isOpen={latestOpen}
        onClose={() => setLatestOpen(false)}
      />
      <MediaContactInterviewRequests
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
      <MediaKitDownload isOpen={kitOpen} onClose={() => setKitOpen(false)} />
      <GreenInTheNews isOpen={newsOpen} onClose={() => setNewsOpen(false)} />
      <OfficialSpokesPeople
        isOpen={spokesOpen}
        onClose={() => setSpokesOpen(false)}
      />
      <RequestQuoteAppointment
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
      />
    </main>
  );
}
