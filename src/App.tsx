import './App.css'

import { Box, CircularProgress } from '@mui/material';
import { useColorScheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery';

import PatchInfo from './components/PatchInfo'
import UnitTable from './components/UnitTable'

function App() {
  const { mode, setMode } = useColorScheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

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
      <Box>
        <img src={logoSrc} className="App-logo" alt="logo" />
      </Box>
      <h1>SkyShard DataBase</h1>
      <PatchInfo />
      <UnitTable />
    </>
  )
}

export default App
