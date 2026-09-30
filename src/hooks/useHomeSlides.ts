import { useQuery } from "@tanstack/react-query";
import type { HomeData } from "./useHomeBySlug";

export interface HomeSlide {
  id: string;
  headline: string;
  description: string;
  letter: "G" | "R" | "E" | "E" | "N";
}

export interface ExpandedHomePanelContent {
  headline?: string;
  description?: string;
}

export interface HomeSlideContent {
  slides: HomeSlide[];
  expandedPanels: ExpandedHomePanelContent[];
}

interface HomeApiResponse {
  success: boolean;
  data: HomeData[];
}

const CORE_SLUG = "/home/renewable-energy-the-core";

const fetchAllHome = async (): Promise<HomeData[]> => {
  const response = await fetch("https://greencms.percepco.co.uk/api/home");
  if (!response.ok) throw new Error("Failed to fetch home data");
  const result: HomeApiResponse = await response.json();
  return result.data;
};

const bySlug = (items: HomeData[], slug: string) =>
  items.find((item) => item.slug === slug);

const descOr = (...candidates: (string | undefined)[]) =>
  candidates.find((value) => value?.trim())?.trim() ?? "";

const HEADLINE_OR = (value: string | undefined, fallback: string) =>
  value?.trim() ? value.trim() : fallback;

/** Five GREEN panels — each heading + description from text1–text5 on the core home entry. */
export const buildHomeSlides = (items: HomeData[]): HomeSlideContent => {
  const core = bySlug(items, CORE_SLUG);
  const augmentation = bySlug(
    items,
    "/home/energy-augmentation-for-industry-transformation",
  );
  const engineering = bySlug(
    items,
    "/home/energy-engineering-from-turnkey-project-deliveries",
  );
  const netZero = bySlug(items, "/home/net-zero-an-innate-commitment");

  if (!core) return { slides: [], expandedPanels: [] };

  const slides: HomeSlide[] = [
    {
      id: "g",
      letter: "G",
      headline: HEADLINE_OR(core.text1.headline, "GREEN FUTURE ENVISIONED"),
      description: descOr(
        core.text1.description,
        "Envisioning a sustainable future through innovative renewable energy solutions.",
      ),
    },
    {
      id: "r",
      letter: "R",
      headline: HEADLINE_OR(core.text2.headline, "RENEWABLE ENERGY THE CORE"),
      description: descOr(
        core.text2.description,
        "Renewables: Providing cleaner energy to our world. Renewable energy is at the core of the solutions we provide.",
      ),
    },
    {
      id: "e1",
      letter: "E",
      headline: HEADLINE_OR(core.text3.headline, "PRODUCTS AND SOLUTIONS"),
      description: descOr(
        core.text3.description,
        augmentation?.text3.description,
        "From homes to industries, we provide an extensive spectrum of energy solutions designed to solve underlying challenges.",
      ),
    },
    {
      id: "e2",
      letter: "E",
      headline: HEADLINE_OR(core.text4.headline, "EPC ENERGY SERVICES"),
      description: descOr(
        core.text4.description,
        engineering?.text4.description,
        "Energy Engineering for micro-grid to utility-scale solar energy generation and distribution.",
      ),
    },
    {
      id: "n",
      letter: "N",
      headline: HEADLINE_OR(core.text5.headline, "PROJECTS AND SERVICES"),
      description: descOr(
        core.text5.description,
        netZero?.text5.description,
        "Achieving net zero carbon emissions is a crucial objective of GREEN.",
      ),
    },
  ];

  // Expanded accordion artwork does not follow the G-R-E-E-N slide order.
  // Bind every state to its CMS field explicitly so its copy remains correct
  // when records are reordered or their headings change in the CMS.
  const expandedPanels: ExpandedHomePanelContent[] = [
    {
      headline: augmentation?.text2.headline,
      description: augmentation?.text2.description,
    },
    {
      headline: core.text2.headline,
      description: core.text2.description,
    },
    {
      headline: augmentation?.text3.headline,
      description: augmentation?.text3.description,
    },
    {
      headline: engineering?.text4.headline,
      description: engineering?.text4.description,
    },
    {
      headline: netZero?.text5.headline,
      description: netZero?.text5.description,
    },
  ];

  return { slides, expandedPanels };
};

export const useHomeSlides = () => {
  return useQuery({
    queryKey: ["home", "slides"],
    queryFn: fetchAllHome,
    select: buildHomeSlides,
    staleTime: 0,
    refetchOnMount: "always",
  });
};
