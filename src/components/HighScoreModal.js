import React, { useState } from 'react';
import { addHighScore } from './firebaseConnect'

const HighScoreModal = ({ finalTime }) => {

	const [name, setName] = useState('')
	const [updatedScore, setUpdatedScore] = useState(false)

	function handleChange(event) {
		setName(event.target.value)
	}

	function handleSubmit(e) {
		e.preventDefault()
		addHighScore(name, finalTime)
		setUpdatedScore(true)
	}
	
	return (
		<div className="score-modal" style={{zIndex: "4"}}>
			<form className="input-score-container" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="your name"
					onChange={(e) => handleChange(e)}
					value={name}
					required
				></input>
				<input
					type="text"
					placeholder={`${finalTime} seconds`}
					disabled
				></input>
				<button
					type="submit"
					className="button submit-button"
					style={{background: updatedScore && 'green'}}
				>
					{updatedScore ? "success" : "submit"}
				</button>
			</form>
		</div>
	);
};

export default HighScoreModal;