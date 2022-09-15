import React from 'react';
import { Box, MenuItem, FormControl, Select  } from '@mui/material';

const TargetBox = ({ 
	correctAnswer,
	wrongAnswer,
	highScoreModal,
	clickLocation,
	marginLeft,
	imgWidth,
	imgHeight, 
	checkFunction,
	select
}) => {

	return (
		<Box sx={{
			position: 'absolute',
			background: 'rgba(255,0,0,0.8)',
			borderRadius: '10px',
			padding: '0.2rem',
			display: highScoreModal ? 'none' : 'block',
			left: clickLocation[0] === 0 ? (window.innerWidth / 2) - 25 : clickLocation[0]*imgWidth+marginLeft,
			top: clickLocation[0] === 0 ? (window.innerHeight / 2) - 25 : clickLocation[1]*imgHeight,
		}}>
				<FormControl sx={{ m: 1}}>
					<Select
						sx={{width: 40, height: 40, backgroundColor: 'white'}}
						labelId="demo-simple-select-helper"
						id="demo-simple-select-helper"
						value={select}
						onChange={(e) => checkFunction(e)}
					>
						<MenuItem value="rabbit">rabbit</MenuItem>
						<MenuItem value="spider">spider</MenuItem>
						<MenuItem value="snake">snake</MenuItem>
					</Select>
				</FormControl>
		</Box>
	);
};

export default TargetBox;

{/* <div className={correctAnswer ? "target-box correct" : (wrongAnswer ? "target-box wrong" : "target-box")} 
//don't show when loading image, position in middle of screen when image loads, position at user's click after 
style={{
	display: highScoreModal ? 'none' : 'block',
	left: clickLocation[0] === 0 ? (window.innerWidth / 2) - 25 : clickLocation[0]*imgWidth+marginLeft,
	top: clickLocation[0] === 0 ? (window.innerHeight / 2) - 25 : clickLocation[1]*imgHeight,
}}
>
<select
	className="decorated"
	id="animals"
	name="animals"
	onChange={(e) => checkFunction(e)}
	style={{marginLeft: '4px'}}
	value={select}
>
	<option value="select">select</option>
	<option value="rabbit">rabbit</option>
	<option value="spider">spider</option>
	<option value="snake">snake</option>
</select>
</div> */}