// API utility functions for TanStack Query

// Default time (ms) before an in-flight request is aborted so a slow/unreachable
// backend fails fast and components can fall back instead of hanging forever.
const DEFAULT_TIMEOUT_MS = 10000;

export class ApiError extends Error {
  status: number;

  constructor(status: number, statusText: string) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "ApiError";
    this.status = status;
  }
}

// Generic fetch wrapper with error handling
export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url =
    endpoint.startsWith("http") || typeof window !== "undefined"
      ? endpoint
      : new URL(
          endpoint,
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5005",
        ).toString();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  const abortFromCaller = () => controller.abort(options?.signal?.reason);
  if (options?.signal?.aborted) {
    abortFromCaller();
  } else {
    options?.signal?.addEventListener("abort", abortFromCaller, { once: true });
  }

  const headers = new Headers(options?.headers);
  headers.set("Accept", "application/json");
  if (options?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers,
    });

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText);
    }

    return response.json();
  } finally {
    clearTimeout(timeout);
    options?.signal?.removeEventListener("abort", abortFromCaller);
  }
}

export const api = {
  getInsights: () => fetchApi<InsightsResponse>("/api/insights"),
  getEnergyServices: () =>
    fetchApi<EnergyServicesResponse>("https://g-stack.green.com.pg/api/energy"),
  getAboutUs: () =>
    fetchApi<AboutUsResponse>(
      "https://g-stack.green.com.pg/api/explore/about-us",
    ),
  getWhyGreen: () =>
    fetchApi<WhyGreenResponse>(
      "https://g-stack.green.com.pg/api/explore/why-green",
    ),
  getGlobalSnapshot: () =>
    fetchApi<GlobalSnapshotResponse>(
      "https://g-stack.green.com.pg/api/explore/global-snapshot",
    ),
  getFastFactStats: () =>
    fetchApi<FastFactStatsResponse>(
      "https://g-stack.green.com.pg/api/explore/fast-fact-stats",
    ),
  getOurStory: () =>
    fetchApi<OurStoryResponse>(
      "https://g-stack.green.com.pg/api/evolution/our-story-milestone",
    ),
  getVisionMission: () =>
    fetchApi<VisionMissionResponse>(
      "https://g-stack.green.com.pg/api/evolution/vision-mission",
    ),
  getLeadershipTeam: () =>
    fetchApi<LeadershipTeamResponse>(
      "https://g-stack.green.com.pg/api/evolution/leadership-team",
    ),
  getCertificationsAccreditations: () =>
    fetchApi<CertificationsAccreditationsResponse>(
      "https://g-stack.green.com.pg/api/evolution/certifications-accreditations",
    ),
  getSustainabilityESG: () =>
    fetchApi<SustainabilityESGResponse>(
      "https://g-stack.green.com.pg/api/evolution/sustainability-esg-commitments",
    ),
  getSolarEPCMServices: () =>
    fetchApi<SolarEPCMServicesResponse>(
      "https://g-stack.green.com.pg/api/engineering/solar-epcm-services",
    ),
  getHybridMicrogridSolutions: () =>
    fetchApi<HybridMicrogridSolutionsResponse>(
      "https://g-stack.green.com.pg/api/engineering/hybrid-microgrid-solutions",
    ),
  getEnergyStorageSmartGrid: () =>
    fetchApi<EnergyStorageSmartGridResponse>(
      "https://g-stack.green.com.pg/api/engineering/energy-storage-smart-grid",
    ),
  getOMMonitoring: () =>
    fetchApi<OMMonitoringResponse>(
      "https://g-stack.green.com.pg/api/engineering/om-monitoring",
    ),
  getGridIntel: () =>
    fetchApi<GridIntelResponse>(
      "https://g-stack.green.com.pg/api/engineering/grid-intel",
    ),
  getBecomeSupplier: () =>
    fetchApi<BecomeSupplierResponse>(
      "https://g-stack.green.com.pg/api/ecosystem/become-a-supplier",
    ),
  getClientPartnerships: () =>
    fetchApi<ClientPartnershipsResponse>(
      "https://g-stack.green.com.pg/api/ecosystem/client-partnerships",
    ),
  getCollaborationInnovation: () =>
    fetchApi<CollaborationInnovationResponse>(
      "https://g-stack.green.com.pg/api/ecosystem/collaboration-innovation",
    ),
  getCommunityImpactLoop: () =>
    fetchApi<CommunityImpactLoopResponse>(
      "https://g-stack.green.com.pg/api/ecosystem/community-impact-loop",
    ),
};

// Type definitions
export interface InsightKey {
  icon: string;
  text: string;
}

export interface InsightCTA {
  link: string;
  text: string;
}

export interface Insight {
  id: number;
  headline: string;
  subheadline: string;
  highlighted: string;
  description: string;
  bgImg: string;
  keys: InsightKey[];
  cta1: InsightCTA;
  cta2: InsightCTA;
  createdAt: string;
  updatedAt: string;
}

export interface InsightsResponse {
  success: boolean;
  data: Insight[];
}

// Energy Services Types
export interface ServiceKey {
  text: string;
}

export interface Service {
  keys: ServiceKey[];
  title: string;
  description: string;
  shortDescription: string;
}

export interface ServiceCTA {
  href: string;
  text: string;
}

export interface EnergyServiceData {
  id: number;
  service1: Service;
  service2: Service;
  service3: Service;
  service4: Service;
  headline: string;
  subheadline: string;
  cta: ServiceCTA;
  createdAt: string;
  updatedAt: string;
}

export interface EnergyServicesResponse {
  success: boolean;
  data: EnergyServiceData[];
}

// About Us Types
export interface AboutUsData {
  id: number;
  title: string;
  key: string;
  content: string;
  quote: string;
  bgImg: string;
  createdAt: string;
  updatedAt: string;
}

export interface AboutUsResponse {
  success: boolean;
  data: AboutUsData[];
}

// Why Green Types
export interface WhyGreenKey {
  text: string;
}

export interface WhyGreenIcon {
  img: {
    alt: string;
    src: string;
  };
  text: string;
  description: string;
}

export interface WhyGreenData {
  id: number;
  key: WhyGreenKey;
  content: string;
  icons: WhyGreenIcon[];
  createdAt: string;
  updatedAt: string;
}

export interface WhyGreenResponse {
  success: boolean;
  data: WhyGreenData[];
}

// Global Snapshot Types
export interface GlobalSnapshotIcon {
  alt: string;
  src: string;
  type: string;
  position?: string;
}

export interface GlobalSnapshotTitle {
  main: string;
  highlight: string;
  text?: string;
}

export interface GlobalSnapshotHeroSection {
  id: string;
  type: string;
  title: GlobalSnapshotTitle;
  headline: string;
  subtitle: string;
  description: string[];
}

export interface GlobalSnapshotStatItem {
  icon: GlobalSnapshotIcon;
  label: string;
  value: string;
}

export interface GlobalSnapshotStatsSection {
  id: string;
  type: string;
  items: GlobalSnapshotStatItem[];
}

export interface GlobalSnapshotHighlightContent {
  lines: string[];
  style: string;
}

export interface GlobalSnapshotHighlightSection {
  id: string;
  type: string;
  content: GlobalSnapshotHighlightContent;
}

export interface GlobalSnapshotFeature {
  icon: GlobalSnapshotIcon;
  text: string;
}

export interface GlobalSnapshotContentBlock {
  id: string;
  type: string;
  title: GlobalSnapshotTitle;
  features: GlobalSnapshotFeature[];
}

export interface GlobalSnapshotLocationsSection {
  id: string;
  type: string;
  title: string;
  highlight: string;
  locations: string[];
  description: string;
}

export interface GlobalSnapshotButton {
  icon?: GlobalSnapshotIcon;
  link?: string;
  text: string;
  type?: string;
  style?: string;
}

export interface GlobalSnapshotActionButtons {
  id: string;
  type: string;
  buttons: GlobalSnapshotButton[];
}

export type GlobalSnapshotSection =
  | GlobalSnapshotHeroSection
  | GlobalSnapshotStatsSection
  | GlobalSnapshotHighlightSection
  | GlobalSnapshotContentBlock
  | GlobalSnapshotLocationsSection
  | GlobalSnapshotActionButtons;

export interface GlobalSnapshotData {
  id: number;
  sections: GlobalSnapshotSection[];
  createdAt: string;
  updatedAt: string;
}

export interface GlobalSnapshotResponse {
  success: boolean;
  data: GlobalSnapshotData[];
}

// Fast Fact Stats Types
export interface FastFactStatsIcon {
  alt: string;
  src: string;
}

export interface FastFactStatsBlockData {
  Schools?: number;
  MW_deployed?: string;
  Health_posts?: number;
  Homes_electrified?: string;
  Modular_systems_installed?: string;
  SMEs_powered?: number;
  SME_jobs_created?: number;
  Lives_touched?: number;
  CO2_cut_tonnes?: number;
  Diesel_avoided_litres?: number;
}

export interface FastFactStatsBlockContent {
  data: FastFactStatsBlockData;
  note: string;
}

export interface FastFactStatsBlock {
  icon: FastFactStatsIcon;
  title: string;
  content: FastFactStatsBlockContent;
}

export interface FastFactStatsSection {
  id: string;
  title: string;
  blocks: FastFactStatsBlock[];
  subtitle: string;
  description: string;
}

export interface FastFactStatsCTA {
  link: string;
  text: string;
}

export interface FastFactStatsCard {
  title: string;
  details: string;
  subtitle: string;
}

export interface FastFactStatsQuote {
  headline: string;
  description: string;
}

export interface FastFactStatsImpactSection {
  id: string;
  cta: FastFactStatsCTA[];
  cards: FastFactStatsCard[];
  quote: FastFactStatsQuote;
}

export interface FastFactStatsData {
  id: number;
  sections: (FastFactStatsSection | FastFactStatsImpactSection)[];
  createdAt: string;
  updatedAt: string;
}

export interface FastFactStatsResponse {
  success?: boolean;
  id: number;
  sections: (FastFactStatsSection | FastFactStatsImpactSection)[];
  createdAt: string;
  updatedAt: string;
}

// Our Story Types
export interface OurStoryMaps {
  activeImg: string;
  secondaryImg: string;
}

export interface OurMilestone {
  maps: OurStoryMaps;
  title: string;
}

export interface OurStoryData {
  id: number;
  key: string;
  title: string;
  description: string;
  ourMilestone: OurMilestone;
  createdAt: string;
  updatedAt: string;
}

export interface OurStoryResponse extends OurStoryData {}

// Vision Mission Types
export interface VisionMissionIcon {
  alt: string;
  src: string;
}

export interface VisionMissionContent {
  quote: string;
  description: string;
}

export interface VisionMissionBlock {
  icon: VisionMissionIcon;
  title: string;
  content: VisionMissionContent;
}

export interface VisionMissionFooter {
  text: string;
}

export interface VisionMissionSection {
  id: string;
  title: string;
  blocks: VisionMissionBlock[];
  footer: VisionMissionFooter;
}

export interface VisionMissionData {
  id: number;
  sections: VisionMissionSection[];
  createdAt: string;
  updatedAt: string;
}

export interface VisionMissionResponse extends VisionMissionData {}

// Leadership Team Types
export interface LeadershipTeamMemberImg {
  alt: string;
  src: string;
}

export interface LeadershipTeamMember {
  img: LeadershipTeamMemberImg;
  name: string;
  designation: string;
}

export interface LeadershipTeamSection {
  id: string;
  title: string;
  members: LeadershipTeamMember[];
}

export interface LeadershipTeamData {
  id: number;
  sections: LeadershipTeamSection[];
  createdAt: string;
  updatedAt: string;
}

export interface LeadershipTeamResponse extends LeadershipTeamData {}

// Certifications & Accreditations Types
export interface CertificationsEsgSection {
  points: string[];
  heading: string;
  description: string;
}

export interface CertificationsISOCertificate {
  name: string;
  year: string;
  title: string;
  description: string;
}

export interface CertificationsISOCertificateImage {
  alt: string;
  src: string;
}

export interface CertificationsISOSection {
  heading: string;
  description: string;
  certificate1: CertificationsISOCertificateImage;
  certificate2: CertificationsISOCertificateImage;
  certificate3: CertificationsISOCertificateImage;
  certificate4: CertificationsISOCertificateImage;
  certificates: CertificationsISOCertificate[];
}

export interface CertificationsCleanEnergyLogo {
  alt: string;
  src: string;
}

export interface CertificationsCleanEnergySection {
  logo: CertificationsCleanEnergyLogo;
  heading: string;
  description: string;
}

export interface CertificationsAccreditationsData {
  id: number;
  title: string;
  tagline: string;
  esgSection: CertificationsEsgSection;
  isoSection: CertificationsISOSection;
  cleanEnergySection: CertificationsCleanEnergySection;
  certificate1: string;
  certificate2: string;
  certificate3: string;
  cta: {
    link: string;
    text: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CertificationsAccreditationsResponse
  extends CertificationsAccreditationsData {}

// Sustainability ESG Types
export interface SustainabilityESGHeader {
  title: string;
  subtitle: string;
}

export interface SustainabilityESGIcon {
  alt: string;
  src: string;
}

export interface SustainabilityESGSection {
  id: string;
  icon: SustainabilityESGIcon;
  points: string[];
  heading: string;
}

export interface SustainabilityESGQuote {
  text: string;
  attribution: string | null;
}

export interface SustainabilityESGCallToAction {
  href: string;
  text: string;
}

export interface SustainabilityESGData {
  id: number;
  header: SustainabilityESGHeader;
  sections: SustainabilityESGSection[];
  quote: SustainabilityESGQuote;
  tagline: string;
  callToActions: SustainabilityESGCallToAction[];
  createdAt: string;
  updatedAt: string;
}

export interface SustainabilityESGResponse extends SustainabilityESGData {}

// Solar EPCM Services Types
export interface SolarEPCMHeader {
  title: string;
  subtitle: string;
}

export interface SolarEPCMIntroduction {
  text: string;
}

export interface SolarEPCMService {
  id: string;
  points: string[];
  heading: string;
}

export interface SolarEPCMQuote {
  text: string;
  attribution: string;
}

export interface SolarEPCMTagline {
  text: string;
}

export interface SolarEPCMCallToAction {
  href: string;
  text: string;
}

export interface SolarEPCMServicesData {
  id: number;
  header: SolarEPCMHeader;
  introduction: SolarEPCMIntroduction;
  services: SolarEPCMService[];
  quote: SolarEPCMQuote;
  tagline: SolarEPCMTagline;
  callToActions: SolarEPCMCallToAction[];
  createdAt: string;
  updatedAt: string;
}

export interface SolarEPCMServicesResponse extends SolarEPCMServicesData {}

// Hybrid Microgrid Solutions Types
export interface HybridMicrogridHeader {
  title: string;
  subtitle: string;
  description: string;
}

export interface HybridMicrogridSolution {
  id: string;
  points: string[];
  heading: string;
}

export interface HybridMicrogridUseCases {
  items: string[];
  heading: string;
}

export interface HybridMicrogridStatement {
  text: string;
}

export interface HybridMicrogridQuote {
  text: string;
  attribution: string;
}

export interface HybridMicrogridCallToAction {
  href: string;
  text: string;
}

export interface HybridMicrogridSolutionsData {
  id: number;
  header: HybridMicrogridHeader;
  solutions: HybridMicrogridSolution[];
  useCases: HybridMicrogridUseCases;
  statement: HybridMicrogridStatement;
  quote: HybridMicrogridQuote;
  callToActions: HybridMicrogridCallToAction[];
  createdAt: string;
  updatedAt: string;
}

export interface HybridMicrogridSolutionsResponse
  extends HybridMicrogridSolutionsData {}

// Energy Storage Smart Grid Types
export interface EnergyStorageSmartGridHeader {
  title: string;
  subtitle: string;
  description: string;
}

export interface EnergyStorageArchitectureItem {
  title: string;
  description: string;
}

export interface EnergyStorageArchitecture {
  items: EnergyStorageArchitectureItem[];
  heading: string;
}

export interface EnergyStorageQuote {
  text: string;
}

export interface EnergyStorageStatement {
  heading: string;
  description: string;
}

export interface EnergyStorageCallToAction {
  href: string;
  text: string;
}

export interface EnergyStorageSmartGridData {
  id: number;
  header: EnergyStorageSmartGridHeader;
  architecture: EnergyStorageArchitecture;
  quote: EnergyStorageQuote;
  statement: EnergyStorageStatement;
  callToActions: EnergyStorageCallToAction[];
  createdAt: string;
  updatedAt: string;
}

export interface EnergyStorageSmartGridResponse
  extends EnergyStorageSmartGridData {}

// O&M Monitoring Types
export interface OMMonitoringHeader {
  title: string;
  subtitle: string;
  description: string;
}

export interface OMMonitoringPhilosophyItem {
  title: string;
  description: string;
}

export interface OMMonitoringPhilosophy {
  items: OMMonitoringPhilosophyItem[];
  heading: string;
}

export interface OMMonitoringWhyMatters {
  points: string[];
  heading: string;
}

export interface OMMonitoringServiceItem {
  title: string;
  description: string;
}

export interface OMMonitoringServices {
  items: OMMonitoringServiceItem[];
}

export interface OMMonitoringCallToAction {
  href: string;
  text: string;
}

export interface OMMonitoringData {
  id: number;
  header: OMMonitoringHeader;
  philosophy: OMMonitoringPhilosophy;
  whyMatters: OMMonitoringWhyMatters;
  services: OMMonitoringServices;
  callToActions: OMMonitoringCallToAction[];
  createdAt: string;
  updatedAt: string;
}

export interface OMMonitoringResponse extends OMMonitoringData {}

// Grid Intel Types
export interface GridIntelFeature {
  icon: string;
  text: string;
}

export interface GridIntelHeroImage {
  alt: string;
  src: string;
}

export interface GridIntelCTAButton {
  href: string;
  icon: string;
  text: string;
}

export interface GridIntelEnergyYouCanCountOn {
  title: string;
  subtitle: string;
  description: string;
}

export interface GridIntelBuiltForIntelligence {
  title: string;
  subtitle: string;
  runSmarter: string;
  operateWithConfidence: string;
  scaleWithoutUncertainty: string;
}

export interface GridIntelEnergyIntelligencePlatform {
  title: string;
}

export interface GridIntelMainPage {
  title: string;
  tagline: string;
  features: GridIntelFeature[];
  subtitle: string;
  heroImage: GridIntelHeroImage;
  ctaButtons: GridIntelCTAButton[];
  description: string;
  energyYouCanCountOn: GridIntelEnergyYouCanCountOn;
  builtForIntelligence: GridIntelBuiltForIntelligence;
  energyIntelligencePlatform: GridIntelEnergyIntelligencePlatform;
}

// Product Integration Types
export interface GridIntelProductIntegrationItem {
  icon: string;
  title: string;
  description: string;
}

export interface GridIntelProductIntegration {
  image: GridIntelHeroImage;
  items: GridIntelProductIntegrationItem[];
  title: string;
  tagline: string;
  subtitle: string;
  description: string;
}

// Technology Stack Types
export interface GridIntelTechnologyStack {
  image: GridIntelHeroImage;
  title: string;
  features: GridIntelFeature[];
  subtitle: string;
  description: string;
}

// Scenarios Types
export interface GridIntelScenario {
  icon: string;
  text: string;
}

export interface GridIntelScenarios {
  image: GridIntelHeroImage;
  title: string;
  tagline: string;
  subtitle: string;
  scenarios: GridIntelScenario[];
  description: string;
}

// Why Different Types
export interface GridIntelComparisonTableRow {
  feature: string;
  gridIntel: string;
  conventional: string;
}

export interface GridIntelWhyDifferent {
  title: string;
  subtitle: string;
  description: string;
  comparisonTable: GridIntelComparisonTableRow[];
}

// What Solves Types
export interface GridIntelSolution {
  icon: string;
  title: string;
  description: string;
}

export interface GridIntelWhatSolves {
  title: string;
  tagline: string;
  subtitle: string;
  solutions: GridIntelSolution[];
  description: string;
}

// Challenge Types
export interface GridIntelChallenge {
  icon: string;
  text: string;
}

export interface GridIntelChallengeSection {
  image: GridIntelHeroImage;
  title: string;
  subtitle: string;
  challenges: GridIntelChallenge[];
  resultText: string;
  description: string;
}

export interface GridIntelData {
  id: number;
  mainPage: GridIntelMainPage;
  productIntegration: GridIntelProductIntegration;
  technologyStack: GridIntelTechnologyStack;
  scenarios: GridIntelScenarios;
  whyDifferent: GridIntelWhyDifferent;
  whatSolves: GridIntelWhatSolves;
  challenge: GridIntelChallengeSection;
  createdAt: string;
  updatedAt: string;
}

export interface GridIntelResponse extends GridIntelData {}

// Become a Supplier Types
export interface BecomeSupplierCTA {
  href: string;
  text: string;
}

export interface BecomeSupplierQuote {
  text: string;
  highlighted: string;
}

export interface BecomeSupplierDescription {
  text: string;
  highlighted: string;
}

export interface BecomeSupplierMainPage {
  cta: BecomeSupplierCTA[];
  quote: BecomeSupplierQuote[];
  title: string;
  description: BecomeSupplierDescription;
  subHeadline: string;
}

export interface BecomeSupplierSectionWithKeys {
  keys: string[];
  title: string;
}

export interface BecomeSupplierWhyGreen extends BecomeSupplierSectionWithKeys {
  img: {
    alt: string;
    src: string;
  };
}

export interface BecomeSupplierResponse {
  id: number;
  mainPage: BecomeSupplierMainPage;
  whatYouNeed: BecomeSupplierSectionWithKeys;
  whyGreen: BecomeSupplierWhyGreen;
  createdAt: string;
  updatedAt: string;
}

// Client Partnerships Types
export interface ClientPartnershipsCTA {
  href: string;
  text: string;
}

export interface ClientPartnershipsQuote1 {
  text: string;
  text1: string;
  text2: string;
  highlighted: string;
}

export interface ClientPartnershipsMainPage {
  cta: ClientPartnershipsCTA[];
  title: string;
  quote1: ClientPartnershipsQuote1;
  quote2: string;
  description: string;
  subHeadline: string;
}

export interface ClientPartnershipsWhoWePartnerItem {
  clientType: string;
  valueDelivered: string;
}

export interface ClientPartnershipsWhoWePartnerWith {
  items: ClientPartnershipsWhoWePartnerItem[];
  title: string;
  subHeadline: string;
}

export interface ClientPartnershipsPartnershipItem {
  title: string;
  description: string;
}

export interface ClientPartnershipsPartnershipQuote {
  text: string;
  highlighted: string;
}

export interface ClientPartnershipsOurClientPartnership {
  img: {
    alt: string;
    src: string;
  };
  items: ClientPartnershipsPartnershipItem[];
  quote: ClientPartnershipsPartnershipQuote;
  title: string;
  description: string;
  subHeadline: string;
}

export interface ClientPartnershipsWhatSetsItem {
  greenDelivers: string;
  othersPromise: string;
}

export interface ClientPartnershipsWhatSetsGreenApart {
  items: ClientPartnershipsWhatSetsItem[];
  title: string;
  subHeadline: string;
}

export interface ClientPartnershipsUseCaseItem {
  img: {
    alt: string;
    src: string;
  };
  title: string;
  reference: string;
}

export interface ClientPartnershipsUseCases {
  items: ClientPartnershipsUseCaseItem[];
  title: string;
}

export interface ClientPartnershipsTrustedByIcon {
  alt: string;
  src: string;
}

export interface ClientPartnershipsTrustedBy {
  icons: ClientPartnershipsTrustedByIcon[];
  title: string;
  subHeadline: string;
}

export interface ClientPartnershipsResponse {
  id: number;
  mainPage: ClientPartnershipsMainPage;
  whoWePartnerWith: ClientPartnershipsWhoWePartnerWith;
  ourClientPartnership: ClientPartnershipsOurClientPartnership;
  whatSetsGreenApart: ClientPartnershipsWhatSetsGreenApart;
  useCases: ClientPartnershipsUseCases;
  trustedBy: ClientPartnershipsTrustedBy;
  createdAt: string;
  updatedAt: string;
}

// Collaboration & Innovation Types
export interface CollaborationInnovationCTA {
  href: string;
  text: string;
}
export interface CollaborationInnovationQuote {
  text: string;
  highlighted: string;
}
export interface CollaborationInnovationDescription {
  text: string;
  highlighted: string;
}

export interface CollaborationInnovationMainPage {
  cta: CollaborationInnovationCTA[];
  quote: CollaborationInnovationQuote[];
  title: string;
  description: CollaborationInnovationDescription;
  subHeadline: string;
}

export interface CollaborationInnovationOurPhilosophy {
  img: { alt: string; src: string };
  keys: string[];
  title: string;
  description: CollaborationInnovationDescription;
  subHeadline: string;
}

export interface CollaborationInnovationWhoWeCollaborateItem {
  partnerType: string;
  engagementScope: string;
}

// Note: API returns "whoWeCelebrateWith" (typo). We preserve the name to match API.
export interface CollaborationInnovationWhoWeCelebrateWith {
  items: CollaborationInnovationWhoWeCollaborateItem[];
  title: string;
}

export interface CollaborationInnovationSpotlightKey {
  title: string;
  description: string;
}

export interface CollaborationInnovationSpotlight {
  keys: CollaborationInnovationSpotlightKey[];
  title: string;
}

export interface CollaborationInnovationResponse {
  id: number;
  mainPage: CollaborationInnovationMainPage;
  ourPhilosophy: CollaborationInnovationOurPhilosophy;
  whoWeCelebrateWith: CollaborationInnovationWhoWeCelebrateWith;
  innovationSpotlight: CollaborationInnovationSpotlight;
  createdAt: string;
  updatedAt: string;
}

// Community Impact Loop Types
export interface CommunityImpactLoopCTA {
  href: string;
  text: string;
}
export interface CommunityImpactLoopQuote {
  text: string;
  highlighted: string;
}

export interface CommunityImpactLoopMainPage {
  cta: CommunityImpactLoopCTA[];
  quote: CommunityImpactLoopQuote;
  title: string;
  description: string; // multiline string with \n breaks
  subHeadline: string;
}

export interface GreenCommunityImpactLoopDescription {
  text1: string;
  text2: string;
}

export interface GreenCommunityImpactLoopSection {
  keys: string[];
  title: string;
  description: GreenCommunityImpactLoopDescription;
}

export interface CommunityImpactLoopHowItem {
  title: string;
  description: string;
}
export interface CommunityImpactLoopHowLoopWorks {
  items: CommunityImpactLoopHowItem[];
  title: string;
}

export interface CommunityImpactLoopMeasuredImpactItem {
  title: string;
  description: string;
}
export interface CommunityImpactLoopMeasuredImpactQuote {
  text: string;
  highlighted: string;
}
export interface CommunityImpactLoopMeasuredImpact {
  items: CommunityImpactLoopMeasuredImpactItem[];
  quote: CommunityImpactLoopMeasuredImpactQuote;
  title: string;
}

export interface CommunityImpactLoopJoinTheLoopImage {
  alt: string;
  src: string;
}
export interface CommunityImpactLoopJoinTheLoopQuote {
  text: string;
  highlighted: string;
}
export interface CommunityImpactLoopJoinTheLoop {
  img: CommunityImpactLoopJoinTheLoopImage;
  quote: CommunityImpactLoopJoinTheLoopQuote;
  title: string;
}

export interface CommunityImpactLoopResponse {
  id: number;
  mainPage: CommunityImpactLoopMainPage;
  greenCommunityImpactLoop: GreenCommunityImpactLoopSection;
  howLoopWorks: CommunityImpactLoopHowLoopWorks;
  measuredImpact: CommunityImpactLoopMeasuredImpact;
  joinTheLoop: CommunityImpactLoopJoinTheLoop;
  createdAt: string;
  updatedAt: string;
}
