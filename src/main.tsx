import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider, createTheme } from '@mui/material/styles';

export type FactionColor = 'factionBasic' | 'factionTinker' | 'factionMagic' | 'factionAncient' | 'factionNovus' | 'factionNature';

const queryClient = new QueryClient();

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
  interface Palette {
    factionBasic: Palette['primary'];
    factionTinker: Palette['primary'];
    factionMagic: Palette['primary'];
    factionAncient: Palette['primary'];
    factionNovus: Palette['primary'];
    factionNature: Palette['primary'];
    unitHealth: Palette['primary'];
    unitDamage: Palette['primary'];
    unitSpeed: Palette['primary'];
  }

  interface PaletteOptions {
    factionBasic?: PaletteOptions['primary'];
    factionTinker?: PaletteOptions['primary'];
    factionMagic?: PaletteOptions['primary'];
    factionAncient?: PaletteOptions['primary'];
    factionNovus?: PaletteOptions['primary'];
    factionNature?: PaletteOptions['primary'];
    unitHealth?: PaletteOptions['primary'];
    unitDamage?: PaletteOptions['primary'];
    unitSpeed?: PaletteOptions['primary'];
  }

  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    factionBasic: true;
    factionTinker: true;
    factionMagic: true;
    factionAncient: true;
    factionNovus: true;
    factionNature: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    unitHealth: true;
    unitDamage: true;
    unitSpeed: true;
  }
}

let theme = createTheme({
  colorSchemes: {
    light: true,
    dark: true,
  },
});
const makeCustomColor = (main: string) => {
  const color = theme.palette.augmentColor({ color: { main } });
  (color as any).lighter = theme.lighten(color.light, 0.5);
  (color as any).darker = theme.darken(color.dark, 0.5);
  return color;
};

theme = createTheme(theme, {

  palette: {
    factionBasic: makeCustomColor('#55504F'),
    factionTinker: makeCustomColor('#625205'),
    factionMagic: makeCustomColor('#62086A'),
    factionAncient: makeCustomColor('#491213'),
    factionNovus: makeCustomColor('#1D376B'),
    factionNature: makeCustomColor('#294305'),
    unitHealth: makeCustomColor('#4BFF33'),
    unitDamage: makeCustomColor('#FF4939'),
    unitSpeed: makeCustomColor('#8DB2FF'),
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
