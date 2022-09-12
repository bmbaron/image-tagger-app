import React from 'react';
import ScoreTable from './ScoreTable'

const StartGameModal = ({ highScores, hideModal }) => {

	return (
		<div className="start-modal">
			<div className="start-modal-container">
				<p className="instructions">
					<strong>Welcome to Animal Finder</strong>
					<br/><br/>
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
			</div>
		</div>
	);
};

export default StartGameModal;