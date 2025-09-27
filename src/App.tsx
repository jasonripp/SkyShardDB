import { useColorScheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import PatchInfo from './components/PatchInfo'
import UnitTable from './components/UnitTable'

function App() {
  const { mode, setMode } = useColorScheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

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
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Container maxWidth="xl" sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Grid container justifyContent="space-between" alignItems="flex-end">
            <Grid >
              <Typography variant={isSmallScreen ? "h4" : "h2"} component="h1" gutterBottom>SkyShard DataBase</Typography>
              <PatchInfo />
            </Grid>
            <Grid>
              <Box>
                {!isSmallScreen &&
                  <img src={logoSrc} style={{ maxWidth: "300px" }} alt="logo" />
                }
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <UnitTable />
          </Box>
          <Typography variant="caption">
            Last built: {buildDate || "unknown"}
          </Typography>
        </Container>
      </Box>
    </>
  )
}

export default App
