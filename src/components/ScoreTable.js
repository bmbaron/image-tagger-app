import React from 'react';

function ScoreTable({ highScores }) {

	const scoreRows = highScores.map((entry) => (<p className="score-row"><span style={{fontWeight: 'bold'}}>{entry.name}</span> {entry.time}</p>))

	return (
		<div className="score-container">
			<h3>leaderboard</h3>
			{scoreRows}
		</div>
	);
}

export default ScoreTable;