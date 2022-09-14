import React from 'react';

function ScoreTable({ highScores }) {

	const scoreRows = highScores.map((entry) => 
		(<p 
			key={Math.random()}
			>
				<span style={{fontWeight: 'bold'}}>{entry.name}</span> - {entry.time} seconds
			</p>))

	return (
		<div>
			{scoreRows ? scoreRows : "loading"}
		</div>
	);
}

export default ScoreTable;