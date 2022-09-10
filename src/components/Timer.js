import React, { useState, useEffect } from 'react';

function Timer ({allFound}) {

	const [counter, setCounter] = useState(0)
	
	useEffect(() => {
		setTimeout(() => {
			setCounter(counter + 1)
		}, 1000);
	}, [counter])

	return (
		<h1 className="status-title">{counter + '.0'}</h1>
	);
};

export default Timer;