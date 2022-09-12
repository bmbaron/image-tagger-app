import React from 'react';

function ScoreTable({ highScores }) {

	const scoreRows = highScores.map((entry) => 
		(<p 
			key={Math.random()}
			className="score-row"
			>
				<span style={{fontWeight: 'bold'}}>{entry.name}</span> - {entry.time} seconds
			</p>))

	return (
		<div className="score-container">
			<h1>Leaderboard</h1>
			{scoreRows ? scoreRows : "loading"}
		</div>
	);
}

export default ScoreTable;