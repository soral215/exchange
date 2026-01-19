export const theme = {
  colors: {
    primary: '#3479EB',
    primaryHover: '#2563DB',
    primaryLight: '#EBF2FE',
    
    secondary: '#646F7C',
    secondaryHover: '#475569',
    
    success: '#10B981',
    successLight: '#D1FAE5',
    
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    
    error: '#FE5050',
    errorLight: '#FEE2E2',
    
    up: '#FE5050',
    down: '#3B6EFF',
    
    text: {
      primary: '#374553',
      secondary: '#646F7C',
      tertiary: '#94A3B8',
      inverse: '#FFFFFF',
    },
    
    background: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      tertiary: '#F7F8F9',
    },
    
    border: {
      light: '#D0D6DB',
      default: '#CBD5E1',
      dark: '#94A3B8',
    },
  },
  
  typography: {
    fontFamily: {
      base: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '22px',
      '3xl': '28px',
      '4xl': '48px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.33,
      relaxed: 1.5,
    },
  },
  
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 12px rgb(0 0 0 / 0.08)',
    lg: '0 8px 24px rgb(0 0 0 / 0.12)',
  },
  
  transitions: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
  },

  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
  },

  media: {
    mobile: '@media (max-width: 768px)',
    tablet: '@media (max-width: 1024px)',
  },
} as const

export type Theme = typeof theme
