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
			display: clickLocation[0] === 0 ? 'none' : !highScoreModal ? 'block' : 'none',
			left: clickLocation[0] === 0 ? (window.innerWidth / 2) - 25 : clickLocation[0]*imgWidth+marginLeft,
			top: clickLocation[0] === 0 ? (window.innerHeight / 2) - 25 : clickLocation[1]*imgHeight,
		}}>
				<FormControl sx={{ m: 1}}>
					<Select
						sx={{
							width: 40,
							height: 40,
							backgroundColor: 'white'
						}}
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
