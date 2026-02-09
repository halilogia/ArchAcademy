/**
 * ArchAcademy Typography System
 * Extracted from flagship pages (Lean Architecture, Home, etc.)
 */
export const typography = {
  fontFamily: {
    main: "'Outfit', sans-serif",
    mono: "'Fira Code', monospace",
  },
  
  // Font Sizes
  size: {
    hero: '4.5rem',
    h1: '3.5rem',
    h2: '2.5rem',
    h3: '1.8rem',
    h4: '1.2rem',
    bodyLarge: '1.2rem',
    body: '1rem',
    bodySmall: '0.9rem',
    label: '0.8rem',
    caption: '0.7rem',
  },

  // Font Weights
  weight: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    extraBold: 800,
    black: 950,
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.2,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Letter Spacings
  letterSpacing: {
    tightest: '-2px',
    tighter: '-1px',
    normal: '0',
    wide: '2px',
    widest: '4px',
  },

  // Reusable Presets (Mapping to actual styles used in pages)
  presets: {
    heroTitle: {
      fontSize: '4rem',
      fontWeight: 950,
      lineHeight: 1,
      letterSpacing: '-2px',
    },
    sectionTitle: {
      fontSize: '3.5rem',
      fontWeight: 950,
      lineHeight: 1,
      letterSpacing: '-2px',
    },
    cardTitle: {
      fontSize: '1.2rem',
      fontWeight: 800,
      lineHeight: 1.4,
    },
    description: {
      fontSize: '1.1rem',
      lineHeight: 1.8,
      opacity: 0.8,
    },
    badge: {
      fontSize: '0.7rem',
      fontWeight: 900,
      letterSpacing: '2px',
      textTransform: 'uppercase',
    }
  }
} as const;
