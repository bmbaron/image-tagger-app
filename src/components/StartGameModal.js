import React from 'react';
import ScoreTable from './ScoreTable'
import tutorialGif from '../images/tutorial.gif'
import { Paper, Card, CardContent, Button, Typography, Box } from '@mui/material';

const StartGameModal = ({ highScores, hideModal }) => {

	return (
		<Paper className="start-modal" elevation={3}>
			<Typography variant="h4">Welcome to Animal Finder</Typography>
				<Card className="instructions">
						<Typography>
							You will see 3 pictures.<br/>
							Each picture has 1 hidden animal.<br/>
							Label the animals as fast as you can.
						</Typography>
					<br/>
					<Typography>
						If you get a top time, you can add your name to the <strong>leaderboard</strong>!
					</Typography>
				</Card>

				<Card mt={1}>
					<Typography variant="h4">LeaderBoard</Typography>
					<ScoreTable highScores={highScores} />
				</Card>

				<Button variant="contained" onClick={hideModal} sx={{margin: "2rem"}}>
					begin
				</Button>
				
				<Box 
					component="img"
					src={tutorialGif}
					alt="tutorial gif"
					sx={{width: "90%"}}
				/>
				<h3 className="tutorial-title">how to play</h3>
		</Paper>
	);
};

export default StartGameModal;