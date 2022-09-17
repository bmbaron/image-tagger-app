import React from 'react';
import ScoreTable from './ScoreTable'
import tutorialGif from '../images/fish tutorial cropped.gif'
import forestImg from '../images/forest.jpeg'

import { Paper, Card, Button, Typography, Box, Fade } from '@mui/material';

const StartGameModal = ({ highScores, hideModal }) => {

	return (
		<Box sx={{ backgroundImage: `url(${forestImg})`, marginLeft: {md: '5rem', sm: '2rem', xs: '1rem'}, marginRight: {md: '5rem', sm: '2rem', xs: '1rem'}, borderRadius: 5 }}>
		<Paper className="start-modal" elevation={3} sx={{ backgroundColor: 'rgba(10, 100, 100, 0.7)', paddingBottom: "10px", borderRadius: 5,}}>
			<Typography variant="h4" fontWeight="bold" color="white" mb={3} ml={1} mr={1}>Welcome to Animal Finder</Typography>
				<Box mb={6} sx={{ color: 'white' }}>
						<Typography fontSize={20}>
							You will see 3 pictures.<br/>
							Each picture has 1 hidden animal.<br/>
							Label the animals as fast as you can.
						</Typography>
					<br/>
					<Typography fontSize={20} sx={{fontStyle: 'italic'}}>
						Get a top time and add your name to the ...
					</Typography>
				</Box>

				<Fade in timeout={ 4000 }>
				<Box 
					sx={{
						margin: 'auto',
						marginBottom: '4rem',
						width: {md: '60%', sm: '70%', xs: '90%'},
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
								backgroundColor: "rgba(0,0,0,0.7)",
								padding: '1rem',
								margin: 'auto',
								width: 'fit-content',
								paddingLeft: '2rem',
								paddingRight: '2rem',
								textAlign: 'center',
								color: 'gold'
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
						sx={{ width: {lg: '40%', md: '60%', sm: '70%', xs: '100%'}, margin: 'auto'}}
					/>
					<Typography className="tutorial-title" color="white" variant="h5">how to play </Typography>
				</Box>
		</Paper>
		</Box>
	);
};

export default StartGameModal;