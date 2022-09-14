import React from 'react';
import ScoreTable from './ScoreTable'
import tutorialGif from '../images/tutorial.gif'

const StartGameModal = ({ highScores, hideModal }) => {

	return (
		<div className="start-modal">
			<div className="start-modal-container">
			<h1>Welcome to Animal Finder</h1>
				<p className="instructions">
						<li>You will see 3 pictures.</li>
						<li>Each picture has 1 hidden animal.</li>
						<li>Label the animals as fast as you can.</li>
					<br/>
					If you get a top time, you can add your name to the <strong>leaderboard</strong>!
				</p>
				<div className="bottom-content">
					<ScoreTable highScores={highScores} />
					<button
						className="button start-button"
						onClick={hideModal}
					>
						begin
					</button>
				</div>
				<img 
					src={tutorialGif}
					alt="tutorial gif"
					className="tutorial-gif"
				/>
				<h3 className="tutorial-title">how to play</h3>
			</div>
		</div>
	);
};

export default StartGameModal;