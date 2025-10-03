import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import UnitTable from '../components/UnitTable';
import { UnitTableProvider } from '../context/UnitTableContext';

const UnitsPage: React.FC = () => {
    return (

        <Container maxWidth="xl" sx={{ py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Unit Database
            </Typography>
            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                <UnitTableProvider>
                    <UnitTable />
                </UnitTableProvider>
            </Box>
        </Container>

    );
};

export default UnitsPage;