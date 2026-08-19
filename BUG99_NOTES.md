# Bug 99 — Request a Proposal (/engage/request-a-proposal, node 7077:19854)

## Canvas spec (node 7077:4218 style D6 canvas, 1920x970)
Key ABS coords (measured from Figma render at 2x then halved):
- Green gradient panel top-left + GREEN logo (25,25) 235x68; vertical title "BOOK A CONSULTATION" left edge (vertical text from x~20 to x~60, y~540-690? actually from ~520 down to ~690 bottom-left)
- Nav header at y0 h116: logo+nav items uppercase fs20 + bolt at (1836,16) 85x85
- H1 " REQUEST A PROPOSAL (RFP)" at (177,270) fs56 fw800: "REQUEST A" black, "PROPOSAL" green, "(RFP)" black — Figma shows all UPPERCASE
- Subtitle "Let's Build Your Energy Project — From Vision to Reality." at (177,350) fs22 fw700 green italic (Figma shows "Let's Build Your Energy Project — From Vision to Reality.")
- Desc at (177,395) fs18 fw400 w1384
- "Who Should Use This" at (190,478) fs26 fw700
- 4 pill chips skewX(-16deg) border yellow: "Government Agencies" (226,510), "Donors & NGOs" (504,511), "Commercial Developers" (218,555), "Large Enterprises" (509,556) fs24 fw600 italic
- "What GREEN Delivers in Every Proposal" at (190,650) fs26 fw700
- 6 deliverable rows w/ bolt icons: left col "Tailored Solution With Technical Specs" (228,696), "Financial Quotation (CapEx + OpEx)" (231,745), "Delivery Timelines, SLAs, Warranties" (232,797); right col "Single Line Diagram (SLD)" (527,693), "ESG Impact Metrics" (526,742) — fs24 fw600 italic; bolts at (206,700),(206,768),(207,840),(598,696)
- Quote right side: shape left vector at (502,471)?? Actually quote block "“Proposals Shouldn’t Be Generic. At GREEN, Every RFP Is A Strategic Partnership In The Making.”" at (460,641) w387 h230 fs24 fw700 with green corner vectors (502,471?)... dump: GROUP Group 1171277935 ABS=(-9506,9827) 387x230 + vector 7374 at (-9564,9886) 79x98 (left bracket) + 7375 (-9176,9827) 80x99 (right bracket) — canvas offset +9566,-9566?? need to compute canvas coords.
- Email fallback skewed box at (190,820): "Email Fallback : solutions@green.com.pg" w269 h52 with calendar icon
- "Request a Proposal (RFP)" green CTA button at (608,827) w269 h52 (text fs16 fw600) + right arrow — click opens Proposal modal
- Free note at (293,888) w928 fs18: "Consultations are free for government agencies, donors, NGOs, and registered local businesses."
- Chatbar Group 1171276641 at (459,899)?? dump abs (-9507,10193)+offset → canvas (459,627)? NO — scale: 10193-9566=627?? canvas is 970 tall... hmm offset compute needed. From render: chatbar "Let's Talk Energy" at ~(795,895) w418 h52 (canonical position 1498+262? no, canvas abs left 1498). Render shows chatbar at x~795 (1x 1920 image)? Actually 2x render: chatbar at x~1590/3840 → 795?? but canvas should be 1498. WAIT render was scaled 2x from 1920 → x 1590/2=795?? That's left of Figma spec 1498?? The render image 3840x1940 = full canvas 1920x970 at 2x. Chatbar at display x~1590 → real 795?? In the Figma VIEW I saw chatbar at right side ~(800,900). Hmm. Figma spec chatbar canonical 1498 from homepage analysis. From dump: Group 1171276641 ABS=(-9507,10193). Canvas offset from homepage node 7077:4218 ABS (-9566,9266)? need to compute: for homepage, logo (25,25) ABS(-9541,9291): offset = -9541-25=-9566, 9291-25=9266. So canvas(x,y) = abs(x,y) - (-9566,9266). Chatbar: 10193+9566=459?? NO: canvas x = -9507-(-9566) = 59?? hmm. Compute: -9507 + 9566 = 59. y: 10193 - 9266 = 927. → canvas (59,927)?? That's bottom-left! But render shows chatbar bottom-right at ~(1590/2, 900). Something inconsistent: maybe the render image was from a DIFFERENT variant state or different node coords.
  RENDER TRUMPS: From the actual 2x render: chatbar at x 1584-2002/2=792-1001?? hmm 2x scale: display x /2. Chatbar band display 1585-2003 → real 792-1001, y 1789-1888 → real 894-944. So canvas chatbar at (792,894) w209?? That's w=209 half of 418?? NO — 2003-1585=418/2? wait 418 real = 836 display... I'm halving wrong. Real = display/2: 2003/2=1001, 1585/2=792 → w = 1001-792 = 209?? Display 2003-1585=418 → real 209?? Hmm but spec w418. So display coords ARE real/2... display 1585 → real 3170?? NO display max 1940? render is 3840 wide! Display 1585/3840 → real 1585*1920/3840 = 792.5?? no: 3840/2=1920 → real = display/2. So chatbar real x 792-1001?? that's only 209 wide. Hmm. The chatbar in render at display x~1584-2002 in a 3840 image... 2002/2=1001. Width 209?? But spec 418. So either my display reading was of 1x crop OR the chatbar renders at (1584,894)?? display/2 → 792??
  SIMPLER: trust tight bbox measurement on 1x (/tmp/r99_1x.png): measure white band x range + white text 'Let's Talk Energy' at y~895.
- CTA "Request a Proposal (RFP)" button render: display x~1584-1850?? real 792-925?? or 2x: display x 1584+650=2234?? From render 2x: green button at x ~1584-1850/2 → real 792-925, y 1600-1652/2 → 800-826?? hmm from earlier view: button at ~(792,800)?? no render view showed button near x~800 y~798? The 1x render view: button at x 792-925, y 798-825 (2x display 1584-1850, 1596-1650). And the button text 792+17=809?? 
  Actually 1x render viewed: chatbar at x 795-1215?? NO: 1x image is 1920 wide; in view I saw chatbar at ~x795-1210 (placeholder "Let's Talk Energy" at x 798-880??). Ugh. Run tight bbox on 1x render to settle.

## Current implementation (baseline)
- Uses TopNavigation + flex layout, NOT canvas. Completely different layout but visually similar structure: nav, H1 titlecase smaller, subtitle green ✓, desc ✓, chips ✓ (skew), deliverables ✓, quote ✓, email fallback ✓, CTA ✓, note ✓, chatbot ✓.
- Diffs: title fs/uppercase (fs30 vs 56, title case), subtitle fs22 ✓, chips uppercase-ish? current "Commercial developers" lowercase d vs Figma "Commercial Developers", deliverable text italic ✓ but layout grid, quote right column width, vertical title missing, canvas positioning missing, chatbar placeholder default 'Type your words....' vs Figma 'Let's Talk Energy'.
- Decision: REBUILD as D6 canvas page like other bugs (absolute positioning 1920x970), reuse SiteHeader (layout figmaCanvas) + D6Chatbot + FigmaAngledCta for CTA, vertical title PNG, chatbar figmaPlaceholder 'Let's Talk Energy', CTA opens Proposal modal on click.

## Fix list
1. Convert /engage/request-a-proposal to canvas page (relative container 1920x970, overflow hidden, scale pattern used in other pages).
2. SiteHeader layout="figmaCanvas", D6Chatbot canvasAnchored figmaPlaceholder="Let's Talk Energy".
3. H1 at (177,270) fs56 fw800 uppercase "REQUEST A PROPOSAL (RFP)" with "PROPOSAL" green.
4. Subtitle (177,350) fs22 fw700 green italic.
5. Desc (177,395) fs18 fw400 max-w 1384.
6. Section heads fs26 fw700 at (190,478) and (190,650).
7. 4 chips: text fs24 fw600 italic, "Government Agencies" (226,510), "Donors & NGOs" (504,511), "Commercial Developers" (218,555), "Large Enterprises" (509,556), skewX(-16deg) border #FFE500 2px.
8. Deliverables: bolts (Figma-export vector PNG or reuse bolt image?) at (206,700),(206,768),(207,840),(598,696); texts fs24 fw600 italic left col x228/231, right col x527/526.
9. Quote at (460,641) w387 h230 fs24 fw700 with green corner brackets (export vectors as PNG).
10. Email fallback box (190,820) 269x52 with calendar icon + text fs16 fw600 italic.
11. CTA green box (608,827) 269x52 fs16 fw600 → opens Proposal modal (import Proposal from ./Modals/Proposal... but component moved into canvas page; keep Proposal modal as-is).
12. Free note (293,888) fs18 with green spans.
13. Vertical "BOOK A CONSULTATION" title: export Figma TEXT node (vertical fs50 fw900) as PNG, place at left edge.
14. Main image right side behind quote (requestProposalMainImg, top-right, z -1).

## Authoritative canvas spec (node 7077:19854, CANVAS coords computed from ABS with frame offset (-11005,9294))
- Frame 1920x970 at (0,0)
- Header instance at (262,0) 1668x116; bolt (1836,16); logo group (-15,-1) 326x662 with GREEN LOGO at (9,19) 255x67 — same as homepage canvasHeader
- Vertical "Book a Consultation" text (47,320) 59x582 fs50 fw900 (VERTICAL rotation!) — export as PNG
- H1 " REQUEST A PROPOSAL (RFP)" (262,112) 1003x67 fs56 fw800 — uppercase in render
- Subtitle (262,192) 715x72 fs22 fw700 green italic "Let's Build Your Energy Project — From Vision to Reality."
- Desc (264,242) 1384x48 fs18 fw400
- Who Should Use This (259,320) fs26 fw700
- Chips vectors: 7364 (277,374) 366x53, 7377 (723,374) 366x53, 7376 (270,443) 366x53, 7378 (716,443) 366x53 (skewed parallelogram outlines; chips 366x53?? but texts: "Government agencies" (315,365), "Commercial developers"(315,365+57=422?) — node says one TEXT both lines at (315,365) 681x114; "Donors & NGOs" (773,366); texts fs24 fw600; Figma shows 2x2 grid chips
- Deliverables: Who Should col texts at (315,365)/(773,366); What GREEN Delivers section head (262,542); left col texts (335,590) 681x192 3 lines fs24 fw600; right col texts (936,588) 357x130 2 lines; bolts: 12 (265,592), 13 (265,660), 16 (264,732), 14 (873,588), 15 (866,660) 70x70 (green lightning icons)
- Quote: Group 1171277935 (1499,533) 387x230: text (1499,533) fs24 fw700 "“Proposals shouldn’t be generic. At GREEN, every RFP is a strategic partnership in the making.”" (Figma render shows Title Case: "“Proposals Shouldn’t Be Generic. At GREEN, Every RFP Is A Strategic Partnership In The Making.”" — use render case... node text is lowercase-ish; render shows Title Case. FOLLOW RENDER: Title Case), corner vectors 7374 (1441,592) 79x98 (left bracket green), 7375 (1829,533) 80x99 (right bracket)
- Mask group photo collage (1023,444) 1152x1888 (right side background image, z behind) — export as composited PNG
- Email fallback group 1171280825 (219,845) 556x53: vector 7364 (219,845) 556x53 (skew box), calendar vector (263,856) 30x31, text (311,856) fs20 fw600 italic "Email Fallback :   solutions@green.com.pg"
- CTA group 1171277854 (1647,819) 269x52: vector 7368 (1647,819) 269x52 (green skewed button), text (1664,825) fs16 fw600 " Request a Proposal (RFP)", arrow frame (1872,831) 36x32
  NOTE: the node also lists "GREEN Innovation Partnership Framework (PDF)" text at (1466,824) 410x35?? that's left of button?? In render I saw ONLY "Request a Proposal (RFP)" button. Hmm the PDF text may be hidden variant or I missed it in render... render shows button at right x~823-925(1x). The PDF text absent in render → not visible (variant off). Skip.
- Free note (332,918) 928x24 fs18
- Chatbar group 1171276641 (1498,899) 418x60: placeholder "Let's Talk Energy" fs13 fw600 at (1527,902), mic vector (1862,913)
- "Read more" + arrow at (1521,799) 168x24 — small link above chatbar?? In render: "Read more" small text near collage bottom at (1521,799)? I didn't notice in render. Check render crop.
- Menu Designs 2 Link (506,258) — invisible?? Not in render. Skip.
- bolt instance Component 529 (1405,-46) 644x1081 with bolt (1817,18) — top-right decorative bolt (matches render lightning at ~1868?) — render shows bolt at top-right x~1868?? canvas (1836,16) in header group + Component bolt at (1817,18). Render showed bolt at ~(1868,35). Fine: render bolt from header nav group (1836,16). Component bolt partially overlaps — it's a large transparent overlay? w644h1081 at (1405,-46) — may just be instance bounds; actual bolt 85x85 at (1817,18). Two bolts: header nav bolt (1836,16) + Component bolt (1817,18)?? Render shows ONE bolt top-right. Use header bolt (standard). Skip Component bolt unless render shows two.

## Plan: rebuild RequestProposal as canvas page
Create src/app/components/RequestProposal/RequestProposalCanvas.tsx (or rewrite RequestProposal.tsx) using canvas pattern:
- container .page div 1920x970 relative overflow-hidden; scale transform pattern? Check how other canvas pages scale (e.g. Expertise/EpcmServices) — they use transform scale based on viewport? Earlier notes: page is fixed 970 height with scale on window resize. Check existing canvas page CSS pattern in home.css (.home-page-d6) or other modules. Reuse exact pattern from a done page (e.g. src/app/components/EpcmServices/EpcmServices.tsx) to match.
- SiteHeader layout="figmaCanvas"
- Main image: export mask group 1171277956? No — mask group "Mask group" at (1023,444) is the photo collage. Render composited.
- Vertical title PNG from TEXT node — find its node ID in dump.
- D6Chatbot canvasAnchored figmaPlaceholder="Let's Talk Energy"
- CTA button: FigmaAngledCta? no — FigmaAngledCta is for links; button variant exists (onClick). Use green skewed button → can use D6AngledBox or export vector PNG + positioned text. Simplest: CSS skewX box like current chips.
- Proposal modal stays (import from ./Modals/Proposal).
- Chatbot replaces old <Chatbot/>.
- Page.tsx stays.

## Assets downloaded to /home/ubuntu/assets99/ (scale 2, names already canvas coords at 2x → divide by 2 for 1x)
vertical_title.png (59x582@2=118x1164), mask_collage.png (1152x1888*2), quote_group.png (387x230*2), bracket_l (79x98*2), bracket_r (80x99*2), chip1-4 (366x53*2), cta_box (269x52*2), cta_arrow (36x32*2), bolt_nav (85x85*2), mic (18x23*2), cta_group (269x52*2), email_group (556x53*2).
NOTE chip3 (7080:81091) is 546KB — unusual, verify it's the chip outline (maybe includes text?). Also email_group 56KB includes calendar vector + text "Email Fallback : solutions@green.com.pg" — can use as-is PNG? Text is rendered PNG; but font must match Montserrat... PNG fine (pixel-perfect). Same for cta_group (button text PNG). Quote group PNG includes quote text ✓.

## Placement spec 1x canvas (from bug99_canvas.txt)
vertical_title (47,320); mask_collage (1023,444); quote_group (1499,533); bracket_l (1441,592); bracket_r (1829,533); chip1 (277,374); chip2 (723,374); chip3 (270,443); chip4 (716,443); cta_box (1647,819); cta_arrow (1872,831); email_group (219,845); mic (1862,913); bolt_nav (1836,16).
Text labels (fs/style): H1 (262,112) fs56 fw800 uppercase "REQUEST A PROPOSAL (RFP)" ("PROPOSAL" green); subtitle (262,192) fs22 fw700 green italic; desc (264,242) fs18 w1384; who (259,320) fs26 fw700; chips texts (315,365),(773,366) fs24 fw600 italic; delivers (335,590) left col 3 lines; (936,588) right col 2 lines fs24 fw600 italic; section2 head (262,542); note (332,918) fs18.
Bolt icons for deliverables: rects 70x70 at (265,592),(265,660),(264,732),(873,588),(866,660) — these are green lightning bolt images; current page uses /images/grid-intel/lighting.png (works visually). Figma bolts are likely the same asset. Keep current lighting.png w28 (70/2=35... w35?) size 70x70 → img w35.
Chip vector outlines 366x53 with text inside (38px inset): use chip PNGs as img (outline has text baked? chip1 7.5KB likely outline only, chip3 546KB includes text??) → CHECK chip3 visual; if chip PNGs are outline-only, render text with CSS over them.
CTA: cta_group PNG includes button text "Request a Proposal (RFP)" + arrow?? (cta_group 13KB vs cta_box 4KB). Use cta_group PNG for button + wrap in button onClick open modal.
Email: email_group PNG has text baked ✓ place at (219,845) 556x53.
Quote: quote_group PNG has text baked ✓ (1499,533) 387x230 + brackets images.
Chatbar: use D6Chatbot canvasAnchored figmaPlaceholder="Let's Talk Energy".

## Component plan
- Rewrite src/app/components/BookConsulation/RequestProposal.tsx to canvas pattern (see Expertise/EpcmServices canvas pages as reference: transform scale wrapper based on window size, SiteHeader layout="figmaCanvas", D6Chatbot, absolute positioning).
- Keep Proposal modal import (./Modals/Proposal) — modal stays.
- page.tsx unchanged.
