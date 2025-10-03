import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box textAlign="center" mb={4}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to SkyShard DataBase
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Your comprehensive resource for SkyShard game data
                </Typography>
            </Box>

            <Grid container spacing={3} justifyContent="center">
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Unit Database
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Browse and analyze all units in SkyShard. View detailed stats, abilities, and characteristics.
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
                                Encounter Database
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Explore encounter data and battle scenarios (Coming Soon).
                            </Typography>
                            <Button
                                variant="outlined"
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