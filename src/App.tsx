import { useColorScheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ModeSwitch from './components/modeSwitch';
import PatchInfo from './components/PatchInfo';
import UnitTable from './components/UnitTable';

function App() {
  const { mode, setMode } = useColorScheme();
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  if (!mode) {
    return <CircularProgress />;
  }
  if (mode === 'system') {
    setMode(prefersLightMode ? 'light' : 'dark');
  }

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked ? 'dark' : 'light');
  }

  const logoSrc = mode === 'light' ? 'images/LogoBlack.png' : 'images/LogoWhite.png';

  const buildDate = new Date(import.meta.env.VITE_APP_BUILD_DATE).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Box>
          <Grid container justifyContent="space-between" alignItems="flex-end" >
            <Grid >
              <Typography variant={isSmallScreen ? "h4" : "h2"} component="h1">SkyShard DataBase</Typography>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                  <PatchInfo />
                </Grid>
                <Grid>
                  <ModeSwitch sx={{ mb: 1 }} checked={mode === 'dark'} onChange={handleModeChange} />
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Box>
                {!isSmallScreen &&
                  <img src={logoSrc} style={{ maxWidth: "300px" }} alt="logo" />
                }
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <UnitTable />
        </Box>
        <Box>
          <Typography variant="caption">
            Last built: {buildDate || "unknown"}
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default App
