import React, { useState } from 'react';
import { addHighScore } from './firebaseConnect'

const Modal = ({ finalTime, openModal }) => {

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
		<div className={openModal ? "modal" : "hidden-modal"}>
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
					placeholder={`your time: ${finalTime}`}
					disabled
				></input>
				<button
					type="submit"
					className="button submit-button"
					style={{background: updatedScore && 'green'}}
				>
					{updatedScore ? "success" : "submit high score"}
				</button>
			</form>
		</div>
	);
};

export default Modal;