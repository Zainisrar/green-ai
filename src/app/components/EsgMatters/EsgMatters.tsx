"use client";
import React, { useEffect, useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import D6Chatbot from "../D6Chatbot";
import Chatbot from "../Chatbot";
import ProductEnquiry from "../Product/Modals/ProductEnquiry";
import styles from "./EsgMatters.module.css";
import { useImpactMeasurementEsg } from "../../../hooks/useImpactMeasurementEsg";

const FALLBACK_DATA = {
  id: 6,
  createdAt: "2025-11-09T15:27:06.160Z",
  updatedAt: "2025-11-09T14:45:13.998Z",
  mainPage: {
    title: "Impact Measurement & ESG",
    subHeadline: "We Don’t Just Deliver Energy. We Quantify Its Impact.",
    description: {
      text: "At GREEN, every installation is tracked, audited, and tied to real-world outcomes.\nOur ESG commitment is engineered into every project — from rural solar to hybrid grid infrastructure.",
      highlighted: "GREEN",
    },
    quote: {
      text: "All metrics are monitored via GRID-INTEL™ and third-party field audits.",
      highlighted: "GRID-INTEL™",
    },
    cta: [
      { href: "/engage/contact-us", text: "GREEN ESG Policy Brief (PDF)" },
      {
        href: "#sample-impact-report",
        text: "Sample Impact Report or M&E Framework",
      },
    ],
  },
  whyEsgMattersGreen: {
    title: "Why ESG Matters to GREEN",
    subHeadline:
      "“We operate in environments where energy is everything. So impact isn't an afterthought — it's the foundation.”",
    description:
      "GREEN’s projects are designed and reported in full alignment with:",
    keys: [
      {
        text: "ESG frameworks (Environmental, Social, Governance)",
        highlighted: "(Environmental, Social, Governance)",
      },
      {
        text: "UN SDGs (especially SDG 7, 9, 13, and 17)",
        highlighted: "(especially SDG 7, 9, 13, and 17)",
      },
      { text: "Donor and Ministry reporting protocols", highlighted: "" },
      { text: "Community-led verification models", highlighted: "" },
    ],
  },
  howWeMeasureImpact: {
    metrics: [
      {
        category: "Environmental",
        keyMetricsTracked:
          "Diesel displacement (litres/year), CO₂ offset (tCO₂e), recyclability of components",
      },
      {
        category: "Social",
        keyMetricsTracked:
          "Households served, jobs created, clinics/schools powered, hours of reliable power",
      },
      {
        category: "Governance",
        keyMetricsTracked:
          "Compliance audits passed, contractor standards upheld, local hiring & training stats",
      },
    ],
    quote: {
      text: "“All metrics are monitored via GRID-INTEL™ and third-party field audits.”",
      highlighted: "GRID-INTEL™",
    },
  },
  esgIntegrationProjectLifeCycle: {
    title: "ESG Integration in Project Lifecycle",
    items: [
      {
        title: "Planning",
        description: "ESG risk mapping, impact projections",
      },
      {
        title: "Design",
        description: "Material selection, recyclability, efficiency standards",
      },
      {
        title: "Deployment",
        description: "Local labor, safety compliance, community engagement",
      },
      {
        title: "Operation",
        description: "Data monitoring, fault tracking, social feedback",
      },
      {
        title: "Reporting",
        description: "Custom dashboards, donor-compliant impact reports",
      },
    ],
    quote: {
      text: "“All metrics are monitored via GRID-INTEL™ and third-party field audits.”",
      highlighted: "GRID-INTEL™",
    },
  },
  trustSignals: {
    title: "Trust Signals",
    items: [
      "Third-party M&E (Monitoring & Evaluation) partnerships",
      "Impact dashboards per project — real-time + historical",
      "End-of-life & recovery standards for equipment",
      "Donor-approved auditing model and transparent field data",
    ],
    quote: {
      text: "“All metrics are monitored via GRID-INTEL™ and third-party field audits.”",
      highlighted: "GRID-INTEL™",
    },
  },
  sampleMetricsSnapshot: {
    title: "Sample Metrics Snapshot",
    description: {
      text: "2022–2025 GREEN Impact (PNG Projects)",
      highlighted: "2022–2025",
    },
    keys: [
      { text: "+3.913 MW clean energy installed", highlighted: "+3.913 MW" },
      { text: "796,270 beneficiaries reached", highlighted: "796,270" },
      { text: "6,126 tonnes CO₂ displaced", highlighted: "6,126" },
      { text: "223 new local technical jobs created", highlighted: "223" },
      {
        text: "52% of systems supported via local O&M teams",
        highlighted: "52%",
      },
    ],
  },
};

const SAMPLE_IMPACT_INTEREST_OPTIONS = [
  "Sample Impact Report",
  "M&E Framework",
  "ESG Policy Brief",
  "Other",
];

const EsgMatters = ({ canvas = false }: { canvas?: boolean }) => {
  const { data } = useImpactMeasurementEsg();
  const pageData = data ?? FALLBACK_DATA;
  const [isSampleOpen, setIsSampleOpen] = useState(false);

  const [active, setActive] = useState<{
    index: number;
    data: React.JSX.Element;
  }>({
    index: 0,
    data: (
      <div className="mt-8 lg:ml-4">
        <div>
          <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-4">
            {FALLBACK_DATA.whyEsgMattersGreen.title}
          </h3>
          <p className="lg:ml-6 text-[#23B14D] text-lg font-semibold italic mb-4">
            {FALLBACK_DATA.whyEsgMattersGreen.subHeadline}
          </p>
          <p className="text-gray-600 lg:ml-4 text-lg italic mb-4">
            {FALLBACK_DATA.whyEsgMattersGreen.description}
          </p>
          <div className="space-y-3 italic">
            {FALLBACK_DATA.whyEsgMattersGreen.keys.map((key, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img
                  loading="lazy"
                  decoding="async"
                  src="/images/why-esg-matters-to-green/green_bolt.png"
                  className="w-7 h-7 object-contain flex-shrink-0"
                  alt=""
                />
                <span className="text-sm font-semibold text-gray-800">
                  {key.highlighted ? (
                    <>
                      {key.text.split(key.highlighted)[0]}
                      <span className="text-[#23B14D]">{key.highlighted}</span>
                      {key.text.split(key.highlighted)[1]}
                    </>
                  ) : (
                    key.text
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  });

  useEffect(() => {
    if (data || canvas) {
      handleActive(0);
    }
  }, [data]);

  const handleActive = (index: number) => {
    if (!pageData) return;
    switch (index) {
      case 0:
        setActive({
          index: 0,
          data: (
            <div className="mt-8 lg:ml-4">
              <div>
                <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-4">
                  {pageData.whyEsgMattersGreen.title}
                </h3>
                <p className="ml-6 text-[#23B14D] text-lg font-semibold italic mb-4">
                  {pageData.whyEsgMattersGreen.subHeadline}
                </p>
                <p className="text-gray-600 lg:ml-4 text-lg italic mb-4">
                  {pageData.whyEsgMattersGreen.description}
                </p>
                <div className="space-y-3 italic">
                  {pageData.whyEsgMattersGreen.keys.map((key, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        loading="lazy"
                        decoding="async"
                        src="/images/why-esg-matters-to-green/green_bolt.png"
                        className="w-7 h-7 object-contain flex-shrink-0"
                        alt=""
                      />
                      <span className="text-sm lg:text-base font-semibold text-gray-800">
                        {key.highlighted ? (
                          <>
                            {key.text.split(key.highlighted)[0]}
                            <span className="text-[#23B14D]">
                              {key.highlighted}
                            </span>
                            {key.text.split(key.highlighted)[1]}
                          </>
                        ) : (
                          key.text
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
        });
        break;
      case 1:
        setActive({
          index: 1,
          data: (
            <div className="mt-8 lg:ml-4 lg:w-[70%]">
              <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-6">
                How We Measure Impact
              </h3>
              <div className="lg:ml-4 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-lg font-bold text-[#23B14D]">
                        Category
                      </th>
                      <th className="px-4 py-3 text-lg font-bold text-[#23B14D]">
                        Key Metrics Tracked
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.howWeMeasureImpact.metrics.map((metric, idx) => (
                      <tr key={idx} className="border-t border-green-200">
                        <td className="px-4 py-3 font-semibold text-gray-800 italic">
                          {metric.category}
                        </td>
                        <td className="px-4 py-3 text-gray-700 italic">
                          {metric.keyMetricsTracked}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-6 text-[#23B14D] font-bold italic text-base lg:text-lg">
                  {pageData.howWeMeasureImpact.quote.text}
                </p>
              </div>
            </div>
          ),
        });
        break;
      case 2:
        setActive({
          index: 2,
          data: (
            <div className="mt-8 lg:ml-4">
              <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-6">
                {pageData.esgIntegrationProjectLifeCycle.title}
              </h3>
              <div className="lg:ml-4 space-y-4">
                {pageData.esgIntegrationProjectLifeCycle.items.map(
                  (item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6"
                    >
                      <h4 className="font-bold text-gray-800 italic text-lg sm:w-32 flex-shrink-0">
                        {item.title}
                      </h4>
                      <p className="text-gray-700 italic flex-1">
                        {item.description}
                      </p>
                    </div>
                  ),
                )}
              </div>
              <p className="mt-6 lg:ml-4 text-[#23B14D] font-bold italic text-base lg:text-lg">
                {pageData.esgIntegrationProjectLifeCycle.quote.text}
              </p>
            </div>
          ),
        });
        break;
      case 3:
        setActive({
          index: 3,
          data: (
            <div className="mt-8 lg:ml-4">
              <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-6">
                {pageData.trustSignals.title}
              </h3>
              <div className="lg:ml-4 space-y-4">
                {(pageData.trustSignals.items.length
                  ? pageData.trustSignals.items
                  : FALLBACK_DATA.trustSignals.items
                ).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/images/why-esg-matters-to-green/green_bolt.png"
                      className="w-7 h-7 object-contain flex-shrink-0"
                      alt=""
                    />
                    <p className="text-gray-900 font-semibold italic text-base lg:text-lg">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 lg:ml-4 text-[#23B14D] font-bold italic text-base lg:text-lg">
                {pageData.trustSignals.quote.text}
              </p>
            </div>
          ),
        });
        break;
      case 4:
        setActive({
          index: 4,
          data: (
            <div className="mt-8 lg:ml-4">
              <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-2">
                {pageData.sampleMetricsSnapshot.title}
              </h3>
              <p className="lg:ml-8 text-base lg:text-lg text-gray-800 mb-6">
                <strong className="font-bold">2022–2025</strong> GREEN Impact
                (PNG Projects)
              </p>
              <div className="lg:ml-4 space-y-4">
                {(pageData.sampleMetricsSnapshot.keys.length
                  ? pageData.sampleMetricsSnapshot.keys
                  : FALLBACK_DATA.sampleMetricsSnapshot.keys
                ).map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/images/why-esg-matters-to-green/green_bolt.png"
                      className="w-7 h-7 object-contain flex-shrink-0"
                      alt=""
                    />
                    <p className="text-gray-900 font-semibold italic text-base lg:text-lg">
                      <span className="text-[#23B14D] font-extrabold text-lg lg:text-xl mr-2">
                        {metric.highlighted}
                      </span>
                      {metric.text.replace(metric.highlighted, "").trim()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        break;
      default:
        break;
    }
  };

  const canvasMenuItems = [
    { index: 0, label: pageData.whyEsgMattersGreen.title },
    { index: 1, label: "How We Measure Impact" },
    { index: 2, label: pageData.esgIntegrationProjectLifeCycle.title },
    { index: 3, label: pageData.trustSignals.title },
    { index: 4, label: pageData.sampleMetricsSnapshot.title },
  ];

  const canvasDetail = (() => {
    switch (active.index) {
      case 1:
        return (
          <div className={styles.canvasDetailInner}>
            <h3 className={styles.canvasTab1Heading}>How We Measure Impact</h3>
            <table className={styles.canvasMetricsTable}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Key Metrics Tracked</th>
                </tr>
              </thead>
              <tbody>
                {pageData.howWeMeasureImpact.metrics.map((metric, index) => (
                  <tr key={`${metric.category}-${index}`}>
                    <td>{metric.category}</td>
                    <td>{metric.keyMetricsTracked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.canvasPanelNote}>
              {pageData.howWeMeasureImpact.quote.text}
            </p>
          </div>
        );
      case 2:
        return (
          <div className={styles.canvasDetailInner}>
            <h3 className={styles.canvasTab2Heading}>
              {pageData.esgIntegrationProjectLifeCycle.title}
            </h3>
            <div className={styles.canvasDetailList}>
              {pageData.esgIntegrationProjectLifeCycle.items.map(
                (item, index) => (
                  <div key={`${item.title}-${index}`}>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>
                ),
              )}
            </div>
            <p className={styles.canvasPanelNote}>
              {pageData.esgIntegrationProjectLifeCycle.quote.text}
            </p>
          </div>
        );
      case 3: {
        const trustList = pageData.trustSignals.items.length
          ? pageData.trustSignals.items
          : FALLBACK_DATA.trustSignals.items;
        const offsets = [43, 79, 108, 131];
        return (
          <div className={styles.canvasTrustContainer}>
            <h3 className={styles.canvasTrustHeading}>
              {pageData.trustSignals.title}
            </h3>
            <div className={styles.canvasSteppedList}>
              {trustList.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className={styles.canvasSteppedItem}
                  style={{ marginLeft: `-${offsets[index] ?? index * 30}px` }}
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src="/images/why-esg-matters-to-green/green_bolt.png"
                    className={styles.canvasBoltIcon}
                    alt=""
                  />
                  <span className={styles.canvasSteppedText}>{item}</span>
                </div>
              ))}
            </div>
            <p className={styles.canvasTrustQuote}>
              {pageData.trustSignals.quote.text}
            </p>
          </div>
        );
      }
      case 4: {
        const metricList = pageData.sampleMetricsSnapshot.keys.length
          ? pageData.sampleMetricsSnapshot.keys
          : FALLBACK_DATA.sampleMetricsSnapshot.keys;
        const offsets = [56, 77, 100, 126, 147];
        return (
          <div className={styles.canvasSampleContainer}>
            <h3 className={styles.canvasSampleHeading}>
              {pageData.sampleMetricsSnapshot.title}
            </h3>
            <p className={styles.canvasSampleSubtitle}>
              <strong>2022–2025</strong> GREEN Impact (PNG Projects)
            </p>
            <div className={styles.canvasSteppedList}>
              {metricList.map((metric, index) => {
                const numPart = metric.highlighted.trim();
                const textPart = metric.text
                  .replace(metric.highlighted, "")
                  .trim();
                return (
                  <div
                    key={`${metric.text}-${index}`}
                    className={styles.canvasSteppedItem}
                    style={{ marginLeft: `-${offsets[index] ?? index * 20}px` }}
                  >
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/images/why-esg-matters-to-green/green_bolt.png"
                      className={styles.canvasBoltIcon}
                      alt=""
                    />
                    <span className={styles.canvasSteppedText}>
                      <strong className={styles.canvasMetricNum}>
                        {numPart}
                      </strong>{" "}
                      {textPart}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      default: {
        const offsets = [129, 148, 172, 194];
        return (
          <div className={styles.canvasDetailInner}>
            <h3 className={styles.canvasTab0Heading}>
              {pageData.whyEsgMattersGreen.title}
            </h3>
            <p className={styles.canvasPanelQuote}>
              {pageData.whyEsgMattersGreen.subHeadline}
            </p>
            <p className={styles.canvasPanelLead}>
              {pageData.whyEsgMattersGreen.description}
            </p>
            <div className={styles.canvasEsgKeys}>
              {pageData.whyEsgMattersGreen.keys.map((key, index) => (
                <div
                  key={`${key.text}-${index}`}
                  className={styles.canvasSteppedItem}
                  style={{ marginLeft: `-${offsets[index] ?? index * 20}px` }}
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src="/images/why-esg-matters-to-green/green_bolt.png"
                    className={styles.canvasBoltIcon}
                    alt=""
                  />
                  <span className={styles.canvasSteppedText}>
                    {key.highlighted ? (
                      <>
                        {key.text.split(key.highlighted)[0]}
                        <span className="text-[#23B14D]">
                          {key.highlighted}
                        </span>
                        {key.text.split(key.highlighted)[1]}
                      </>
                    ) : (
                      key.text
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
  })();

  if (canvas) {
    const showDiagonalLine =
      active.index === 0 || active.index === 3 || active.index === 4;
    return (
      <main className={styles.canvasPage} data-node-id="7077:18427">
        <SiteHeader layout="figmaCanvas" figmaPanelVariant="flagship" />
        <div className={styles.canvasBackground} aria-hidden="true">
          <img
            loading="lazy"
            decoding="async"
            src="/images/why-esg-matters-to-green/mask_right.png"
            alt=""
          />
        </div>
        <img
          loading="lazy"
          decoding="async"
          className={styles.canvasVerticalTitle}
          src="/images/why-esg-matters-to-green/why-esg-matters-to-green.png"
          alt="Impact Measurement & ESG"
        />
        <section className={styles.canvasHeader}>
          <h1>
            IMPACT <span>MEASUREMENT</span> &amp; ESG
          </h1>
          <h2>{pageData.mainPage.subHeadline}</h2>
          <p>{pageData.mainPage.description.text}</p>
        </section>
        <nav
          className={styles.canvasMenu}
          aria-label="Impact measurement sections"
        >
          {canvasMenuItems.map((item) => (
            <button
              key={item.index}
              type="button"
              className={
                active.index === item.index ? styles.canvasMenuActive : ""
              }
              onClick={() => handleActive(item.index)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        {showDiagonalLine && (
          <img
            loading="lazy"
            decoding="async"
            className={styles.canvasDiagonalLine}
            src="/images/why-esg-matters-to-green/diagonal_line.svg"
            alt=""
            aria-hidden="true"
          />
        )}
        <div className={styles.canvasDetail}>{canvasDetail}</div>
        <div className={styles.canvasMonitoring}>
          <img
            loading="lazy"
            decoding="async"
            src="/images/why-esg-matters-to-green/shape.png"
            alt=""
            aria-hidden="true"
          />
          <p>
            All metrics are monitored via{" "}
            <span>{pageData.mainPage.quote.highlighted}</span> and third-party
            field audits.
          </p>
          <img
            loading="lazy"
            decoding="async"
            src="/images/why-esg-matters-to-green/shape2.png"
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className={styles.canvasStatement}>
          <h3>
            <span>GREEN</span> Doesn’t Just Talk <span>ESG</span>.
            <br />
            We Operationalize It, Measure It, And Report It —{" "}
            <span>Project By Project</span>.
          </h3>
        </div>
        <div className={styles.canvasCtas}>
          <FigmaAngledCta
            icon="download"
            href={pageData.mainPage.cta[0]?.href || "/engage/contact-us"}
          >
            {pageData.mainPage.cta[0]?.text || "GREEN ESG Policy Brief (PDF)"}
          </FigmaAngledCta>
          <FigmaAngledCta onClick={() => setIsSampleOpen(true)}>
            {pageData.mainPage.cta[1]?.text ||
              "Sample Impact Report or M&E Framework"}
          </FigmaAngledCta>
        </div>
        <D6Chatbot canvasAnchored triggerVariant="figmaCanvas" />
        <ProductEnquiry
          isOpen={isSampleOpen}
          onClose={() => setIsSampleOpen(false)}
          productName="Impact Measurement & ESG"
          titlePrefix="SAMPLE IMPACT REPORT OR"
          titleAccent="M&E FRAMEWORK"
          interestLabel="REQUEST TYPE"
          interestOptions={SAMPLE_IMPACT_INTEREST_OPTIONS}
          defaultInterest="Sample Impact Report"
          submitButtonText="Request Sample"
        />
      </main>
    );
  }

  return (
    <React.Fragment>
      <div className='min-h-screen bg-fixed bg-cover bg-center bg-no-repeat lg:bg-[url("/images/why-esg-matters-to-green/mask_right.png")]'>
        <TopNavigation />
        <div className="relative z-[20] flex min-h-full">
          {/* Left Side  */}
          <div className="hidden w-1/8 items-center justify-center lg:flex">
            <div className="fixed top-1/4 left-4 lg:left-14">
              <img
                loading="lazy"
                decoding="async"
                src="/images/why-esg-matters-to-green/why-esg-matters-to-green.png"
                alt="esg-matters-to-green"
                className="w-4 lg:w-8"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full px-5 pt-28 sm:px-8 lg:w-auto lg:px-8 lg:pl-20 lg:pt-8">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                IMPACT <span className="text-[#23B14D]">MEASUREMENT</span> & ESG
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {pageData.mainPage.subHeadline}
              </h2>
              <p
                className="text-gray-600 text-lg mb-4"
                style={{ whiteSpace: "pre-line" }}
              >
                {pageData.mainPage.description.highlighted ? (
                  <>
                    {
                      pageData.mainPage.description.text.split(
                        pageData.mainPage.description.highlighted,
                      )[0]
                    }
                    <span className="text-[#23B14D] font-semibold">
                      {pageData.mainPage.description.highlighted}
                    </span>
                    {
                      pageData.mainPage.description.text.split(
                        pageData.mainPage.description.highlighted,
                      )[1]
                    }
                  </>
                ) : (
                  pageData.mainPage.description.text
                )}
              </p>
            </div>
            <div className="z-[20] flex lg:hidden relative   ">
              <div className="relative flex items-center">
                <div className=" absolute top-12 -left-16">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="/images/why-esg-matters-to-green/shape.png"
                    alt="shape"
                    className="w-12"
                  />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800 mb-2">
                    All metrics are monitored via
                    <br />
                    <span className="text-[#23B14D]">
                      {pageData.mainPage.quote.highlighted}
                    </span>{" "}
                    and third-party
                    <br />
                    field audits.
                  </p>
                </div>
                <div>
                  <img
                    loading="lazy"
                    decoding="async"
                    src="/images/why-esg-matters-to-green/shape2.png"
                    alt="shape"
                    className="w-12 absolute -right-14 -top-5 "
                  />
                </div>
              </div>
            </div>
            {/* Content Layout */}
            <div className="mt-10 lg:mt-16 lg:flex">
              {/* Left Column - Content List */}
              <div className=" space-y-8">
                {/* Why ESG Matters to GREEN */}
                <div className="cursor-pointer" onClick={() => handleActive(0)}>
                  <h3
                    className={`text-xl lg:text-2xl font-bold mb-2 ${
                      active.index === 0 ? "text-[#23B14D]" : "text-gray-800"
                    }`}
                  >
                    {pageData.whyEsgMattersGreen.title}
                  </h3>
                </div>

                {/* How We Measure Impact */}
                <div className="cursor-pointer" onClick={() => handleActive(1)}>
                  <h3
                    className={`text-xl lg:text-2xl font-bold mb-2 ${
                      active.index === 1 ? "text-[#23B14D]" : "text-gray-800"
                    }`}
                  >
                    How We Measure Impact
                  </h3>
                </div>

                {/* ESG Integration in Project Lifecycle */}
                <div className="cursor-pointer" onClick={() => handleActive(2)}>
                  <h3
                    className={`text-xl lg:text-2xl font-bold mb-2 ${
                      active.index === 2 ? "text-[#23B14D]" : "text-gray-800"
                    }`}
                  >
                    {pageData.esgIntegrationProjectLifeCycle.title}
                  </h3>
                </div>

                {/* Trust Signals */}
                <div className="cursor-pointer" onClick={() => handleActive(3)}>
                  <h3
                    className={`text-xl lg:text-2xl font-bold mb-2 ${
                      active.index === 3 ? "text-[#23B14D]" : "text-gray-800"
                    }`}
                  >
                    {pageData.trustSignals.title}
                  </h3>
                </div>

                {/* Sample Metrics Snapshot */}
                <div className="cursor-pointer" onClick={() => handleActive(4)}>
                  <h3
                    className={`text-xl lg:text-2xl font-bold mb-2 ${
                      active.index === 4 ? "text-[#23B14D]" : "text-gray-800"
                    }`}
                  >
                    {pageData.sampleMetricsSnapshot.title}
                  </h3>
                </div>
              </div>
              <div className="lg:block hidden">
                <img
                  loading="lazy"
                  decoding="async"
                  src="/images/why-esg-matters-to-green/line.png"
                  alt="line"
                />
              </div>
              {/* Right Column - ESG Details */}
              {active.data}
            </div>
          </div>
        </div>

        {/* Monitoring Box */}
        <div className="z-[20] lg:flex hidden relative  justify-end pr-4">
          <div className="relative flex items-center">
            <div className=" absolute top-12 -left-16">
              <img
                loading="lazy"
                decoding="async"
                src="/images/why-esg-matters-to-green/shape.png"
                alt="shape"
                className="w-12"
              />
            </div>
            <div>
              <p className="text-xl mr-12 font-bold text-gray-800 mb-2">
                All metrics are monitored via
                <br />
                <span className="text-[#23B14D]">
                  {pageData.mainPage.quote.highlighted}
                </span>{" "}
                and third-party
                <br />
                field audits.
              </p>
            </div>
            <div>
              <img
                loading="lazy"
                decoding="async"
                src="/images/why-esg-matters-to-green/shape2.png"
                alt="shape"
                className="w-12 absolute right-0 -top-5 "
              />
            </div>
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="z-[20] px-10 my-10 lg:relative flex justify-center  ">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
            <span className="text-[#23B14D]">GREEN</span> Doesn't Just Talk{" "}
            <span className="text-[#23B14D]">ESG</span>.<br />
            We Operationalize It, Measure It, And Report It —{" "}
            <span className="text-[#23B14D]">Project By Project</span>.
          </h3>
        </div>
        <div className="z-[20] relative flex flex-col items-end gap-6 mt-4 mb-20 cursor-pointer">
          <a
            href={pageData.mainPage.cta[0]?.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              loading="lazy"
              decoding="async"
              src="/images/why-esg-matters-to-green/green.png"
              alt={pageData.mainPage.cta[0]?.text || "GREEN ESG Policy Brief"}
            />
          </a>
          <button
            type="button"
            onClick={() => setIsSampleOpen(true)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              loading="lazy"
              decoding="async"
              src="/images/why-esg-matters-to-green/sample.png"
              alt={
                pageData.mainPage.cta[1]?.text ||
                "Sample Impact Report or M&E Framework"
              }
            />
          </button>
        </div>
      </div>
      <Chatbot />
      <ProductEnquiry
        isOpen={isSampleOpen}
        onClose={() => setIsSampleOpen(false)}
        productName="Impact Measurement & ESG"
        titlePrefix="SAMPLE IMPACT REPORT OR"
        titleAccent="M&E FRAMEWORK"
        interestLabel="REQUEST TYPE"
        interestOptions={SAMPLE_IMPACT_INTEREST_OPTIONS}
        defaultInterest="Sample Impact Report"
        submitButtonText="Request Sample"
      />
    </React.Fragment>
  );
};

export default EsgMatters;
