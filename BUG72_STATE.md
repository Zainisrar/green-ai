# Bug 72 current state (edit session)

Edit batches on src/app/components/D6Template.tsx:
- Batch 1 had 8 edits, only the last 2 of 8 applied (edit tool stopped on first failure? No — it applies in order and stops on failure). Applied so far: desc-guard + isAboutLabelPanel guard, About GREEN label fragment, expandedPanel>=1.
- NOT yet applied: GREEN_LETTERS widths/bottoms + LETTER_BASELINE removal; GREEN_WEDGE const; EXPANDED_PANELS[1] layout 776/273/40/49/13/22/358; GREEN_WEDGE img render; letter.bottom usage; SiteHeader layout="figmaCanvas"; D6Chatbot figmaPlaceholder.

## Remaining edits needed in D6Template.tsx (exact find/replace):
1. GREEN_LETTERS block: replace lines 102-111 with per-letter bottom array:
   G {left:0,width:204,bottom:215}, R {left:290,width:207,bottom:220}, E {left:743,width:193,bottom:223}, E2 {left:1159,width:194,bottom:222}, N {left:1545,width:218,bottom:223}. Remove `const LETTER_BASELINE = 184;`
2. EXPANDED_PANELS[1] (lines ~300-317 and 318-335): left 760→776, top 295→273, bodyWidth 350→358, titleSize 38→40, titleLineHeight 46→49, bodySize 12→13, bodyLineHeight 19→22.
3. Add GREEN_WEDGE const after EXPANDED_STATE_ART const (src /images/d6/wedge.png, left -68, top -146, w 320, h 668).
4. Render wedge img after panels.map rendering — after the closing of that block, before diagonals. Insert img with position:absolute, style left/top/width/height/zIndex 11, objectFit cover, aria-hidden.
5. GREEN_LETTERS.map: `bottom: LETTER_BASELINE` → `bottom: letter.bottom`.
6. SiteHeader: `panel="logoOnly"` → `layout="figmaCanvas" panel="logoOnly"` (only occurrence in desktop return, line ~570).
7. D6Chatbot call (~line 858): add figmaPlaceholder="Let's Talk Energy".

## Also pending:
- home.css: .group-1171280893 top 760→818; .rectangle-34624681/.d6-green-corner left -60.62px→-68px top -160.8px→-146px width 319.77 height 668.01, background url('/images/d6/wedge.png') cover (file already copied). Add .about-green-label CSS: position absolute, Montserrat fs32 fw800 white, text-shadow 0 2px 10px rgba(0,0,0,.5); (inline styles set left/top/width).
- Then: npx tsc --noEmit; screenshot /tmp/cur_home.png via playwright 1920x970 wait 6000; sidebyside with /tmp/home_render.png; iterate.
- Commit/push: source /home/ubuntu/.user_env, git add -A, commit "Fix bug 72: Homepage D6 — match Figma node 7077:4218 (letter geometry, energy copy position, About GREEN label, wedge, chatbar placeholder, figmaCanvas header)", pull --rebase fork main, push fork main.

## Key Figma facts (7077:4218):
- Letters: G(0,603)204x152 R(290,606)207x144 E(743,603)193x144 E(1159,603)194x145 N(1545,603)218x144
- Energy copy title (776,273) fs40 fw600 lh49 4 lines; body (776,483) 358x88 fs13 fw800
- About GREEN label (441,369) 213x72 fs32 fw800 white
- Wedge (-68,-146) 320x668 yellow→green gradient, exported PNG at public/images/d6/wedge.png (404x753)
- Chatbar (1498,899) 418x62 placeholder "Let's Talk Energy" fs13 fw600 #707070 italic
- Snapshots callout text (1787,825) fs14 fw300 + arrow (1786,818); current CSS z-group top→818
- Logo (25,25) 235x68; header nav instance (262,0) 1668x116 bolt (1836,16) 85x85, nav items top 47, gap 30: Explore1076, Energy1203, Elements1319, Expertise1461, Enlist1608, Engage1725
