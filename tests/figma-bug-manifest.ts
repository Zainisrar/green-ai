export const REFERENCE_VIEWPORTS = [1920, 1440, 1024, 768, 390] as const;

export type BugStatus = "pending" | "implemented" | "pattern-derived";

export interface FigmaBug {
  id: number;
  title: string;
  route: string;
  figmaNodes: readonly string[];
  status: BugStatus;
  supersededBy?: readonly number[];
  apiFixture?: string;
}

const bug = (
  id: number,
  title: string,
  route: string,
  figmaNodes: readonly string[] = [],
  status: BugStatus = "pending",
  apiFixture?: string,
): FigmaBug => ({ id, title, route, figmaNodes, status, apiFixture });

/** Bugs 0021–0100. Node IDs are source-frame metadata, never guessed selectors. */
export const FIGMA_BUGS: readonly FigmaBug[] = [
  bug(
    21,
    "Why GREEN",
    "/explore/why-green",
    ["7077:4467"],
    "implemented",
    "why-green",
  ),
  bug(
    22,
    "Global Snapshot",
    "/explore/global-snapshot",
    ["7077:14856"],
    "implemented",
    "global-snapshot",
  ),
  bug(
    23,
    "Fast Facts & Stats",
    "/explore/fast-facts-stats",
    ["7077:6529"],
    "implemented",
    "fast-fact-stats",
  ),
  bug(
    24,
    "Our Story & Milestones",
    "/evolution/our-story-milestones",
    ["7077:6923", "7077:6983"],
    "implemented",
    "our-story-milestone",
  ),
  bug(
    25,
    "Mission & Vision",
    "/evolution/mission-vision",
    ["7077:6846", "7077:6885"],
    "implemented",
    "vision-mission",
  ),
  bug(
    26,
    "Leadership Team",
    "/evolution/leadership-team",
    ["7077:6769"],
    "implemented",
    "leadership-team",
  ),
  bug(
    27,
    "Certifications & Accreditations",
    "/evolution/certifications-accreditations",
    ["7077:3221"],
    "implemented",
    "certifications-accreditations",
  ),
  bug(
    28,
    "Sustainability & ESG Commitments",
    "/evolution/sustainability-esg-commitments",
    ["7077:6671", "7077:6707"],
    "implemented",
    "sustainability-esg-commitments",
  ),
  bug(
    29,
    "Solar EPCM Services",
    "/engineering/solar-epcm-services",
    ["7077:6595"],
    "implemented",
    "solar-epcm-services",
  ),
  bug(
    30,
    "Hybrid & Microgrid Solutions",
    "/engineering/hybrid-microgrid-solutions",
    ["7077:5239"],
    "implemented",
    "hybrid-microgrid-solutions",
  ),
  bug(
    31,
    "Energy Storage & Smart Grid",
    "/engineering/energy-storage-smart-grid",
    ["7077:6475"],
  ),
  bug(32, "O&M & Monitoring", "/engineering/om-monitoring", ["7077:4516"]),
  bug(33, "GRID-INTEL", "/engineering/grid-intel", ["7077:4592"]),
  bug(34, "Products & Systems", "/engineering/products", ["7077:12660"]),
  bug(35, "Project Portfolio", "/endeavors/project-portfolio", ["7077:7011"]),
  bug(36, "Flagship Projects", "/endeavors/flagship-projects", ["7077:14937"]),
  bug(37, "Case Studies", "/endeavors/case-studies", [], "pattern-derived"),
  bug(
    38,
    "Community Energy Stories",
    "/endeavors/community-energy-stories",
    [],
    "pattern-derived",
  ),
  bug(39, "Insights & Articles", "/enlighten/insights-articles", ["7077:6173"]),
  bug(40, "Reports & Whitepapers", "/enlighten/reports-whitepapers", [
    "7077:5298",
    "7077:5454",
  ]),
  bug(41, "Events & Webinars", "/enlighten/events-webinars", ["7077:5661"]),
  bug(42, "Thought Leadership", "/enlighten/thought-leadership", [
    "7077:15063",
  ]),
  bug(43, "Media & Mentions", "/enlighten/media-mentions", ["7077:5840"]),
  bug(44, "Learning Hub", "/enlighten/learning-hub", [], "pattern-derived"),
  bug(45, "Our Value Chain", "/ecosystem/our-value-chain", ["7077:18325"]),
  bug(46, "Supply Partner Handbook", "/ecosystem/supplier-code-of-conduct", [
    "7077:28846",
  ]),
  bug(47, "Procurement Philosophy", "/ecosystem/our-procurement-philosophy", [
    "7077:21771",
  ]),
  bug(48, "Key Supply Categories", "/ecosystem/key-supply-categories", [
    "7077:27873",
  ]),
  bug(49, "Become a Supplier", "/ecosystem/become-a-supplier", [
    "7077:19121",
    "7077:28549",
  ]),
  bug(50, "Client Partnerships", "/ecosystem/client-partnerships", [
    "7077:15858",
  ]),
  bug(
    51,
    "Industry Affiliations",
    "/ecosystem/industry-affiliations-certifications",
    ["7077:15958"],
  ),
  bug(52, "Community Impact Loop", "/ecosystem/community-impact-loop", [
    "7077:15645",
  ]),
  bug(
    53,
    "Technology Alliances",
    "/ecosystem/technology-innovation-alliances",
    ["7077:22719"],
  ),
  bug(54, "Impact Measurement & ESG", "/ecosystem/why-esg-matters-to-green", [
    "7077:18427",
  ]),
  bug(55, "Team GREEN", "/empower/team-green", ["7077:21015"]),
  bug(56, "Careers at GREEN", "/empower/careers-at-green", ["7077:16449"]),
  bug(57, "GREEN Talent Incubator", "/empower/green-talent-incubator", [
    "7077:15370",
  ]),
  bug(58, "Women in Energy", "/empower/women-in-energy", ["7077:19753"]),
  bug(59, "Community Voices", "/empower/community-voices", ["7077:21678"]),
  bug(60, "Partner With Us", "/engage/partner-with-us", ["7077:23359"]),
  bug(61, "Become a Supplier", "/engage/become-a-supplier", ["7077:23359"]),
  bug(62, "Investor Relations", "/engage/investor-relations", ["7077:19989"]),
  bug(
    63,
    "Public Events & Volunteering",
    "/engage/public-events-volunteering",
    ["7077:24270"],
  ),
  bug(64, "Contact Us", "/engage/contact-us"),
  bug(65, "Book a Consultation", "/engage/book-a-consultation", ["7077:19924"]),
  bug(66, "Request a Proposal", "/engage/request-a-proposal", ["7077:19854"]),
  bug(67, "Media & Press", "/engage/media-press", ["7077:23952"]),
  bug(68, "Newsletter Signup", "/engage/newsletter", ["7077:14996"]),
  bug(69, "Find Us Globally", "/engage/reach-us"),
  bug(70, "V2 shared-canvas regression", "/"),
  bug(71, "V2 slanted form shells", "/engage/contact-us"),
  bug(72, "V2 homepage", "/home/renewable-energy-the-core", ["7077:4218"]),
  bug(73, "V2 About GREEN", "/explore/welcome-to-green", ["7077:4439"]),
  bug(74, "V2 Energy navigation", "/energy"),
  bug(75, "V2 Energy services", "/engineering/solar-epcm-services"),
  bug(76, "V2 Elements navigation", "/engineering/products", ["7077:12660"]),
  bug(
    77,
    "V2 product details",
    "/engineering/products/lighting-up-and-lifting-up-living-standards",
    ["7077:12660"],
  ),
  bug(78, "V2 Expertise", "/expertise"),
  bug(79, "V2 Welcome to GREEN", "/explore/welcome-to-green", ["7077:4439"]),
  bug(80, "V2 Story", "/evolution/our-story-milestones", [
    "7077:6923",
    "7077:6983",
  ]),
  bug(81, "V2 Certifications", "/evolution/certifications-accreditations", [
    "7077:3221",
  ]),
  bug(82, "V2 Sustainability", "/evolution/sustainability-esg-commitments", [
    "7077:6671",
    "7077:6707",
  ]),
  bug(83, "V2 Solar EPCM", "/engineering/solar-epcm-services", ["7077:6595"]),
  bug(84, "V2 GRID-INTEL layout", "/engineering/grid-intel", ["7077:4592"]),
  bug(85, "V2 GRID-INTEL states", "/engineering/grid-intel", ["7077:4592"]),
  bug(86, "V2 Products", "/engineering/products", ["7077:12660"]),
  bug(87, "V2 Project Portfolio", "/endeavors/project-portfolio", [
    "7077:7011",
  ]),
  bug(88, "V2 Case Studies", "/endeavors/case-studies", [], "pattern-derived"),
  bug(
    89,
    "V2 Community Energy Stories",
    "/endeavors/community-energy-stories",
    [],
    "pattern-derived",
  ),
  bug(90, "V2 Learning Hub", "/enlighten/learning-hub", [], "pattern-derived"),
  bug(91, "V2 Supply Partner Handbook", "/ecosystem/supplier-code-of-conduct", [
    "7077:28846",
  ]),
  bug(92, "V2 Client Partnerships", "/ecosystem/client-partnerships", [
    "7077:15858",
  ]),
  bug(
    93,
    "V2 Collaboration & Innovation",
    "/ecosystem/collaboration-innovation",
    ["7077:18721"],
  ),
  bug(
    94,
    "V2 Technology Alliances",
    "/ecosystem/technology-innovation-alliances",
    ["7077:22719"],
  ),
  bug(95, "V2 Partner With Us", "/engage/partner-with-us", ["7077:23359"]),
  bug(96, "V2 Become a Supplier", "/engage/become-a-supplier", ["7077:23359"]),
  bug(97, "V2 Investor Relations", "/engage/investor-relations", [
    "7077:19989",
  ]),
  bug(98, "V2 Contact Us", "/engage/contact-us"),
  bug(99, "V2 Request a Proposal", "/engage/request-a-proposal", [
    "7077:19854",
  ]),
  bug(100, "V2 Find Us Globally", "/engage/reach-us"),
] as const;

export const getFigmaBug = (id: number) =>
  FIGMA_BUGS.find((item) => item.id === id);
