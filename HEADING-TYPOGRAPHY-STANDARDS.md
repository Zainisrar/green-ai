# Heading Typography & Color Standards

## Current Issues Identified

### Typography Inconsistencies:
1. **H1 Main Titles**: Mix of `text-2xl lg:text-3xl` and `lg:text-3xl text-2xl` (order varies)
2. **Font Weights**: Inconsistent use of `font-black` vs `font-bold`
3. **Color Variations**: 
   - Some use `text-gray-800`
   - Some use `text-[#23B14D]` (green)
   - Some mix both with spans
   - Some use `text-black`

### Specific Problems Found:

**H1 Headings:**
- AboutUs: `text-3xl lg:text-3xl` (no mobile variation)
- EsgMatters: `text-2xl lg:text-3xl`
- ThoughtsLeadership: `text-2xl lg:text-3xl`
- TeamGreen: `text-2xl lg:text-3xl`
- OurStory: `text-2xl lg:text-3xl`
- InvestorRelations: `lg:text-5xl text-3xl` (different scale)
- SmartGrid: `text-2xl` (mobile) vs `text-3xl` (desktop)

**H2 Subheadings:**
- Most use: `text-xl lg:text-2xl font-bold text-[#23B14D] italic`
- Some use: `text-2xl lg:text-3xl font-black text-gray-800`
- AboutUs uses: `text-xl font-black text-gray-800`

**H3 Section Headings:**
- Mix of `text-xl`, `text-2xl`, and `text-3xl`
- Mix of `font-bold` and `font-black`

## Recommended Standards

### H1 - Main Page Title
```tsx
className="text-2xl lg:text-3xl font-black text-gray-800 mb-4"
```
- Mobile: 24px (text-2xl)
- Desktop: 30px (text-3xl)
- Weight: 900 (font-black)
- Color: #1F2937 (text-gray-800)

### H2 - Subtitle/Tagline
```tsx
className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4"
```
- Mobile: 20px (text-xl)
- Desktop: 24px (text-2xl)
- Weight: 700 (font-bold)
- Color: #23B14D (GREEN brand color)
- Style: italic

### H3 - Section Headings
```tsx
className="text-xl lg:text-2xl font-bold text-gray-800 mb-4"
```
- Mobile: 20px (text-xl)
- Desktop: 24px (text-2xl)
- Weight: 700 (font-bold)
- Color: #1F2937 (text-gray-800)

### H4 - Subsection Headings
```tsx
className="text-lg lg:text-xl font-semibold text-gray-800 mb-2"
```
- Mobile: 18px (text-lg)
- Desktop: 20px (text-xl)
- Weight: 600 (font-semibold)
- Color: #1F2937 (text-gray-800)

## Color Usage Guidelines

### Primary Text Colors:
- **Gray-800** (`#1F2937`): Default for headings
- **GREEN** (`#23B14D`): Brand highlights, CTAs, emphasized words
- **Gray-700** (`#374151`): Body text
- **Gray-600** (`#4B5563`): Secondary text

### When to Use GREEN Color:
- Brand name "GREEN" in titles
- Key emphasized words (e.g., "FLAGSHIP", "MONITORING", "ESG")
- Subtitles and taglines
- Interactive elements

### Consistency Rules:
1. Always use responsive sizing (mobile first, then lg:)
2. Maintain consistent spacing (mb-4 for titles, mb-2 for subtitles)
3. Use font-black (900) for main titles only
4. Use font-bold (700) for subtitles and section headings
5. Reserve italic for taglines and quotes

## Files Needing Updates

Priority files with inconsistent headings:
1. AboutUs.tsx - Mixed sizing on mobile
2. InvestorRelations.tsx - Uses text-5xl (too large)
3. SmartGrid.tsx - Inconsistent between mobile/desktop views
4. ReportWhitePapers.tsx - H1 uses green instead of gray-800
5. OurVision.tsx - Multiple H1 tags with different styles
6. WhyGreen.tsx - Uses 2xl:text-6xl (unnecessary breakpoint)
