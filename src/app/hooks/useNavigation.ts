import { useEffect, useState } from "react";

interface NavigationImage {
  alt: string;
  src: string;
}

interface NavigationText {
  description: string;
  highlighted: string;
}

interface NavigationItem {
  id: number;
  name: string;
  slug: string;
  top: boolean;
  accesor?: string;
  accessor?: string;
  image?: NavigationImage;
  text?: NavigationText;
  children?: NavigationItem[];
}

interface NavigationData {
  success: boolean;
  data: NavigationItem[];
}

/** Keeps the Figma navigation usable when the CMS endpoint is unavailable. */
const fallbackNavigation: NavigationItem[] = [
  {
    id: 1,
    name: "Explore",
    slug: "/explore/welcome-to-green",
    top: true,
    children: [
      {
        id: 11,
        name: "Welcome to GREEN",
        slug: "/explore/welcome-to-green",
        top: false,
        image: { src: "/images/nav/1.png", alt: "Welcome to GREEN" },
        text: {
          description:
            "Start here. GREEN’s mission, impact, and world in motion",
          highlighted: "GREEN’s",
        },
      },
      { id: 12, name: "Why GREEN?", slug: "/explore/why-green", top: false },
      {
        id: 13,
        name: "Global Snapshot",
        slug: "/explore/global-snapshot",
        top: false,
      },
      {
        id: 14,
        name: "Fast Facts & Stats",
        slug: "/explore/fast-facts-stats",
        top: false,
      },
    ],
  },
  {
    id: 2,
    name: "Evolution",
    slug: "/evolution/our-story-milestones",
    top: true,
    children: [
      {
        id: 21,
        name: "Our Story & Milestones",
        slug: "/evolution/our-story-milestones",
        top: false,
        image: { src: "/images/nav/2.png", alt: "GREEN solar installation" },
        text: {
          description: "Our journey from PNG roots to global energy leader",
          highlighted: "PNG",
        },
      },
      {
        id: 22,
        name: "Mission & Vision",
        slug: "/evolution/mission-vision",
        top: false,
      },
      {
        id: 23,
        name: "Leadership Team",
        slug: "/evolution/leadership-team",
        top: false,
      },
      {
        id: 24,
        name: "Certifications & Accreditations",
        slug: "/evolution/certifications-accreditations",
        top: false,
      },
      {
        id: 25,
        name: "Sustainability & ESG Commitments",
        slug: "/evolution/sustainability-esg-commitments",
        top: false,
      },
    ],
  },
  {
    id: 3,
    name: "Engineering",
    slug: "/engineering/solar-epcm-services",
    top: true,
    children: [
      {
        id: 31,
        name: "Solar EPC Services",
        slug: "/engineering/solar-epcm-services",
        top: false,
        image: { src: "/images/nav/3.png", alt: "GREEN products" },
        text: {
          description: "Explore our comprehensive solutions and services",
          highlighted: "solutions",
        },
      },
      {
        id: 32,
        name: "Hybrid & Microgrid Solutions",
        slug: "/engineering/hybrid-microgrid-solutions",
        top: false,
      },
      {
        id: 33,
        name: "Energy Storage & Smart Grid",
        slug: "/engineering/energy-storage-smart-grid",
        top: false,
      },
      {
        id: 34,
        name: "O&M & Monitoring",
        slug: "/engineering/om-monitoring",
        top: false,
      },
      {
        id: 35,
        name: "Digital & Design Innovation",
        slug: "/engineering/grid-intel",
        top: false,
      },
      {
        id: 36,
        name: "Products & Systems",
        slug: "/engineering/products",
        top: false,
      },
    ],
  },
  {
    id: 4,
    name: "Endeavors",
    slug: "/endeavors/project-portfolio",
    top: true,
    children: [
      {
        id: 41,
        name: "Project Portfolio",
        slug: "/endeavors/project-portfolio",
        top: false,
        image: { src: "/images/nav/4.png", alt: "GREEN project portfolio" },
        text: {
          description: "Real projects. Real impact.",
          highlighted: "Real impact",
        },
      },
      {
        id: 42,
        name: "Flagship Projects",
        slug: "/endeavors/flagship-projects",
        top: false,
      },
      {
        id: 43,
        name: "Case Studies",
        slug: "/endeavors/project-portfolio",
        top: false,
      },
      {
        id: 44,
        name: "GREEN SunShine Deployments",
        slug: "/engineering/products",
        top: false,
      },
      {
        id: 45,
        name: "GREEN Em’Pawa Sites",
        slug: "/engineering/products/green-empawa",
        top: false,
      },
      {
        id: 46,
        name: "Community Energy Stories",
        slug: "/endeavors/flagship-projects",
        top: false,
      },
    ],
  },
  {
    id: 5,
    name: "Enlighten",
    slug: "/enlighten/insights-articles",
    top: true,
    children: [
      {
        id: 51,
        name: "Insights & Articles",
        slug: "/enlighten/insights-articles",
        top: false,
        image: { src: "/images/nav/5.png", alt: "GREEN energy insights" },
        text: {
          description:
            "Knowledge sharing, thought leadership, and market insight",
          highlighted: "Knowledge",
        },
      },
      {
        id: 52,
        name: "Reports & Whitepapers",
        slug: "/enlighten/reports-whitepapers",
        top: false,
      },
      {
        id: 53,
        name: "Events & Webinars",
        slug: "/enlighten/events-webinars",
        top: false,
      },
      {
        id: 54,
        name: "Thought Leadership",
        slug: "/enlighten/thought-leadership",
        top: false,
      },
      {
        id: 55,
        name: "Media & Mentions",
        slug: "/enlighten/media-mentions",
        top: false,
      },
      {
        id: 56,
        name: "Learning Hub",
        slug: "/enlighten/learning-hub",
        top: false,
        children: [
          {
            id: 561,
            name: "GREEN Academy",
            slug: "/enlighten/learning-hub",
            top: false,
          },
          {
            id: 562,
            name: "Training & Certifications",
            slug: "/enlighten/learning-hub",
            top: false,
          },
          {
            id: 563,
            name: "Knowledge Base",
            slug: "/enlighten/learning-hub",
            top: false,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Ecosystem",
    slug: "/ecosystem/client-partnerships",
    top: true,
    children: [
      {
        id: 61,
        name: "Client Partners",
        slug: "/ecosystem/client-partnerships",
        top: false,
        image: { src: "/images/nav/6.png", alt: "GREEN supply ecosystem" },
        text: {
          description: "The world of partners that power our promise",
          highlighted: "partners",
        },
      },
      {
        id: 62,
        name: "Supply Partners",
        slug: "/ecosystem/supply-partners",
        top: false,
      },
      {
        id: 63,
        name: "Technology & Innovation Alliances",
        slug: "/ecosystem/technology-innovation-alliances",
        top: false,
      },
      {
        id: 64,
        name: "Development & Funding Partners",
        slug: "/ecosystem/collaboration-innovation",
        top: false,
      },
      {
        id: 65,
        name: "Strategic Collaborations",
        slug: "/ecosystem/collaboration-innovation",
        top: false,
      },
      {
        id: 66,
        name: "Industry Affiliations & Certifications",
        slug: "/ecosystem/industry-affiliations-certifications",
        top: false,
      },
    ],
  },
  {
    id: 7,
    name: "Empower",
    slug: "/empower/join-us",
    top: true,
    children: [
      {
        id: 71,
        name: "Careers at GREEN",
        slug: "/empower/careers-at-green",
        top: false,
        image: { src: "/images/nav/8.png", alt: "GREEN community network" },
        text: {
          description: "People-first. Talent-driven.",
          highlighted: "People-first",
        },
      },
      {
        id: 72,
        name: "Internships & Graduate Pathways",
        slug: "/empower/green-talent-incubator",
        top: false,
      },
      {
        id: 73,
        name: "GREEN Em’Pawa",
        slug: "/engineering/products/green-empawa",
        top: false,
      },
      {
        id: 74,
        name: "Life at GREEN",
        slug: "/empower/team-green",
        top: false,
      },
      {
        id: 75,
        name: "Women in Energy",
        slug: "/empower/women-in-energy",
        top: false,
      },
    ],
  },
  {
    id: 8,
    name: "Engage",
    slug: "/engage/partner-with-us",
    top: true,
    children: [
      {
        id: 81,
        name: "Partner With Us",
        slug: "/engage/partner-with-us",
        top: false,
        image: { src: "/images/nav/9.png", alt: "Contact GREEN" },
        text: {
          description: "Let's connect and define future together",
          highlighted: "Connect",
        },
      },
      {
        id: 82,
        name: "Become a Supplier",
        slug: "/engage/become-a-supplier",
        top: false,
      },
      {
        id: 83,
        name: "Investor Relations",
        slug: "/engage/investor-relations",
        top: false,
      },
      {
        id: 84,
        name: "Media & Press",
        slug: "/engage/media-press",
        top: false,
      },
      {
        id: 85,
        name: "Public Events & Volunteering",
        slug: "/engage/public-events-volunteering",
        top: false,
      },
      { id: 86, name: "Contact Us", slug: "/engage/contact-us", top: false },
      {
        id: 87,
        name: "Book a Consultation",
        slug: "/engage/book-a-consultation",
        top: false,
      },
      {
        id: 88,
        name: "Request a Proposal (RFP)",
        slug: "/engage/request-a-proposal",
        top: false,
      },
      {
        id: 89,
        name: "Find Us Globally (Map)",
        slug: "/engage/reach-us",
        top: false,
      },
      {
        id: 90,
        name: "Newsletter Signup",
        slug: "/engage/newsletter",
        top: false,
      },
    ],
  },
];

const findSectionByPath = (
  data: NavigationItem[],
  path: string,
): NavigationItem | null => {
  for (const section of data) {
    // Check if any child matches the current path (exact match or starts with)
    if (section.children) {
      for (const child of section.children) {
        // Exact match
        if (child.slug === path) {
          return section;
        }
        // Path starts with child slug (for nested routes like /engineering/grid-intel)
        if (path.startsWith(`${child.slug}/`) || path === child.slug) {
          return section;
        }
        // Check nested children
        if (child.children) {
          for (const nestedChild of child.children) {
            if (
              nestedChild.slug === path ||
              path.startsWith(`${nestedChild.slug}/`)
            ) {
              return section;
            }
          }
        }
      }
    }
  }
  return null;
};

export const useNavigation = (isOpen: boolean, currentPath?: string) => {
  const [navigationData, setNavigationData] = useState<NavigationItem[]>([]);
  const [activeSection, setActiveSection] = useState<NavigationItem | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNavigationData = async () => {
      if (!isOpen) return;

      // Render immediately; replace this only when the CMS responds with data.
      const fallbackSection = currentPath
        ? findSectionByPath(fallbackNavigation, currentPath)
        : null;
      setNavigationData(fallbackNavigation);
      setActiveSection(fallbackSection || fallbackNavigation[0]);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/navigation", {
          signal: controller.signal,
        });

        if (!response.ok) {
          // The local Figma navigation is already rendered above. The CMS is
          // optional, so a temporary upstream failure must not be surfaced to
          // users or the console as an application error.
          return;
        }

        const data: NavigationData = await response.json();

        if (data.success && data.data?.length) {
          setNavigationData(data.data);

          // Try to find section based on current path
          if (currentPath) {
            const matchedSection = findSectionByPath(data.data, currentPath);
            setActiveSection(matchedSection || data.data[0]);
          } else {
            setActiveSection(data.data[0]); // Set first item as default active
          }
        } else {
          return;
        }
      } catch {
        // Network errors and aborts leave the already-rendered local fallback
        // in place. This is deliberate for a navigation overlay.
        setError(null);
      } finally {
        clearTimeout(timeout);
        setLoading(false);
      }
    };

    fetchNavigationData();
  }, [isOpen, currentPath]);

  // Find the featured child item (one with image and text)
  const getFeaturedChild = (section: NavigationItem) => {
    if (!section.children) return null;

    // First, look for direct children with image and text
    const directFeatured = section.children.find(
      (child) => child.image && child.text,
    );
    if (directFeatured) return directFeatured;

    // If not found, look in nested children
    for (const child of section.children) {
      if (child.children) {
        const nestedFeatured = child.children.find(
          (nested) => nested.image && nested.text,
        );
        if (nestedFeatured) return nestedFeatured;
      }
    }

    return null;
  };

  const featuredChild = activeSection ? getFeaturedChild(activeSection) : null;

  return {
    navigationData,
    activeSection,
    setActiveSection,
    loading,
    error,
    featuredChild,
  };
};

export type { NavigationItem, NavigationImage, NavigationText };
