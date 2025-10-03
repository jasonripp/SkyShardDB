import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const EncountersPage: React.FC = () => {
	return (
		<Container maxWidth="xl" sx={{ py: 2 }}>
			<Typography variant="h4" component="h1" gutterBottom>
				Encounter Database
			</Typography>
			<Paper sx={{ p: 3, textAlign: 'center' }}>
				<Typography variant="h6" color="text.secondary">
					Encounter database coming soon...
				</Typography>
				<Typography variant="body1" sx={{ mt: 2 }}>
					This page will contain detailed encounter information.
				</Typography>
			</Paper>
		</Container>
	);
};

export default EncountersPage;