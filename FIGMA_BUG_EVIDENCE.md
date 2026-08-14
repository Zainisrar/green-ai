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
| 0030–0036 | See typed manifest | Exact frame IDs recorded in manifest | Pending per-frame inspection | Pending | Pending |
| 0037–0038 | Pattern-derived routes | No matching source frame | Must follow selected source pattern | Pending | Pattern-derived |
| 0039–0043 | See typed manifest | Exact frame IDs recorded in manifest | Pending per-frame inspection | Pending | Pending |
| 0044 | `/enlighten/learning-hub` | No matching source frame | Must follow selected source pattern | Pending | Pattern-derived |
| 0045–0087 | See typed manifest | Available frame IDs recorded in manifest | Pending per-frame inspection | Pending | Pending |
| 0088–0090 | Pattern-derived routes | No matching source frame | Must follow selected source pattern | Pending | Pattern-derived V2 |
| 0091–0100 | See typed manifest | Available frame IDs recorded in manifest | Pending per-frame inspection | Pending | Pending V2 |

Bug 0021 reuses `SiteHeader`, `FigmaBrandPanel`, `D6Chatbot`, and `FigmaPageCanvas`. Exact local exports are used for the composited solar panel, watermark, six solution icons, logo panel, bolt, CTA, and microphone. API data remains enabled; deterministic validation forces the documented local fallback.
