---
name: ArchAcademy Design System
version: 1.0.0
theme:
  mode: dark
  palette:
    canvas: "#020617"
    surface: "#0F172A"
    surfaceRaised: "#1E293B"
    borderSubtle: "#1E293B"
    primaryAccent: "#3B82F6"
    primaryGlow: "rgba(59, 130, 246, 0.5)"
    textMain: "#F8FAFC"
    textMuted: "#94A3B8"
    success: "#10B981"
    warning: "#F59E0B"
    danger: "#EF4444"
    layerEntities: "#EF4444"
    layerUseCases: "#F59E0B"
    layerAdapters: "#3B82F6"
    layerInfrastructure: "#8B5CF6"
typography:
  family:
    main: "'Outfit', sans-serif"
    mono: "'Fira Code', monospace"
  sizes:
    hero: 4.5rem
    h1: 3.5rem
    h2: 2.5rem
    h3: 1.8rem
    h4: 1.2rem
    bodyLarge: 1.2rem
    body: 1rem
    bodySmall: 0.9rem
    label: 0.8rem
    caption: 0.7rem
  weights: [400, 500, 700, 800, 950]
  lineHeight: 1.6
  numbers: tabular-nums
spacing:
  unit: 4px
  scale: [4, 8, 12, 16, 24, 32, 48, 64, 96]
radii:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 24px
---

# Design Specification — ArchAcademy

Single source of truth for the visual language of the portal. Tokens live in
`src/presentation/themes/theme.ts` and `typography.ts`; CSS variables mirror them in
`src/index.css`. Presentation code reads tokens, never hard-coded values.

## 1. Visual Atmosphere & Philosophy

ArchAcademy teaches architecture to engineers, so the interface behaves like a well-designed
system: deep, calm, and legible under long reading sessions.

- **Night-canvas clarity.** `#020617` is the room; `#0F172A` is the paper. Content sits on
  raised surfaces, never on gradients that compete with diagrams.
- **Glass as structure, not decoration.** The signature `.glass-card` uses a translucent
  surface, a 1px hairline border, 24px radius and `blur(10px)`. It communicates layering —
  the same idea the lessons teach. Motion is limited to a 4px lift and shadow change.
- **One accent, earned.** Blue `#3B82F6` marks navigation, focus and primary action. Green
  `#10B981` means "complete / correct". Red `#EF4444` means "risk / failure". Amber
  `#F59E0B` means "trade-off / caution". Never use an accent purely for ornament.
- **Semantic layer colors are reserved.** Red, amber, blue and violet identify Entities,
  Use Cases, Adapters and Infrastructure in diagrams. Do not reuse them for generic UI.
- **Typography carries hierarchy.** Outfit for prose and headings, Fira Code for code,
  topology labels and numeric tables. Headings are heavy (800–950) with tight tracking;
  body text is muted `#94A3B8` at 1.6 line-height for readability.
- **Numbers align.** Scores, benchmarks and matrix values use `font-variant-numeric:
  tabular-nums` so columns compare cleanly.
- **Quiet depth.** A fixed radial blue tint at the top of the viewport plus a 2% noise
  overlay adds atmosphere with zero network cost. No stock imagery as background.

## 2. Component Guidelines

### Surfaces & cards

- Base card: `surface` background, `borderSubtle` 1px border, radius `xl` (24px), padding 32px.
- Glass variant: `rgba(15, 23, 42, 0.65)` + `backdrop-filter: blur(10px)`.
- Hover: `translateY(-4px)`, shadow `0 16px 32px -8px rgba(0,0,0,0.4)`, border lightens to
  20% white. Transition 250ms `cubic-bezier(0.16, 1, 0.3, 1)`.
- Never stack more than two translucent layers; blur over blur destroys contrast.

### Buttons

- Primary: `primaryAccent` fill, `textMain` label, radius `md` (8px), 12px × 24px padding.
- Secondary: transparent fill, 1px `borderSubtle`, `textMain` label; hover raises border to
  30% white.
- Destructive: `danger` text or fill only when the action is irreversible.
- Every interactive element has a visible `:focus-visible` ring using `primaryAccent` at
  40% alpha. Keyboard reachability is mandatory.

### Typography scale

- Hero 4.5rem / 950 / -2px tracking; section 3.5rem / 950.
- Card title 1.2rem / 800; body 1rem / 400 / 1.6; label 0.8rem / 700.
- Badges: 0.7rem, 900 weight, 2px letter-spacing, uppercase.
- Code and topology identifiers: Fira Code, 0.9rem, `surfaceRaised` background chip.

### Layout & spacing

- 4px base unit. Use the scale only: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Content column max-width 1200px, 32px side padding.
- Section rhythm: 96px between major sections, 48px between blocks, 16px inside cards.
- Grids collapse to one column below 768px; never hide content behind hover on touch.

### Data, diagrams & feedback

- Matrix and comparison tables: sticky header, zebra rows at 2% white, tabular numerals.
- Diagrams use the reserved layer palette; edges are 1px at 20% white, labels on chips.
- Success/error feedback uses icon + text, never color alone.
- Empty states state what is missing and the next action; no decorative filler.

### Animated scenes

The design direction for dashboard-density diagrams is **OpenDesign's
`tech-utility` direction** (Datadog/GitHub posture): information per square inch,
tabular numerics, mono for identifiers, restrained status pills.

- Stage: `bgDark` with a 32px hairline grid at 7% white and one radial blue tint.
  The grid is the coordinate system, not decoration.
- Node card: `surface → bgDark` gradient, 16px radius, 1px hairline border,
  icon chip in the node tone. Focus adds a tone ring and a tone-tinted shadow.
- Tone is signal, never ornament: blue = route, green = request/success,
  amber = warning/trade-off, red = failure, violet = storage/log.
- Dimmed context stays at 42% opacity. A node the lesson is not discussing should
  recede, not disappear; labels remain legible.
- Motion budget: one packet per active edge, 1.7s travel, 0.7s repeat delay,
  transform/opacity only. Reduced motion replaces packets with a static midpoint
  dot and keeps step changes instant.
- Narration panel mirrors the stage: step index, technique tag, prose, then a
  "what changed" list generated from the scene events.

## 3. Do's & Don'ts

**Do**

- Read colors, spacing and type from theme tokens or CSS variables.
- Keep one primary action per view; make secondary actions visually quieter.
- Verify contrast: body text ≥ 4.5:1, large headings ≥ 3:1 on `canvas` and `surface`.
- Respect `prefers-reduced-motion`; replace lifts and slides with opacity changes.
- Test both themes of content density: long lesson prose and dense topology canvases.
- Use `rem` for type and spacing so browser zoom works.

**Don't**

- Don't introduce a new hex value outside the token file.
- Don't use layer colors (red/amber/blue/violet) as generic accents.
- Don't add glow, gradient text or blur to body copy.
- Don't nest glass cards or place glass over busy diagrams without a solid scrim.
- Don't animate layout properties (`width`, `top`, `margin`) — transform and opacity only.
- Don't ship icon-only controls without an accessible label and tooltip.
- Don't let a component own page-level spacing; layout belongs to the page shell.
