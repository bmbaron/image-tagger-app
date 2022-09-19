import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Timer from './Timer'

const Header = ({
	correctAnswer,
	wrongAnswer,
	allFound,
	showTimer,
	finalTime,
	setFinalTime,
	timeToBeat,
	highScoreModal,
	toggleHighScoreModal,
	loadNextImage
}) => {
  
	function reloadGame() {
    window.location.reload()
  }

	return (
    <Box 
			sx={{ flexGrow: 1}}
		>
			<AppBar
				position="fixed"
				className={correctAnswer ? 'correct' : wrongAnswer ? 'wrong' : ''}
				sx={{
					backgroundColor: allFound ? 'rgba(31, 222, 53, 0.5)' : 'rgba(25, 118, 210, 0.76)',
				}}
			>
        <Toolbar>
					{showTimer ? 
						<>
							<Box 
								display='flex'
								sx={{margin: 'auto'}}>
								<Timer
									endTimer={allFound}
									setFinalTime={setFinalTime}
									maxTime={timeToBeat}
								/>
								<Button
									variant="contained"
									sx={{
										marginLeft: '1rem',
										background: 'red',
										display: allFound ? 'none' : 'block',
									}}
									onClick={loadNextImage}
								>
									next
								</Button>
							</Box>

							{finalTime !== 1000 &&
								<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
									<Button
										variant="contained"
										sx={{
											display: finalTime < timeToBeat ? 'block' : 'none',
											margin: '0.5rem',
											marginRight: '0.25rem',
											backgroundColor: 'rgb(224, 41, 224)',
											color: 'white',
											'&:hover': {
      									backgroundColor: 'white',
												color: 'rgb(224, 41, 224)',
  										},
											flex: '1'
										}}
										onClick={toggleHighScoreModal}
									>
										{highScoreModal ? "cancel" : "submit high score"}
									</Button>
									<Button
									  variant="contained"
										onClick={reloadGame}
										sx={{margin: '0.5rem', marginLeft: '0.25rem', flex: '0.4'}}
									>
										play again
									</Button>
								</Box>
							}
						</>
						: 
						<Typography sx={{margin: 'auto', typography: { sm: 'h3', xs: 'h5' } }}>click to start</Typography>
					}
        </Toolbar>
      </AppBar>
		</Box>
	)
};

export default Header;