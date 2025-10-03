import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useColorScheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import UnitsPage from './pages/UnitsPage';
import EnchantmentsPage from './pages/Enchantments';
import EncountersPage from './pages/EncountersPage';

function App() {
  const { mode, setMode } = useColorScheme();
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');

  if (!mode) {
    return <CircularProgress />;
  }
  if (mode === 'system') {
    setMode(prefersLightMode ? 'light' : 'dark');
  }

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked ? 'dark' : 'light');
  };

  const buildDate = new Date(import.meta.env.VITE_APP_BUILD_DATE).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation onModeChange={handleModeChange} />
        
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/units" element={<UnitsPage />} />
            <Route path="/enchantments" element={<EnchantmentsPage />} />
            <Route path="/encounters" element={<EncountersPage />} />
          </Routes>
        </Box>
        
        <Box sx={{ p: 1, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="caption">
            Last built: {buildDate || "unknown"}
          </Typography>
          <Typography variant="caption" sx={{ mx: 2 }}>
            |
          </Typography>
          <Typography variant="caption">
            &copy; 2025 by Araym. All rights reserved
          </Typography>
        </Box>
      </Box>
    </Router>
  );
}

export default App;