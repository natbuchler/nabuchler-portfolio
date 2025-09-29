// Design Tokens extraídos automaticamente do Figma via MCP
// Atualizados automaticamente quando o design muda

export const colors = {
  brown: '#421d13',
  beige: '#ad8a6c', 
  textGray: '#6b6763',
  card: '#ad8a6c33',
  card30: '#d0bfb0',
  white35: '#ffffff59',
  background: '#e3dcd6',
  orange: '#c95127',
} as const;

export const typography = {
  specials36px: {
    fontFamily: 'Comfortaa',
    fontStyle: 'Light',
    fontSize: 36,
    fontWeight: 300,
    lineHeight: 1.7999999523162842,
  },
  h1: {
    fontFamily: 'Playfair Display',
    fontStyle: 'Bold',
    fontSize: 64,
    fontWeight: 700,
    lineHeight: 1.2000000476837158,
  },
  h2: {
    fontFamily: 'Playfair Display',
    fontStyle: 'Bold',
    fontSize: 48,
    fontWeight: 700,
    lineHeight: 72,
  },
  h3: {
    fontFamily: 'Playfair Display',
    fontStyle: 'Bold',
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 1.5,
  },
  h4: {
    fontFamily: 'Playfair',
    fontStyle: 'SemiBold',
    fontSize: 32,
    fontWeight: 600,
    lineHeight: 1,
  },
  quote: {
    fontFamily: 'Playfair Display',
    fontStyle: 'Bold',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 44,
  },
  buttonPrimary: {
    fontFamily: 'Roboto',
    fontStyle: 'Medium',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.5,
  },
  buttonSecondary: {
    fontFamily: 'Roboto',
    fontStyle: 'Medium',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.5,
  },
  card18px: {
    fontFamily: 'Roboto Flex',
    fontStyle: 'Regular',
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  light24px: {
    fontFamily: 'Roboto Flex',
    fontStyle: 'Light',
    fontSize: 24,
    fontWeight: 300,
    lineHeight: 1.5,
  },
  tag: {
    fontFamily: 'Roboto',
    fontStyle: 'Medium',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1,
  },
  body18px: {
    fontFamily: 'Raleway',
    fontStyle: 'Medium',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 28,
  },
  text20px: {
    fontFamily: 'Roboto Flex',
    fontStyle: 'Regular',
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 1,
  },
} as const;

// Utility functions para usar os tokens
export const getTypographyStyle = (variant: keyof typeof typography) => {
  const style = typography[variant];
  return {
    fontFamily: style.fontFamily,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    lineHeight: `${style.lineHeight}px`,
  };
};

export const getColorValue = (color: keyof typeof colors) => {
  return colors[color];
};

// CSS Custom Properties para usar no Tailwind
export const cssVariables = {
  '--color-brown': colors.brown,
  '--color-beige': colors.beige,
  '--color-text-gray': colors.textGray,
  '--color-card': colors.card,
  '--color-card-30': colors.card30,
  '--color-white-35': colors.white35,
  '--color-background': colors.background,
  '--color-orange': colors.orange,
} as const;
