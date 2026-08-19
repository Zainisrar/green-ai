"use client";
import React, { useEffect, useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import D6Chatbot from "../D6Chatbot";
import Chatbot from "../Chatbot";
import styles from "./EsgMatters.module.css";
import { useImpactMeasurementEsg } from "../../../hooks/useImpactMeasurementEsg";
import SampleImpactReport from "./Modals/SampleImpactReport";

const FALLBACK_DATA = {
  id: 0,
  createdAt: "",
  updatedAt: "",
  mainPage: {
    title: "Impact Measurement & ESG",
    subHeadline: "We Don’t Just Deliver Energy. We Quantify Its Impact.",
    description: {
      text: "At GREEN, every installation is tracked, audited, and tied to real-world outcomes. Our ESG commitment is engineered into every project — from rural solar to hybrid grid infrastructure.",
      highlighted: "GREEN",
    },
    quote: {
      text: "All metrics are monitored via GRID-INTEL™ and third-party field audits.",
      highlighted: "GRID-INTEL™",
    },
    cta: [
      { href: "/engage/contact-us", text: "GREEN ESG Policy Brief" },
      { href: "#sample-impact-report", text: "Sample Impact Report or M&E Framework" },
    ],
  },
  whyEsgMattersGreen: {
    title: "Why ESG Matters to GREEN",
    subHeadline: "“We operate in environments where energy is everything. So impact isn't an afterthought — it's the foundation.”",
    description: "GREEN’s projects are designed and reported in full alignment with:",
    keys: [
      { text: "ESG frameworks (Environmental, Social, Governance)", highlighted: "(Environmental, Social, Governance)" },
      { text: "UN SDGs (especially SDG 7, 9, 13, and 17)", highlighted: "(especially SDG 7, 9, 13, and 17)" },
      { text: "Donor and Ministry reporting protocols", highlighted: "" },
      { text: "Community-led verification models", highlighted: "" },
    ],
  },
  howWeMeasureImpact: {
    metrics: [
      { category: "Reliability", keyMetricsTracked: "Availability, uptime, and service continuity" },
      { category: "Livelihoods", keyMetricsTracked: "Productive use and household outcomes" },
      { category: "Environment", keyMetricsTracked: "Emissions avoided and resource efficiency" },
    ],
    quote: { text: "We measure to learn, adapt, and improve.", highlighted: "improve" },
  },
  esgIntegrationProjectLifeCycle: {
    title: "ESG Integration in Project Lifecycle",
    items: [
      { title: "Design", description: "Set measurable environmental and social outcomes before delivery begins." },
      { title: "Deliver", description: "Track performance and community value through implementation." },
      { title: "Report", description: "Turn verified project data into transparent learning." },
    ],
    quote: { text: "Good systems create lasting value.", highlighted: "lasting" },
  },
  trustSignals: {
    title: "Trust Signals",
    items: ["Transparent metrics", "Local participation", "Continuous improvement"],
    quote: { text: "Trust is built in the details.", highlighted: "details" },
  },
  sampleMetricsSnapshot: {
    title: "Sample Metrics Snapshot",
    description: { text: "A clear view of progress helps every partner make better decisions.", highlighted: "progress" },
    keys: [],
  },
};

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
      <div className="mt-8 lg:ml-4 ">
        {/* Why ESG Matters Box */}
        <div className="">
          <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-4">
            Why ESG Matters to GREEN
          </h3>
          <p className="lg:ml-6 text-[#23B14D] text-lg font-semibold italic mb-4">
            "We operate in environments where energy is everything.
            <br />
            So impact isn't an afterthought — it's the foundation."
          </p>
          <p className="text-gray-600 ml-4 text-lg  italic mb-4">
            GREEN's projects are designed and reported in full alignment with:
          </p>
          <div className="space-y-2 italic">
            <div className="flex items-center  space-x-2">
              <span>
                <img
                  src="/images/grid-intel/lighting.png"
                  className="w-14 -mt-4"
                  alt="lighting"
                />
              </span>
              <span className="text-sm font-semibold text-gray-800">
                ESG frameworks{" "}
                <span className="text-[#23B14D]">
                  (Environmental, Social, Governance){" "}
                </span>
              </span>
            </div>
            <div className="flex items-center -ml-10 space-x-2">
              <span>
                <img
                  src="/images/grid-intel/lighting.png"
                  className="w-14 -mt-4"
                  alt="lighting"
                />
              </span>
              <span className="text-sm font-semibold text-gray-800">
                UN SDGs{" "}
                <span className="text-[#23B14D]">
                  (Sustainable Development Goals)
                </span>{" "}
              </span>
            </div>
            <div className="flex items-center -ml-16 space-x-2">
              <span>
                <img
                  src="/images/grid-intel/lighting.png"
                  className="w-14 -mt-4"
                  alt="lighting"
                />
              </span>
              <span className="text-sm font-semibold text-gray-800">
                Donor and Ministry reporting protocols
              </span>
            </div>
            <div className="flex items-center -ml-20 space-x-2">
              <span>
                <img
                  src="/images/grid-intel/lighting.png"
                  className="w-14 -mt-4"
                  alt="lighting"
                />
              </span>
              <span className="text-sm font-semibold text-gray-800">
                Community-led verification models
              </span>
            </div>
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
            <div className="mt-8 lg:ml-4 ">
              <div className="">
                <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-4">
                  {pageData.whyEsgMattersGreen.title}
                </h3>
                <p className="ml-6 text-[#23B14D] text-lg font-semibold italic mb-4">
                  {pageData.whyEsgMattersGreen.subHeadline}
                </p>
                <p className="text-gray-600 lg:ml-4 text-lg italic mb-4">
                  {pageData.whyEsgMattersGreen.description}
                </p>
                <div className="space-y-2 italic">
                  {pageData.whyEsgMattersGreen.keys.map((key, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2"
                      style={{ marginLeft: `-${idx * 10}px` }}
                    >
                      <span>
                        <img
                          src="/images/grid-intel/lighting.png"
                          className="w-14 -mt-4"
                          alt="lighting"
                        />
                      </span>
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
        break;
      case 1:
        setActive({
          index: 1,
          data: (
            <div className="mt-8 lg:ml-4 lg:w-[40%]">
              <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-6">
                How We Measure Impact
              </h3>

              {/* Impact Measurement Table */}
              <div className="lg:ml-4 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-lg font-bold text-[#23B14D]">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-lg font-bold text-[#23B14D]">
                        Key Metrics Tracked
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.howWeMeasureImpact.metrics.map((metric, idx) => (
                      <tr key={idx}>
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
                    
                      <div className=" text-green-600 italic">
                        “All metrics are monitored via GRID-INTEL™ and
                        third-party field audits.”
                      </div>
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

              {/* ESG Integration List */}
              <div className="lg:ml-4 space-y-4">
                {pageData.esgIntegrationProjectLifeCycle.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-6">
                    <div className="w-32">
                      <h4 className="font-bold text-gray-800 italic text-lg lg:text-xl">
                        {item.title}
                      </h4>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 italic">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
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

              {/* Trust Signals List */}
              <div className="lg:ml-4 space-y-4">
                {pageData.trustSignals.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <span>
                        <img
                          src="/images/grid-intel/lighting.png"
                          className="w-14 -mt-4"
                          alt="lighting"
                        />
                      </span>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        break;
      case 4:
        setActive({
          index: 4,
          data: (
            <div className="mt-8 lg:ml-4">
              <h3 className="text-xl lg:text-2xl lg:ml-8 font-bold text-gray-800 mb-6">
                {pageData.sampleMetricsSnapshot.title}
              </h3>

              {/* Year Range and Project Type */}
              <div className="lg:ml-4 mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {pageData.sampleMetricsSnapshot.description.highlighted && (
                    <span className="font-bold">{pageData.sampleMetricsSnapshot.description.highlighted}</span>
                  )}
                  {pageData.sampleMetricsSnapshot.description.text.replace(pageData.sampleMetricsSnapshot.description.highlighted, '')}
                </h4>
              </div>

              {/* Metrics List */}
              <div className="lg:ml-4 space-y-4">
                {pageData.sampleMetricsSnapshot.keys.map((key, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <span>
                        <img
                          src="/images/grid-intel/lighting.png"
                          className="w-14 -mt-4"
                          alt="lighting"
                        />
                      </span>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">
                      {key.highlighted && (
                        <span className="text-[#23B14D] font-bold text-lg">
                          {key.highlighted}
                        </span>
                      )}{" "}
                      {key.text.replace(key.highlighted, "")}
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
            <h3>How We Measure Impact</h3>
            <table className={styles.canvasMetricsTable}>
              <thead><tr><th>Category</th><th>Key Metrics Tracked</th></tr></thead>
              <tbody>{pageData.howWeMeasureImpact.metrics.map((metric, index) => (
                <tr key={`${metric.category}-${index}`}><td>{metric.category}</td><td>{metric.keyMetricsTracked}</td></tr>
              ))}</tbody>
            </table>
            <p className={styles.canvasPanelNote}>{pageData.howWeMeasureImpact.quote.text}</p>
          </div>
        );
      case 2:
        return (
          <div className={styles.canvasDetailInner}>
            <h3>{pageData.esgIntegrationProjectLifeCycle.title}</h3>
            <div className={styles.canvasDetailList}>{pageData.esgIntegrationProjectLifeCycle.items.map((item, index) => (
              <div key={`${item.title}-${index}`}><strong>{item.title}</strong><span>{item.description}</span></div>
            ))}</div>
          </div>
        );
      case 3:
        return (
          <div className={styles.canvasDetailInner}>
            <h3>{pageData.trustSignals.title}</h3>
            <div className={styles.canvasDetailList}>{pageData.trustSignals.items.map((item, index) => (
              <div key={`${item}-${index}`}><strong>{item}</strong><span>Verified through transparent project reporting and local participation.</span></div>
            ))}</div>
          </div>
        );
      case 4:
        return (
          <div className={styles.canvasDetailInner}>
            <h3>{pageData.sampleMetricsSnapshot.title}</h3>
            <p className={styles.canvasPanelLead}>{pageData.sampleMetricsSnapshot.description.text}</p>
          </div>
        );
      default:
        return (
          <div className={styles.canvasDetailInner}>
            <h3>{pageData.whyEsgMattersGreen.title}</h3>
            <p className={styles.canvasPanelQuote}>{pageData.whyEsgMattersGreen.subHeadline}</p>
            <p className={styles.canvasPanelLead}>{pageData.whyEsgMattersGreen.description}</p>
            <div className={styles.canvasEsgKeys}>{pageData.whyEsgMattersGreen.keys.map((key, index) => (
              <div key={`${key.text}-${index}`}><span className={styles.canvasKeyMark} /><span>{key.text}</span></div>
            ))}</div>
          </div>
        );
    }
  })();

  if (canvas) {
    return (
      <main className={styles.canvasPage} data-node-id="7077:18427">
        <SiteHeader layout="figmaCanvas" figmaPanelVariant="flagship" />
        <div className={styles.canvasBackground} aria-hidden="true">
          <img src="/images/why-esg-matters-to-green/bg.jpg" alt="" />
        </div>
        <img className={styles.canvasVerticalTitle} src="/images/why-esg-matters-to-green/why-esg-matters-to-green.png" alt="Impact Measurement & ESG" />
        <section className={styles.canvasHeader}>
          <h1>IMPACT <span>MEASUREMENT</span> &amp; ESG</h1>
          <h2>{pageData.mainPage.subHeadline}</h2>
          <p>{pageData.mainPage.description.text}</p>
        </section>
        <nav className={styles.canvasMenu} aria-label="Impact measurement sections">
          {canvasMenuItems.map((item) => (
            <button key={item.index} type="button" className={active.index === item.index ? styles.canvasMenuActive : ""} onClick={() => handleActive(item.index)}>{item.label}</button>
          ))}
        </nav>
        <div className={styles.canvasDetail}>{canvasDetail}</div>
        <div className={styles.canvasMonitoring}>
          <img src="/images/why-esg-matters-to-green/shape.png" alt="" aria-hidden="true" />
          <p>All metrics are monitored via <span>{pageData.mainPage.quote.highlighted}</span> and third-party field audits.</p>
          <img src="/images/why-esg-matters-to-green/shape2.png" alt="" aria-hidden="true" />
        </div>
        <div className={styles.canvasStatement}>
          <img src="/images/why-esg-matters-to-green/shape.png" alt="" aria-hidden="true" />
          <h3><span>GREEN doesn’t just talk ESG.</span><br />We operationalize it, measure it, and report it — project by project.</h3>
          <img src="/images/why-esg-matters-to-green/shape2.png" alt="" aria-hidden="true" />
        </div>
        <div className={styles.canvasCtas}>
          <FigmaAngledCta href={pageData.mainPage.cta[0]?.href || "/engage/contact-us"}>{pageData.mainPage.cta[0]?.text || "GREEN ESG Policy Brief"}</FigmaAngledCta>
          <FigmaAngledCta icon="download" onClick={() => setIsSampleOpen(true)}>{pageData.mainPage.cta[1]?.text || "Sample Impact Report or M&E Framework"}</FigmaAngledCta>
        </div>
        <D6Chatbot canvasAnchored triggerVariant="figmaCanvas" />
        <SampleImpactReport isOpen={isSampleOpen} onClose={() => setIsSampleOpen(false)} />
      </main>
    );
  }

  return (
    <React.Fragment>
      <div className='bg-fixed bg-cover bg-center bg-no-repeat lg:bg-[url("/images/why-esg-matters-to-green/bg.jpg")]'>
        <TopNavigation />
        <div className="flex h-full z-[20] relative">
          {/* Left Side  */}
          <div className="w-1/8 flex items-center justify-center">
            <div className="fixed top-1/4 left-4 lg:left-14">
              <img
                src="/images/why-esg-matters-to-green/why-esg-matters-to-green.png"
                alt="esg-matters-to-green"
                className="w-4 lg:w-8"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className=" px-8 pl-14 lg:pl-20 pt-8">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                IMPACT <span className="text-[#23B14D]">MEASUREMENT</span> & ESG
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {pageData.mainPage.subHeadline}
              </h2>
              <p className="text-gray-600 text-lg mb-4" style={{ whiteSpace: "pre-line" }}>
                {pageData.mainPage.description.highlighted ? (
                  <>
                    {pageData.mainPage.description.text.split(pageData.mainPage.description.highlighted)[0]}
                    <span className="text-[#23B14D] font-semibold">
                      {pageData.mainPage.description.highlighted}
                    </span>
                    {pageData.mainPage.description.text.split(pageData.mainPage.description.highlighted)[1]}
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
                src="/images/why-esg-matters-to-green/shape.png"
                alt="shape"
                className="w-12"
              />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800 mb-2">
                All metrics are monitored via
                <br />
                <span className="text-[#23B14D]">{pageData.mainPage.quote.highlighted}</span> and third-party
                <br />
                field audits.
              </p>
            </div>
            <div>
              <img
                src="/images/why-esg-matters-to-green/shape2.png"
                alt="shape"
                className="w-12 absolute -right-14 -top-5 "
              />
            </div>
          </div>
        </div>
            {/* Content Layout */}
            <div className="lg:flex  mt-16">
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
                src="/images/why-esg-matters-to-green/shape.png"
                alt="shape"
                className="w-12"
              />
            </div>
            <div>
              <p className="text-xl mr-12 font-bold text-gray-800 mb-2">
                All metrics are monitored via
                <br />
                <span className="text-[#23B14D]">{pageData.mainPage.quote.highlighted}</span> and third-party
                <br />
                field audits.
              </p>
            </div>
            <div>
              <img
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
          <a href={pageData.mainPage.cta[0]?.href || "#"} target="_blank" rel="noopener noreferrer">
            <img
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
              src="/images/why-esg-matters-to-green/sample.png"
              alt={pageData.mainPage.cta[1]?.text || "Sample Impact Report or M&E Framework"}
            />
          </button>
        </div>
      </div>
      <Chatbot />
      <SampleImpactReport isOpen={isSampleOpen} onClose={() => setIsSampleOpen(false)} />
    </React.Fragment>
  );
};

export default EsgMatters;
