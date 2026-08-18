"use client";

import Image from "next/image";
import { useState } from "react";
import D6Chatbot from "../D6Chatbot";
import ProductEnquiry from "../Product/Modals/ProductEnquiry";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./EpcmServices.module.css";

const phases = [
  {
    name: "Engineering",
    flowName: "Engineering",
    points: ["Conceptual Design", "Detailed Design", "Technical Studies"],
    description:
      "GREEN Solar provides a range of engineering services from yield assessments to executive design and technical supervision.",
    detail: [
      "GREEN Solar provides a range of engineering services from yield assessments to executive design and technical supervision.",
      "Implementation of solar energy projects of any capacity is a complex process and it is best to entrust experts with a proven track record in the industry to carry out your project. Overseen and executed by our team experts, your solar project will deliver the forecasted yield and the highest possible return of investment.",
    ],
  },
  {
    name: "Procurement",
    flowName: "Procurement",
    points: [
      "Supply Chain Management",
      "Vendor Selection",
      "Logistics and Transportation",
    ],
    description:
      "Using a robust global supply chain and highly experienced procurement team, GREEN coordinates delivery for long-lead items, on time and to budget.",
    detail: [
      "Using a robust global Supply Chain and a highly experienced Procurement team, GREEN will procure and coordinate delivery for lengthy lead time items that can be a hindrance on large projects, ensuring delivery on time and pursuant to budget.",
    ],
  },
  {
    name: "Construction",
    flowName: "Construction",
    points: [
      "Civil Works",
      "Electrical Works",
      "Mechanical Works",
      "Installation",
      "Commissioning",
    ],
    description:
      "We provide adaptable, safety-led construction delivery that solves site challenges with accuracy, diligence, and care.",
    detail: [
      "In the construction of Solar Power Plants, our entrepreneurial spirit propels our capacity to provide openness and rapidly adapt.",
      "Our team is adept at overcoming unforeseen obstacles such as inclement weather and supply chain problems. We provide solutions, as opposed to problems. We accomplish your goals with accuracy, diligence, and care, ensuring the security of our teams and the prosperity of the communities we serve.",
    ],
  },
  {
    name: "Operations & Maintenance",
    flowName: "Management",
    points: [
      "Project Planning",
      "Project Oversight",
      "Quality Assurance",
      "Risk Mitigation",
      "Performance Optimization",
    ],
    description:
      "We keep renewable-energy assets operating safely, efficiently, and predictably over the long term.",
    detail: [
      "GREEN Solar supports project performance long after commissioning through tailored operations and maintenance services.",
      "We combine proactive monitoring, practical maintenance, and transparent reporting to protect uptime and maximise the value of every asset.",
    ],
  },
];

export default function EpcmServices() {
  const [activePhase, setActivePhase] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const selectedPhase = phases[activePhase];
  return (
    <main className={styles.page}>
      <div className={styles.background} aria-hidden="true" />
      <SiteHeader compactLogo panel="logoOnly" />
      <Image
        className={styles.verticalTitle}
        src="/images/service/services.svg"
        alt="Services"
        width={73}
        height={507}
        priority
      />
      <section
        className={styles.processFlow}
        aria-label="EPCM delivery process"
      >
        {phases.map((phase, index) => (
          <div className={styles.flowItem} key={phase.name}>
            <article className={styles.flowCard}>
              <div className={styles.flowCardContent}>
                <h2>{phase.flowName}</h2>
                <ul>
                  {phase.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
            {index < phases.length - 1 && (
              <Image
                className={styles.flowArrow}
                src="/images/service/arrow.png"
                alt=""
                width={65}
                height={24}
              />
            )}
          </div>
        ))}
      </section>
      <section className={styles.detail} aria-live="polite">
        <h1>{selectedPhase.name}</h1>
        {selectedPhase.detail.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
      <section className={styles.heading} aria-label="EPCM">
        <h2>EPCM</h2>
        <p>Integrated Renewable Energy Transformation</p>
      </section>
      <section className={styles.servicesPanel} aria-labelledby="our-services">
        <div className={styles.servicesPanelContent}>
          <h2 id="our-services">Our Services</h2>
          <div className={styles.serviceOptions}>
            {phases.map((phase, index) => {
              const isActive = activePhase === index;
              return (
                <button
                  className={isActive ? styles.selectedService : undefined}
                  key={phase.name}
                  onClick={() => setActivePhase(index)}
                  type="button"
                >
                  <span>{phase.name}</span>
                  {isActive && <small>{phase.description}</small>}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <button
        className={styles.enquiryButton}
        onClick={() => setIsEnquiryOpen(true)}
        type="button"
      >
        <Image
          src="/images/service/enquiry.svg"
          alt="Submit an enquiry"
          width={169}
          height={52}
        />
      </button>
      <ProductEnquiry
        defaultInterest={selectedPhase.name}
        interestLabel="SERVICE OF INTEREST"
        interestOptions={phases.map((phase) => phase.name)}
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        titleAccent="ENQUIRY"
        titlePrefix="EPCM"
      />
      <div className={styles.chat}>
        <D6Chatbot triggerClassName={styles.chatTrigger} />
      </div>
    </main>
  );
}
