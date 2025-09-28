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
  if (!mode) {
    return <CircularProgress />;
  }
  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked ? 'dark' : 'light');
  }
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const effectiveMode =
    mode === 'system'
      ? (prefersDarkMode ? 'dark' : 'light')
      : mode;
  const logoSrc = effectiveMode === 'dark' ? 'images/LogoWhite.png' : 'images/LogoBlack.png';

  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

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
      <Container maxWidth="xl">
        <Box>
          <Grid container justifyContent="space-between" alignItems="flex-end" >
            <Grid >
              <Typography variant={isSmallScreen ? "h4" : "h2"} component="h1">SkyShard DataBase</Typography>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                  <PatchInfo />
                </Grid>
                <Grid>
                  <ModeSwitch sx={{ mb: 1 }} checked={effectiveMode === 'dark'} onChange={handleModeChange} />
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
        <UnitTable />
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
