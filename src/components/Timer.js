import React, { useState, useEffect } from 'react';

function Timer ({endTimer, setFinalTime, maxTime}) {

	const [counter, setCounter] = useState(0)
	
	useEffect(() => {
		setTimeout(() => {
			!endTimer ? setCounter(counter + 0.1): setFinalTime(Math.round( counter * 1e2 ) / 1e2)
		}, 100);
	}, [counter, endTimer, setFinalTime])

	return (
		<div className="timer-box">
			<h1 className={counter < maxTime ? "winning-time" : "losing-time"}>{counter.toFixed(1)}</h1>
		</div>
	);
};

export default Timer;