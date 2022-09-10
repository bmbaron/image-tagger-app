import React, { useState, useEffect } from 'react';

function Timer ({endTimer, setFinalTime}) {

	const [counter, setCounter] = useState(0)
	
	useEffect(() => {
		setTimeout(() => {
			!endTimer ? setCounter(counter + 0.1): setFinalTime(counter)
		}, 100);
	}, [counter, endTimer, setFinalTime])

	return (
		<div className="timer-box">
			<h1 className="status-title">{counter.toFixed(1)}</h1>
		</div>
	);
};

export default Timer;