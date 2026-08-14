import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../app/hooks/useQuery";
import {
  api,
  type EnergyServiceData,
  type EnergyServicesResponse,
} from "../app/lib/api";

const fallbackEnergyData: EnergyServiceData = {
  id: 0,
  headline: "EPCM",
  subheadline: "INTEGRATED RENEWABLE ENERGY TRANSFORMATION",
  service1: {
    title: "Engineering",
    shortDescription:
      "Engineering services from yield assessments to detailed design and technical supervision.",
    description:
      "GREEN provides engineering services from yield assessments to detailed design and technical supervision. Our experts design renewable-energy projects to deliver the forecasted yield and the highest possible return on investment.",
    keys: [
      { text: "Conceptual Design" },
      { text: "Detailed Design" },
      { text: "Technical Studies" },
    ],
  },
  service2: {
    title: "Procurement",
    shortDescription:
      "A global supply chain and experienced team keep critical deliveries on time and on budget.",
    description:
      "Using a robust global supply chain and an experienced procurement team, GREEN coordinates long-lead items and project deliveries on time and within budget.",
    keys: [
      { text: "Supply Chain Management" },
      { text: "Vendor Selection" },
      { text: "Logistics & Transport" },
    ],
  },
  service3: {
    title: "Construction",
    shortDescription:
      "Adaptable, safety-led construction delivery for renewable-energy projects.",
    description:
      "GREEN delivers civil, electrical, and mechanical works with accuracy, diligence, and care. Our teams adapt quickly to site and supply-chain challenges while protecting people, communities, and project outcomes.",
    keys: [
      { text: "Civil Works" },
      { text: "Electrical Works" },
      { text: "Installation" },
      { text: "Commissioning" },
    ],
  },
  service4: {
    title: "Operations & Maintenance",
    shortDescription:
      "Long-term support that keeps renewable-energy assets safe, efficient, and reliable.",
    description:
      "GREEN supports project performance after commissioning through tailored operations and maintenance services. Proactive monitoring, practical maintenance, and transparent reporting protect uptime and maximise asset value.",
    keys: [
      { text: "Project Oversight" },
      { text: "Quality Assurance" },
      { text: "Risk Mitigation" },
      { text: "Performance" },
    ],
  },
  cta: {
    href: "#enquiry",
    text: "Enquiry",
  },
  createdAt: "",
  updatedAt: "",
};

export const useEnergyServices = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.energyServices(),
    queryFn: api.getEnergyServices,
  });

  const remoteEnergyData = data?.success ? data.data[0] : undefined;
  const energyData = remoteEnergyData ?? fallbackEnergyData;

  return {
    energyData,
    isLoading,
    error,
    hasData: Boolean(remoteEnergyData),
  };
};

export type { EnergyServiceData, EnergyServicesResponse };
