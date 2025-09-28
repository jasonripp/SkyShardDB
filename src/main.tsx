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
  }

  interface PaletteOptions {
    factionBasic?: PaletteOptions['primary'];
    factionTinker?: PaletteOptions['primary'];
    factionMagic?: PaletteOptions['primary'];
    factionAncient?: PaletteOptions['primary'];
    factionNovus?: PaletteOptions['primary'];
    factionNature?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include an ochre option
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
let theme = createTheme({
  colorSchemes: {
    light: true,
    dark: true,
  },
});
theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    factionBasic: theme.palette.augmentColor({
      color: {
        main: '#55504F',
      },
      name: 'factionBasic',
    }),
    factionTinker: theme.palette.augmentColor({
      color: {
        main: '#625205',
      },
      name: 'factionTinker',
    }),
    factionMagic: theme.palette.augmentColor({
      color: {
        main: '#62086A',
      },
      name: 'factionMagic',
    }),
    factionAncient: theme.palette.augmentColor({
      color: {
        main: '#491213',
      },
      name: 'factionAncient',
    }),
    factionNovus: theme.palette.augmentColor({
      color: {
        main: '#1D376B',
      },
      name: 'factionNovus',
    }),
    factionNature: theme.palette.augmentColor({
      color: {
        main: '#294305',
      },
      name: 'factionNature',
    }),
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
