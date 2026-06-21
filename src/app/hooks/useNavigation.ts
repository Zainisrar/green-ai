import { useState, useEffect } from "react";

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

export const useNavigation = (isOpen: boolean, currentPath?: string) => {
  const [navigationData, setNavigationData] = useState<NavigationItem[]>([]);
  const [activeSection, setActiveSection] = useState<NavigationItem | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to find section by path
  const findSectionByPath = (data: NavigationItem[], path: string): NavigationItem | null => {
    for (const section of data) {
      // Check if any child matches the current path (exact match or starts with)
      if (section.children) {
        for (const child of section.children) {
          // Exact match
          if (child.slug === path) {
            return section;
          }
          // Path starts with child slug (for nested routes like /engineering/grid-intel)
          if (path.startsWith(child.slug + '/') || path === child.slug) {
            return section;
          }
          // Check nested children
          if (child.children) {
            for (const nestedChild of child.children) {
              if (nestedChild.slug === path || path.startsWith(nestedChild.slug + '/')) {
                return section;
              }
            }
          }
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchNavigationData = async () => {
      if (!isOpen) return;

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/navigation", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: NavigationData = await response.json();

        if (data.success && data.data) {
          setNavigationData(data.data);
          
          // Try to find section based on current path
          if (currentPath) {
            const matchedSection = findSectionByPath(data.data, currentPath);
            setActiveSection(matchedSection || data.data[0]);
          } else {
            setActiveSection(data.data[0]); // Set first item as default active
          }
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.error("Navigation fetch timed out");
          setError("Navigation request timed out");
        } else {
          console.error("Failed to fetch navigation data:", error);
          setError(
            error instanceof Error
              ? error.message
              : "Failed to fetch navigation data"
          );
        }
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
      (child) => child.image && child.text
    );
    if (directFeatured) return directFeatured;

    // If not found, look in nested children
    for (const child of section.children) {
      if (child.children) {
        const nestedFeatured = child.children.find(
          (nested) => nested.image && nested.text
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
