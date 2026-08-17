# Figma Bug Evidence Ledger

Authoritative file: `s4XHMhWuuo8LMFx2ojKFRI`, page `7077:2780`. Desktop reference viewport: 1920×970. Responsive checks: 1440, 1024, 768, and 390 px.

| Bug | Route | Source frame(s) | Motion | Responsive | Status |
|---|---|---|---|---|---|
| 0021 | `/explore/why-green` | `7077:4467` | Recursive context returned no animated nodes | 1920, 1440, 1024, 768, 390 | Implemented; manual Figma/browser overlay reviewed |
| 0022 | `/explore/global-snapshot` | `7077:14856` | Recursive context returned no animated nodes | 1920, 1440, 1024, 768, 390 | Implemented; exact network image and mask committed |
| 0023 | `/explore/fast-facts-stats` | `7077:6529` | Recursive context returned no animated nodes | 1920, 1440, 1024, 768, 390 | Implemented; exact impact-card and quote vectors committed |
| 0024 | `/evolution/our-story-milestones` | `7077:6923`, `7077:6983` | Recursive context returned no authored motion | 1920, 1440, 1024, 768, 390 | Implemented; shared header retained and milestone artwork aspect ratio preserved |
| 0025 | `/evolution/mission-vision` | `7077:6846`, `7077:6885` | Recursive context returned no authored motion | 1920, 1440, 1024, 768, 390 | Implemented; latest Figma card state and exact vectors committed |
| 0026 | `/evolution/leadership-team` | `7077:6769` | Recursive context returned no authored motion | 1920, 1440, 1024, 768, 390 | Implemented; reusable member cards preserve API content and Figma row geometry |
| 0027 | `/evolution/certifications-accreditations` | `7077:3221` | Source frame contains no authored keyframe motion | 1920, 1440, 1024, 768, 390 | Implemented; exact ISO, Clean Energy Council, quote, and CTA assets committed; shared header baseline corrected |
| 0028 | `/evolution/sustainability-esg-commitments` | `7077:6671`, `7077:6707` | Source frames contain no authored keyframe motion | 1920, 1440, 1024, 768, 390 | Implemented from later V2 state; exact masked background, ESG icons, and slanted card vectors committed |
| 0029 | `/engineering/solar-epcm-services` | `7077:6595` | Source frame contains no authored keyframe motion | 1920, 1440, 1024, 768, 390 | Implemented; exact solar composite, service-card, quote-panel, and CTA assets committed; shared header retained |
| 0030 | `/engineering/hybrid-microgrid-solutions` | `7077:5239` | Recursive motion context returned no animated nodes | 1920, 1440, 1024, 768, 390 | Implemented; exact existing pole composite, watermark, quote bracket, and slanted CTA exports reused; shared header retained |
| 0031 | `/engineering/energy-storage-smart-grid` | `7077:6475` | Recursive motion context returned no animated nodes | 1920, 1440, 1024, 768, 390 | Implemented; exact existing storage composite, watermark, and CTA exports reused; shared header retained |
| 0032 | `/engineering/om-monitoring` | `7077:4516` | Recursive motion context returned no animated nodes | 1920, 1440, 1024, 768, 390 | Implemented; exact existing monitoring composite, watermark, lightning glyph, and CTA exports reused; shared header retained |
| 0033 | `/engineering/grid-intel` | `7077:4592` | Recursive motion context returned no animated nodes | 1920, 1440, 1024, 768, 390 | Implemented; exact existing solar composite, watermark, section brackets, and CTA exports reused; all eight existing dialogs retained |
| 0034 | `/engineering/products` | `7077:12660` | Recursive motion context returned no animated nodes | 1920, 1440, 1024, 768, 390 | Implemented; exact existing Figma product, lifestyle background, gallery, logo, specification-panel, and icon exports reused; API content retained with deterministic Figma fallback |
| 0035 | `/endeavors/project-portfolio` | `7077:7011` | Recursive motion context returned no animated nodes | 1920, 1440, 1024, 768, 390 | Implemented; exact Baiyer, Pimaga, and Mongal project imagery reused; shared canvas/header/chatbot and existing project API/modal behavior retained; editor-only choice tokens excluded |
| 0036 | `/endeavors/flagship-projects` | `7077:14937` | Recursive motion context returned no animated nodes | 1920, 1440, 1024, 768, 390 | Implemented; exact fixed-canvas composition, local fallback data, shared header/chatbot, and consultation flow retained |
| 0037–0038 | Pattern-derived routes | No matching source frame | Must follow selected source pattern | Pending | Pattern-derived |
| 0039 | `/enlighten/insights-articles` | `7080:58112` | No authored motion | 1920, 1440, 1024, 768, 390 | Implemented; shared header/logo panel and canvas chatbot reused |
| 0040 | \`/enlighten/reports-whitepapers\` | \`7077:5298\`, \`7077:5454\` | No authored motion | 1920, 1440, 1024, 768, 390 | Implemented; shared header/logo panel, report controls, and canvas chatbot reused |
| 0041 | Events & Webinars | `7080:57600` | Desktop frame compared against the Figma export at 1920 × 970; shared header, cards, event sidebar, CTA and chat geometry aligned | Implemented | Playwright route and responsive checks passed |
| 0042 | Thought Leadership | `7077:15063` | Desktop frame compared against the Figma export at 1920 × 970; shared header, editorial cards, category panel, CTAs and chat geometry aligned | Implemented | Playwright route and responsive checks passed |
| 0043 | Media & Mentions | `7077:5840` | Rebuilt from Figma frame; L-shaped framing, vertical title, 3-column media grid, year sidebar, and shared CTAs | Implemented | Verified |
| 0044 | `/enlighten/learning-hub` | No matching source frame | Must follow selected source pattern | Pending | Pattern-derived |
| 0045 | `/ecosystem/our-value-chain` | `7077:18325` | Rebuilt from Figma frame; mask background, vertical title, 6 capability items with Figma icons, ecosystem glassmorphic card, quote panel, and shared CTAs | Implemented | Verified |
| 0046 | `/ecosystem/supplier-code-of-conduct` | `7077:28846` | Rebuilt from Figma frame; vertical title, 4 handbook cards, quote panel, shared CTAs and chatbot | Implemented | Verified |
| 0047 | `/ecosystem/our-procurement-philosophy` | `7080:73710`, `7077:21771` | Rebuilt from Figma frame; vertical title, 4 philosophy cards, quote panel, shared CTAs and chatbot | Implemented | Verified |
| 0048 | `/ecosystem/key-supply-categories` | `7077:27873` | Rebuilt from Figma frame; vertical title, 6 staggered capability rows with line dividers, quote panel, technical modals, ProductEnquiry modal, and shared CTAs | Implemented | Verified |
| 0049 | `/ecosystem/become-a-supplier` | `7077:19121`, `7077:28549` | Rebuilt from Figma frame; vertical title, 3 supplier qualification cards, quote callout, dialogs, ProductEnquiry modal, and shared CTAs | Implemented | Verified |
| 0050 | `/ecosystem/client-partnerships` | `7077:15858` | Rebuilt from Figma frame; vertical title, 5 partnership tiers, quote callouts, dialogs, ProductEnquiry modal, and shared CTAs | Implemented | Verified |
| 0051–0087 | See typed manifest | Available frame IDs recorded in manifest | Pending per-frame inspection | Pending | Pending |
| 0088–0090 | Pattern-derived routes | No matching source frame | Must follow selected source pattern | Pending | Pattern-derived V2 |
| 0091–0100 | See typed manifest | Available frame IDs recorded in manifest | Pending per-frame inspection | Pending | Pending V2 |

Bug 0021 reuses `SiteHeader`, `FigmaBrandPanel`, `D6Chatbot`, and `FigmaPageCanvas`. Exact local exports are used for the composited solar panel, watermark, six solution icons, logo panel, bolt, CTA, and microphone. API data remains enabled; deterministic validation forces the documented local fallback.
