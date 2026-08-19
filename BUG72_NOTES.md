# Bug 72 — Homepage (/home/renewable-energy-the-core) node 7077:4218

## Figma reference state (1920x970) — expanded "Energy" panel (panel index 2 / R)
Key observations from render + node dump:
- State shown: second panel (R, "About GREEN" label collapsed at 441,369 fs32 fw800 white).
- Center expanded copy: "Energy augmentation for industry transformation" (776,273) fs40 fw600, 407x196, white; body text at (776,483) 358x88 fs13 fw800 white.
- Other collapsed labels: "EPC Energy Services" (1274,365), "Projects and Services" (1650,366) fs32 fw800 white.
- First panel label "GREEN FUTURE ENVISIONED" at (53,234) fs40 fw600 white (4 lines).
- Letters G-R-E-E-N: vectors 1_G (0,603) 204x152, 2_R (290,606) 207x144, 3_E (743,603) 193x144, 4_E (1159,603) 194x145, 5_N (1545,603) 218x144.
- Chatbar: group (1498,899) 418x62, placeholder text "Let's Talk Energy" (1522,904) fs13 fw600 #707070 + mic icon at (1862,913) 18x23.
- Company Snapshots callout (1787,825) fs14 fw300 black + arrow (1786,818).
- GREEN Logo at (25,25) 235x68; nav at (262,0) 1668x116, nav items at top 47: Explore 1076, Energy 1203, Elements 1319, Expertise 1461, Enlist 1608/1644, Engage 1725; bolt (1836,16) 85x85.
- Left wedge Rectangle 34624681 at (-68,-146) 320x668.

## Current implementation gaps (from baseline screenshot)
1. Initial state shows RENEWABLE ENERGY THE CORE expanded with wrong description; Figma initial state is R (About GREEN collapsed label) + center energy copy. Current D6Template shows expanded panel 1 with own copy — differs from Figma node 7077:4218 which shows "Energy augmentation..." copy as the expanded state for the same visual state? Actually Figma render = expanded R state with energy copy (R's expanded content).
2. Chatbar placeholder shows "Type your words...." → must be "Let's Talk Energy" (figmaPlaceholder prop).
3. Chatbar position: current sits at bottom-right (900ish), Figma top:899 left:1498 inside canvas — triggerVariant=figmaCanvas already used in D6Template; need figmaPlaceholder prop.
4. Logo position in Figma (25,25) vs current logo at lower position (~402,25 in render it's at 25,25 actually OK in current? current render shows logo at 25,25 — OK).
5. Nav position: current nav at left ~1050, Figma 1076-1725 with top 47.
6. Snapshot callout position: current top 760 vs Figma 825.
7. Letters: Figma y 603-606 w/ different widths; current may be close.
8. Left label "gREEN Future envisionED" fs40 fw600 at (53,234) - current shows similar.
9. "company Snapshots IN 90 SEC" fs14 fw300 (1787,825) with arrow.

## Fix plan
- Add figmaPlaceholder="Let's Talk Energy" to D6Chatbot in D6Template.
- Update snapshot callout CSS top to 825 (Figma).
- Check SiteHeader: use layout="figmaCanvas" for nav at 1076/47 vs current viewport layout with logoOnly — header in render shows nav row at correct spot; canvasHeader class sets left 262, width 1668, height 116, nav top 47 left 814 gap 30, bolt top16 left1574. CURRENT baseline shows logo at top-left (25,25) and nav right of it at ~1050. SiteHeader currently used with panel="logoOnly" (default layout=viewport). Switch to layout="figmaCanvas".
- Green corner wedge: Figma Rectangle 34624681 at (-68,-146) 320x668; current CSS (-60.62,-160.8) 319.77x668 — nearly same.
- Adjust EXPANDED_PANELS[1] layout to left 776 top 273 fs40 lh, body left 776 top 483 fs13 lh... (Figma title top 273, fs40; body top 483 fs13).
