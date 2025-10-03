import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useColorScheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';

import ModeSwitch from './modeSwitch';

interface NavigationProps {
    onModeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onModeChange }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { mode } = useColorScheme();

    const currentTab = location.pathname;

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        navigate(newValue);
    };
    const handleNavClick = (event: React.MouseEvent<HTMLElement>, path: string) => {
        event.stopPropagation();
        setAnchorElNav(null);
        navigate(path);
    };

    const pages = [{ 'label': 'Home', 'path': '/' }, { 'label': 'Units', 'path': '/units' }, { 'label': 'Enchantments', 'path': '/enchantments' }, { 'label': 'Encounters', 'path': '/encounters' }];
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            {/* <AppBar position="static" color="default" elevation={1}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid>
                                    <Typography variant={isSmallScreen ? "h5" : "h4"} component="h1">
                                        SkyShard DataBase
                                    </Typography>
                                </Grid>
                                <Grid>

                                </Grid>
                            </Grid>
                        </Box>


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
                        </Box>

                    </Toolbar>
                </Container >
            </AppBar > */}

            <AppBar position="static" color="default" elevation={1}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h3"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                mr: 4,
                                display: { xs: 'none', md: 'flex' },
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            onClick={(event) => handleNavClick(event, '/')}
                        >
                            SkyShard DataBase
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="navigation menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.label} onClick={(event) => handleNavClick(event, page.path)}>
                                        <Typography sx={{ textAlign: 'center' }}>{page.label}</Typography>
                                    </MenuItem>
                                ))}
                                <MenuItem >
                                    <ModeSwitch
                                        checked={mode === 'dark'}
                                        onChange={onModeChange}
                                    />
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            onClick={(event) => handleNavClick(event, '/')}
                        >
                            SkyShard DataBase
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Tabs
                                value={currentTab}
                                onChange={handleTabChange}
                                aria-label="navigation tabs"
                            >
                                {pages.map((page) => (
                                    <Tab
                                        key={page.label}
                                        label={page.label}
                                        value={page.path}
                                    />
                                ))}
                            </Tabs>
                        </Box>
                        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                            <ModeSwitch
                                checked={mode === 'dark'}
                                onChange={onModeChange}
                            />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default Navigation;