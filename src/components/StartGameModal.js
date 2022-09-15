import React from 'react';
import ScoreTable from './ScoreTable'
import tutorialGif from '../images/fish tutorial cropped.gif'
import { Paper, Card, Button, Typography, Box, Grid, Fade } from '@mui/material';

const StartGameModal = ({ highScores, hideModal }) => {

	return (
		<Paper className="start-modal" elevation={3}>
			<Typography variant="h4" fontWeight="bold" mb={3}>Welcome to Animal Finder</Typography>
				<Box mb={6}>
						<Typography>
							You will see 3 pictures.<br/>
							Each picture has 1 hidden animal.<br/>
							Label the animals as fast as you can.
						</Typography>
					<br/>
					<Typography sx={{fontStyle: 'italic'}}>
						Get a top time and add your name to the ...
					</Typography>
				</Box>

				<Fade in timeout={ 4000 }>
				<Box 
					sx={{
						margin: 'auto',
						marginBottom: '4rem',
						width: {md: '60%', sm: '70%', xs: '100%'},
						display: {
							md: 'flex',
							sm: 'inline-block'
						},
						flexDirection: 'row',
						justifyContent: 'space-evenly',
					}}
				>
					<Box>
						<Card 
							elevation={3}
							style={{
								backgroundColor: "rgba(212,100,200, 0.2)",
								padding: '1rem',
								margin: 'auto',
								width: {md: '80%', sm: '70%', xs: '100%'}
							}}
						>
							<Typography
								variant="h5"
								mt={1}
								fontWeight="bold"
								sx={{
									margin: 'auto',
								}}
							>Leaderboard</Typography>
							<ScoreTable highScores={highScores} />
						</Card>
					</Box>
					<Box sx={{marginTop: 'auto', marginBottom: 'auto'}}>
						<Button
							variant="contained"
							size="large"
							onClick={hideModal}
							sx={{marginTop: {md: 'auto', sm: '2rem', xs: '2rem'} }}
						>
							begin
						</Button>
					</Box>
				</Box>
				</Fade>
				<Box mt={4} mb={8}>
					<Box 
						component="img"
						src={tutorialGif}
						alt="tutorial gif"
						sx={{width: {md: '80%', sm: '70%', xs: '100%'}, margin: 'auto'}}
					/>
					<Typography className="tutorial-title">how to play </Typography>
				</Box>
		</Paper>
	);
};

export default StartGameModal;