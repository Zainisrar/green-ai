"use client";

import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./EventsWebinars.module.css";

type EventCard = {
  title: string;
  description: string;
  date: string;
  image: string;
};

const upcomingEvents: EventCard[] = [
  {
    title: "Resilient Energy for Island Communities",
    description:
      "A workshop on microgrid architectures, disaster resilience, and storage economics.",
    date: "August 2025",
    image: "/images/events/figma-resilient-energy.png",
  },
  {
    title: "GRID-INTEL™ Masterclass Series",
    description:
      "A 3-day training on intelligent grid monitoring and predictive switching.",
    date: "September 2025",
    image: "/images/events/figma-grid-intel.png",
  },
];

const years = [
  "Resilient Energy for Island Communities",
  "GRID-INTEL™ Masterclass Series",
  "PNG Clean Energy Forum 2025",
  "AI for Energy Innovation Series",
  "Women in Energy: Pacific Edition",
  "Renewable Energy Integration for Resilience",
];

interface EventsWebinarsProps {
  canvas?: boolean;
}

export default function EventsWebinars({
  canvas = false,
}: EventsWebinarsProps) {
  const cards = [
    ...Array(4).fill(upcomingEvents[0]),
    ...Array(4).fill(upcomingEvents[1]),
  ];

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7080:57600"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />
      <img loading="lazy" decoding="async"
        className={styles.verticalTitle}
        src="/images/events/events.png"
        alt="Events and Webinars"
      />
      <div className={styles.content}>
        <header className={styles.intro}>
          <h1>
            <span>Events</span> &amp; Webinars
          </h1>
          <h2>Where Innovation Meets Action.</h2>
          <p>
            From masterclasses to ministerial panels — GREEN’s events bring
            people together to solve energy challenges that matter.
          </p>
        </header>
        <section className={styles.events} aria-labelledby="upcoming-events">
          <h3 id="upcoming-events">Upcoming Events</h3>
          <div className={styles.grid}>
            {cards.map((event, index) => (
              <article className={styles.card} key={`${event.title}-${index}`}>
                <img loading="lazy" decoding="async" className={styles.cardImage} src={event.image} alt="" />
                <div className={styles.cardBody}>
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  <div className={styles.metadata}>
                    <span>
                      <img loading="lazy" decoding="async" src="/images/events/calendar.png" alt="" />
                      {event.date}
                    </span>
                    <span>
                      <img loading="lazy" decoding="async" src="/images/events/location.png" alt="" />
                      Port Moresby
                    </span>
                  </div>
                </div>
                <FigmaAngledCta className={styles.register} showArrow={false}>
                  Register Now
                </FigmaAngledCta>
              </article>
            ))}
          </div>
          <div className={styles.pagination} aria-hidden="true">
            ‹&nbsp;&nbsp;›
          </div>
        </section>
      </div>
      <aside className={styles.sidebar} aria-label="Events by year">
        <section className={styles.yearList}>
          <h3>
            2025 <span>(26)</span>
          </h3>
          <ul>
            {years.map((event) => (
              <li key={event}>{event}</li>
            ))}
          </ul>
          <h3>
            2024 <span>(42)</span>
          </h3>
          <h3>
            2023 <span>(36)</span>
          </h3>
          <h3>
            2023 <span>(25)</span>
          </h3>
        </section>
        <p className={styles.quote}>
          <svg
            className={styles.quoteCornerLeft}
            width="82"
            height="101"
            viewBox="0 0 82 101"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M54.1612 0.699707L2.48828 98.6997H81.4883"
              stroke="url(#events-quote-gradient)"
              strokeWidth="3"
            />
            <defs>
              <linearGradient
                id="events-quote-gradient"
                x1="465.021"
                y1="-295.745"
                x2="185.277"
                y2="350.425"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFE500" stopOpacity="0.89" />
                <stop offset="1" stopColor="#23D14B" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            className={styles.quoteCornerRight}
            width="82"
            height="101"
            viewBox="0 0 82 101"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M27.327 99.5L79 1.5H0"
              stroke="url(#events-quote-right-gradient)"
              strokeWidth="3"
            />
            <defs>
              <linearGradient
                id="events-quote-right-gradient"
                x1="-383.532"
                y1="395.945"
                x2="-103.789"
                y2="-250.225"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFE500" stopOpacity="0.89" />
                <stop offset="1" stopColor="#23D14B" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
          Train With <em>Purpose.</em>
          <br />
          Certify With <em>Impact.</em>
        </p>
        <FigmaAngledCta className={styles.host}>Host with GREEN</FigmaAngledCta>
      </aside>
      {canvas ? (
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
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
