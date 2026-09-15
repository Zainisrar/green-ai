"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./Expertise.module.css";
import SolutionDetail from "./SolutionDetail";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 970;

interface ExpertiseDetailProps {
  slug: string;
}

// Nodes 7077:3843, 7077:3970 and 7077:4093 are carousel states of this
// fixed Figma detail screen.  The CMS overview record is intentionally not
// used here: it currently mixes the Education title with Healthcare content.
const FIGMA_DETAIL = {
  title: "POWERING",
  highlightedTitle: "HEALTHCARE",
  subtitle:
    "Renewable Energy and Medical Technology Augmentation for Sustainable Healthcare System",
  description:
    "Powering the Healthcare initiative, GREEN Limited equips healthcare facilities with renewable energy-based power production augmented with medical technology to impart enabling and empowering capabilities for Sustainable Healthcare Facilities. The Sustainable Healthcare System provides vital, modern, and life-saving medical equipment that meets the standards and requirements of the healthcare industry. This solution promotes health and well-being for all those who employ it. Enhance Healthcare Facilities Using the Powering Healthcare Program",
  images: [
    {
      src: "/images/expertise/powerhealthcare1.png",
      alt: "Solar panels installed on a healthcare facility roof",
    },
    {
      src: "/images/expertise/powerhealthcare2.png",
      alt: "Aerial view of a healthcare facility and water tank",
    },
    {
      src: "/images/expertise/powerhealthcare3.png",
      alt: "Solar powered healthcare facility surrounded by forest",
    },
  ],
  features: [
    {
      icon: "/images/expertise/medicalservices.svg",
      title: "Medical Services & Lighting",
      description:
        "Enable effective delivery of health services with energy efficient lifesaving medical devices and lighting etc.",
    },
    {
      icon: "/images/expertise/diseasetreatement.svg",
      title: "Disease Treatment & Prevention",
      description:
        "Enables Healthcare sectors to broaden services for prevention and treatment of non-communicable diseases and other diseases.",
    },
    {
      icon: "/images/expertise/medicalservices.svg",
      title: "Maternal Care",
      description:
        "Reduce maternal infant mortality rate with effective obstetric procedures and surgery with reliable lighting and advanced medical equipment etc.",
    },
    {
      icon: "/images/expertise/diseasetreatement.svg",
      title: "Disease Diagnosis & Emergency Procedures",
      description:
        "Broaden services for prevention and treatment of non-communicable diseases and other diseases.",
    },
  ],
  categories: [
    { id: "education", label: "Powering Education" },
    { id: "agriculture", label: "Powering Agriculture" },
    { id: "home", label: "Powering Home" },
    { id: "education-alt", label: "Powering Education" },
  ],
  categoryImage: "/images/expertise/figma-slider/rectangle-428.png",
} as const;

/** The route uses the same fixed Figma detail composition as node 7077:3843. */
const DETAILS_BY_SLUG = {
  "powering-healthcare": FIGMA_DETAIL,
} as const;

export default function ExpertiseDetail({ slug }: ExpertiseDetailProps) {
  const router = useRouter();
  const [desktopScale, setDesktopScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      setDesktopScale(
        Math.min(
          window.innerWidth / DESIGN_WIDTH,
          window.innerHeight / DESIGN_HEIGHT,
        ),
      );
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const detail =
    DETAILS_BY_SLUG[slug as keyof typeof DETAILS_BY_SLUG] || FIGMA_DETAIL;

  return (
    <main className={styles.page}>
      <section
        className={styles.desktopStage}
        aria-label={detail.highlightedTitle}
      >
        <div
          className={styles.canvas}
          data-node-id="7077:3843"
          data-name="Solutions page -D1"
          style={{ transform: `translateX(-50%) scale(${desktopScale})` }}
        >
          <SiteHeader layout="figmaCanvas" canvasActiveNavigation />
          <SolutionDetail
            nodeId="7077:3843"
            title={detail.title}
            highlightedTitle={detail.highlightedTitle}
            subtitle={detail.subtitle}
            description={detail.description}
            images={detail.images}
            features={detail.features}
            categories={detail.categories}
            activeCategoryImage={detail.categoryImage}
            activeCategoryLabel="Powering Healthcare"
            startHref="/engage/contact-us"
            onBack={() => router.push("/expertise")}
          />
          <D6Chatbot canvasAnchored triggerVariant="figmaCanvas" />
        </div>
      </section>

      <section
        className={styles.mobileLayout}
        aria-label={detail.highlightedTitle}
      >
        <SiteHeader />
        <div className={styles.mobileHero}>
          <p>Solutions</p>
          <h1>
            {detail.title} <span>{detail.highlightedTitle}</span>
          </h1>
          <h2>{detail.subtitle}</h2>
          <img src={detail.images[0].src} alt={detail.images[0].alt} />
          <p>{detail.description}</p>
          <Link href="/engage/contact-us">Let&apos;s Start</Link>
        </div>
        <D6Chatbot />
      </section>
    </main>
  );
}
