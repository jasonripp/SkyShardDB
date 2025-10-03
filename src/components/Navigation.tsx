import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useColorScheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import ModeSwitch from './modeSwitch';
import PatchInfo from './PatchInfo';

interface NavigationProps {
    onModeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onModeChange }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { mode } = useColorScheme();
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const currentTab = location.pathname;

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        navigate(newValue);
    };

    const logoSrc = mode === 'light' ? 'images/LogoBlack.png' : 'images/LogoWhite.png';

    return (
        <AppBar position="static" color="default" elevation={1}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Typography variant={isSmallScreen ? "h5" : "h4"} component="h1">
                                    SkyShard DataBase
                                </Typography>
                                <PatchInfo />
                            </Box>
                        </Grid>
                        <Grid>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Tabs
                                    value={currentTab}
                                    onChange={handleTabChange}
                                    aria-label="navigation tabs"
                                >
                                    <Tab label="Home" value="/" />
                                    <Tab label="Units" value="/units" />
                                    <Tab label="Encounters" value="/encounters" />
                                </Tabs>
                                <ModeSwitch
                                    checked={mode === 'dark'}
                                    onChange={onModeChange}
                                />
                                {!isSmallScreen && (
                                    <img src={logoSrc} style={{ maxWidth: "150px" }} alt="logo" />
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navigation;