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
        slug: "/explore/fast-facts-and-stats",
        top: false,
      },
    ],
  },
  {
    id: 2,
    name: "Evolution",
    slug: "/energy",
    top: true,
    children: [
      {
        id: 21,
        name: "Renewable Energy",
        slug: "/energy",
        top: false,
        image: { src: "/images/nav/2.png", alt: "Renewable energy solutions" },
        text: {
          description: "Powering a cleaner, independent future",
          highlighted: "cleaner",
        },
      },
    ],
  },
  {
    id: 3,
    name: "Engineering",
    slug: "/engineering/products/lighting-up-and-lifting-up-living-standards",
    top: true,
    children: [
      {
        id: 31,
        name: "Products",
        slug: "/engineering/products/lighting-up-and-lifting-up-living-standards",
        top: false,
        image: { src: "/images/nav/3.png", alt: "GREEN products" },
        text: {
          description: "Explore our comprehensive solutions and services",
          highlighted: "solutions",
        },
      },
    ],
  },
  {
    id: 4,
    name: "Endeavors",
    slug: "/expertise",
    top: true,
    children: [
      {
        id: 41,
        name: "Expertise",
        slug: "/expertise",
        top: false,
        image: { src: "/images/nav/4.png", alt: "GREEN solar expertise" },
        text: {
          description: "Powering a greener future through practical expertise",
          highlighted: "greener future",
        },
      },
      {
        id: 42,
        name: "Powering Healthcare",
        slug: "/expertise/powering-healthcare",
        top: false,
      },
      {
        id: 43,
        name: "Powering Communities",
        slug: "/expertise/powering-communities",
        top: false,
      },
      {
        id: 44,
        name: "Powering Agriculture",
        slug: "/expertise/powering-agriculture",
        top: false,
      },
    ],
  },
  {
    id: 5,
    name: "Enlighten",
    slug: "/insights",
    top: true,
    children: [{ id: 51, name: "Insights", slug: "/insights", top: false }],
  },
  {
    id: 6,
    name: "Ecosystem",
    slug: "/ecosystem",
    top: true,
    children: [
      { id: 61, name: "Our Ecosystem", slug: "/ecosystem", top: false },
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
        name: "Join Us",
        slug: "/empower/join-us",
        top: false,
        image: { src: "/images/nav/8.png", alt: "GREEN community network" },
        text: {
          description: "Join the people creating a more sustainable future",
          highlighted: "sustainable future",
        },
      },
      {
        id: 72,
        name: "Team GREEN",
        slug: "/empower/team-green",
        top: false,
      },
      {
        id: 73,
        name: "Women in Energy",
        slug: "/empower/women-in-energy",
        top: false,
      },
      {
        id: 74,
        name: "Careers at GREEN",
        slug: "/empower/careers-at-green",
        top: false,
      },
    ],
  },
  {
    id: 8,
    name: "Engage",
    slug: "/engage/reach-us",
    top: true,
    children: [
      {
        id: 81,
        name: "Reach Us",
        slug: "/engage/reach-us",
        top: false,
        image: { src: "/images/nav/9.png", alt: "Contact GREEN" },
        text: {
          description: "Let’s start a conversation about your energy goals",
          highlighted: "conversation",
        },
      },
      {
        id: 82,
        name: "Book a Consultation",
        slug: "/engage/book-a-consultation",
        top: false,
      },
      {
        id: 83,
        name: "Partner With Us",
        slug: "/engage/partner-with-us",
        top: false,
      },
      {
        id: 84,
        name: "Media Press",
        slug: "/engage/media-press",
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
