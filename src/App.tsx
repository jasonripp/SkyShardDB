import { useColorScheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import PatchInfo from './components/PatchInfo'
import UnitTable from './components/UnitTable'

function App() {
  const { mode, setMode } = useColorScheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const buildDate = new Date(import.meta.env.VITE_APP_BUILD_DATE).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  if (!mode) {
    return <CircularProgress />;
  }

  const effectiveMode =
    mode === 'system'
      ? (prefersDarkMode ? 'dark' : 'light')
      : mode;
  const logoSrc = effectiveMode === 'dark' ? 'images/LogoWhite.png' : 'images/LogoBlack.png';

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box>
          <img src={logoSrc} className="App-logo" alt="logo" />
        </Box>
        <Typography variant="h2" component="h1">SkyShard DataBase</Typography>
        <PatchInfo />
        <UnitTable />
        <Typography variant="caption">
          Last built: {buildDate || "unknown"}
        </Typography>
      </Container>
    </>
  )
}

export default App
