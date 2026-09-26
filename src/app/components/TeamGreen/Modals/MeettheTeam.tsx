"use client";

import { useState } from "react";
import TeamGreenModalShell from "./TeamGreenModalShell";
import styles from "./TeamGreenModals.module.css";

interface TeamMember {
  img: string;
  name: string;
  position: string;
}

interface FallbackTeamMember {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  image: string;
}

interface MeetTeamData {
  quote?: {
    text?: string;
    text1?: string;
    text2?: string;
    highlighted?: string;
    highlightedText?: string;
  };
  title?: string;
  jobTitle?: unknown[];
  description?: string;
  designations?: Array<{
    name: string;
    members: TeamMember[];
  }>;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: MeetTeamData;
}

const FALLBACK_MEMBERS: Record<string, FallbackTeamMember[]> = {
  ceo: [
    {
      id: 1,
      firstName: "Bernard",
      lastName: "George",
      role: "Chief Executive Officer",
      department: "Executive",
      image: "/images/our-team/bernard-george.png",
    },
  ],
  cto: [
    {
      id: 2,
      firstName: "Senthilkumar",
      lastName: "Chockalingam",
      role: "Senior Business and Engineering Manager",
      department: "Technology",
      image: "/images/our-team/senthilkumar.png",
    },
  ],
  hcm: [
    {
      id: 3,
      firstName: "Patricia",
      lastName: "Clark",
      role: "Human Capital Manager",
      department: "HR & People",
      image: "/images/our-team/bernard-george.png",
    },
  ],
  engineers: [
    {
      id: 4,
      firstName: "Carlos",
      lastName: "Rodriguez",
      role: "Lead Systems Engineer",
      department: "Engineering",
      image: "/images/our-team/senthilkumar.png",
    },
  ],
  regionalLeads: [
    {
      id: 5,
      firstName: "Mark",
      lastName: "Peterson",
      role: "Regional Lead - Pacific",
      department: "Operations",
      image: "/images/our-team/bernard-george.png",
    },
  ],
};

const CATEGORIES = [
  { key: "ceo", title: "CEO" },
  { key: "cto", title: "CTO" },
  { key: "hcm", title: "HCM" },
  { key: "engineers", title: "Engineers" },
  { key: "regionalLeads", title: "Regional Leads" },
];

const MeettheTeam = ({ isOpen, onClose, data }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("cto");

  const title = "Meet the Team";
  const headline =
    "- We don't just work on infrastructure. We work on impact.”";
  const quoteText =
    data?.quote?.text ||
    "“Team GREEN doesn't clock in. We show up — because lives depend on it.”";
  const quoteHighlight =
    data?.quote?.highlightedText || data?.quote?.highlighted || "GREEN";

  const getCurrentMembers = (): Array<{
    name: string;
    role: string;
    image: string;
    department?: string;
  }> => {
    // Check if CMS provided matching designation
    if (data?.designations && data.designations.length > 0) {
      const matchedDesignation = data.designations.find(
        (d) =>
          d.name.toLowerCase() === selectedCategory.toLowerCase() ||
          (selectedCategory === "regionalLeads" &&
            d.name.toLowerCase().includes("regional")),
      );
      if (matchedDesignation && matchedDesignation.members.length > 0) {
        return matchedDesignation.members.map((m) => ({
          name: m.name,
          role: m.position,
          image:
            m.img ||
            (selectedCategory === "cto" || selectedCategory === "engineers"
              ? "/images/our-team/senthilkumar.png"
              : "/images/our-team/bernard-george.png"),
        }));
      }
    }

    const fallbackList =
      FALLBACK_MEMBERS[selectedCategory] || FALLBACK_MEMBERS.cto;
    return fallbackList.map((m) => ({
      name: `${m.firstName} ${m.lastName}`,
      role: m.role,
      image: m.image,
      department: m.department,
    }));
  };

  const rawMembers = getCurrentMembers();
  // Ensure 6 cards are rendered to fill the 2x3 grid as shown in Figma
  const members =
    rawMembers.length < 6
      ? Array.from({ length: 6 }, (_, i) => rawMembers[i % rawMembers.length])
      : rawMembers.slice(0, 6);

  const topMembers = members.slice(0, 3);
  const bottomMembers = members.slice(3, 6);

  const renderCard = (member: (typeof members)[0], idx: number) => (
    <div
      key={`team-member-${idx}-${member.name}`}
      className={styles.memberCard}
    >
      <div className={styles.memberFrameWrap}>
        <svg
          className={styles.memberFrameSvg}
          viewBox="0 0 241 145"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={`cardGrad-${idx}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFE500" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#23D14B" stopOpacity="0.65" />
            </linearGradient>
          </defs>
          <path
            d="M 67.87 0 L 241 0 L 173.13 145 L 0 145 Z"
            fill="rgba(255, 255, 255, 0.4)"
            stroke={`url(#cardGrad-${idx})`}
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <img
          src={member.image}
          alt={member.name}
          className={styles.memberPhoto}
          decoding="async"
          width={241}
          height={190}
          onError={(e) => {
            e.currentTarget.src =
              selectedCategory === "cto" || selectedCategory === "engineers"
                ? "/images/our-team/senthilkumar.png"
                : "/images/our-team/bernard-george.png";
          }}
        />
      </div>
      <div className={styles.memberInfo}>
        <h4 className={styles.memberName}>{member.name}</h4>
        <p className={styles.memberRole}>{member.role}</p>
      </div>
    </div>
  );

  return (
    <TeamGreenModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      headline={headline}
      quoteText={quoteText}
      quoteHighlight={quoteHighlight}
      layout="team"
      width={1906}
      height={801}
      bodyClassName={styles.teamBody}
    >
      <div className={styles.teamWrap}>
        {/* Left Categories Navigation with Parallelogram Slant matching Figma */}
        <div className={styles.teamSidebar}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`${styles.teamTabBtn} ${
                selectedCategory === cat.key ? styles.teamTabActive : ""
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Right Members Grid (2 rows x 3 columns with Parallelogram Tilt matching Figma) */}
        <div className={styles.teamMembersContainer}>
          <div className={styles.teamRowTop}>
            {topMembers.map((member, idx) => renderCard(member, idx))}
          </div>
          <div className={styles.teamRowBottom}>
            {bottomMembers.map((member, idx) => renderCard(member, idx + 3))}
          </div>
        </div>
      </div>
    </TeamGreenModalShell>
  );
};

export default MeettheTeam;
