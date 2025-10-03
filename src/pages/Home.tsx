import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useColorScheme } from '@mui/material/styles';

import PatchInfo from '../components/PatchInfo';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { mode } = useColorScheme();

    const logoSrc = mode === 'light' ? 'images/LogoBlack.png' : 'images/LogoWhite.png';
    // const logoSrc = 'images/Logo1.png';

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box textAlign="center" mb={4}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to SkyShard DataBase
                </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Paper elevation={2} sx={{ p: 3 }}>
                    <Box textAlign="center" mb={2}>
                        <img src={logoSrc} style={{ maxWidth: "100%" }} alt="logo" />
                    </Box>
                    <Typography variant="body1" gutterBottom>
                        SkyShard DataBase is a community focused and comprehensive resource of data, tools, and information for Project SkyShard, an upcoming city builder PvP auto battler currently in development by ItsBen321 and RegisKillbin. It is currently available to try for free on Steam.
                    </Typography>
                    
                    <Divider sx={{ mb: 2 }} />
                    <PatchInfo />
                    
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        External Links
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Steam Page:</strong> <Link href="https://store.steampowered.com/app/3892910/Project_SkyShard/" target="_blank">Project SkyShard</Link>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Discord:</strong> <Link href="https://discord.gg/x8StwNb9S5" target="_blank">Join SkyShard Discord</Link>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Twitter:</strong> <Link href="https://x.com/playskyshard" target="_blank">@playskyshard</Link>
                    </Typography>

                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        Website Information
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Contact:</strong> SkyShardDB made by Araym.  For any questions, feedback, or comments, please reach out to me on the game's Discord.
                    </Typography>
                    <Typography variant="body2"  sx={{ mt: 2 }}>
                        This site is not affiliated with the publishers or developers of Project SkyShard, but all images and data have been used with permission. All trademarks are property of their respective owners.
                    </Typography>
                </Paper>
            </Box>

            <Grid container spacing={3} justifyContent="center">
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Unit Database
                            </Typography>
                            <Typography variant="body1" component="p" gutterBottom>
                                View, filter, and sort detailed the stats, information, and attributes of all units in SkyShard.
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/units')}
                                fullWidth
                            >
                                View Units
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Enchantment Database
                            </Typography>
                            <Typography variant="body1" component="p" gutterBottom>
                                View enchantment data and effects (Coming Soon).
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/enchantments')}
                                fullWidth
                            >
                                View Enchantments
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Encounter Database
                            </Typography>
                            <Typography variant="body1" component="p" gutterBottom>
                                View encounter data including shops and quests (Coming Soon).
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/encounters')}
                                fullWidth
                            >
                                View Encounters
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;