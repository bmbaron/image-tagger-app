import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { getImageData, getHighScores } from './components/firebaseConnect'
import Header from './components/Header'
import TargetBox from './components/TargetBox'
import StartGameModal from './components/StartGameModal'
import HighScoreModal from './components/HighScoreModal'

import rabbitImage from './images/hidden-rabbit-min.png'
import spiderImage from './images/hidden-spider-min.png'
import snakeImage from './images/hidden-snake-min.png'

import { Backdrop, Box, Typography } from '@mui/material';



function App() {

  const backgroundImages = [rabbitImage, spiderImage, snakeImage]

  let myRef = useRef(null)

  const [startTimer, setStartTimer] = useState(false)
  const [finalTime, setFinalTime] = useState(1000)
  const [firstClick, setFirstClick] = useState(true)

  const [imageData, setImageData] = useState([])
  const [highScores, setHighScores] = useState([])

  const [animal, setAnimal] = useState("")
  const [coords, setCoords] = useState([])
  const [imageCounter, setImageCounter] = useState(0)

  let viewport = document.querySelector('meta[name="viewport"]')
  const [clickLocation, setClickLocation] = useState([0,0])
  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)
  const [marginLeft, setMarginLeft] = useState(0)

  const [found, setFound] = useState(false)
  const [select, setSelect] = useState("")

  const [foundAnimals, setFoundAnimals] = useState({"rabbit": false, "snake": false, "spider": false})
  const [allFound, setAllFound] = useState(false)
  const [wrongAnswer, setWrongAnswer] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(false)

  //modals
  const [startGameModal, setStartGameModal] = useState(true)
  const [highScoreModal, setHighScoreModal] = useState(false)

  useEffect(() => {
      getImageData().then((res) => {
      setImageData(res)
      setAnimal(res[0].animal)
      setCoords(res[0].coords)
    })
    getHighScores().then((res) => {
      setHighScores(res)
    })
    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setTimeout(()=>{
      setWrongAnswer(false)
      setCorrectAnswer(false)
    }, 600)
  }, [wrongAnswer, correctAnswer])

  useEffect(() => {
    if (!Object.values(foundAnimals).includes(false)) {
      setAllFound(true)
    }
    else {
      loadNextImage()
    }
  }, [foundAnimals])

  useEffect(() => {
    if(startTimer) {
      setAnimal(imageData[imageCounter].animal)
      setCoords(imageData[imageCounter].coords)
    }
  }, [startTimer, imageData, imageCounter])

  
  function handleResize() {
    if(myRef.current.clientWidth !== 0 && myRef.current.clientHeight !== 0) {
      setImgWidth(myRef.current.clientWidth)
      setImgHeight(myRef.current.clientHeight)
    }
  }

  function findClickLocation(event) {     
        
    //this will zoom out when the user clicks, allowing them to easily open the select 
    if (viewport) {
      viewport.content = "initial-scale=1";
      viewport.content = "width=500";
    }

    let boxStartX
    let boxEndX
    let boxStartY
    let boxEndY

    if(firstClick) {
      setFirstClick(false)
      setImgWidth(myRef.current.clientWidth)
      setImgHeight(myRef.current.clientHeight)
      setStartTimer(true)

      boxStartX = (myRef.current.clientWidth / 2) / myRef.current.clientWidth
      boxEndX = boxStartX
      boxStartY = (myRef.current.clientHeight / 3) / myRef.current.clientHeight
      boxEndY = boxStartY

    }
    else {
      boxStartX = Number((((event.clientX-event.currentTarget.getBoundingClientRect().left)-25)/myRef.current.clientWidth).toFixed(2))
      boxEndX = Number((((event.clientX-event.currentTarget.getBoundingClientRect().left)+25)/myRef.current.clientWidth).toFixed(2))
      boxStartY = Number((((event.clientY-event.currentTarget.getBoundingClientRect().top)-25)/myRef.current.clientHeight).toFixed(2))
      boxEndY = Number((((event.clientY-event.currentTarget.getBoundingClientRect().top)+25)/myRef.current.clientHeight).toFixed(2))
    }


    setClickLocation([boxStartX, boxStartY])

    //used for positioning the target box component
    setMarginLeft(event.currentTarget.getBoundingClientRect().left)

    //check if animal is within the virtual target box 
    if(boxStartX <= coords[0] && coords[0] <= boxEndX && boxStartY <= coords[1] && coords[1] <= boxEndY) {
      setFound(true)
    }
    else {
      setFound(false)
    }
  }

  function checkFunction(event) {
    if(found) {
      if (event.target.value === animal) {
        setFoundAnimals(prev => ({...prev, [event.target.value]: true}))
        setCorrectAnswer(true)
      }
      else {
        setWrongAnswer(true)
      }
    }
    else {
      setWrongAnswer(true)
    }
    setSelect("")
  }

  function loadNextImage() {
    if(null !== imageData) {
      if(imageCounter < 2) {
        setImageCounter(prev => prev + 1)
      }
      else if (imageCounter === 2) {
        setImageCounter(0)
      }
      setClickLocation([0,0])
      setFound(false)
    }
  }

  

  function toggleStartGameModal() {
    setStartGameModal(false)
  }

  function toggleHighScoreModal() {
    setHighScoreModal(prev => !prev)
  }

  return (
    <div className="App">
      <Backdrop
        sx={{ 
          backgroundColor: 
            correctAnswer ? 'rgba(0, 255, 0, 0.4)' 
            : wrongAnswer && 'rgba(255, 0, 0, 0.4)',
          zIndex: 2,
        }}
        open={correctAnswer | wrongAnswer ? true : foundAnimals[animal] ? true : false}
      > 
        <Box sx={{display: foundAnimals[animal] && !allFound ? 'block' : 'none' }}>
          <Typography variant="h2" color="white">completed</Typography>
        </Box>
      </Backdrop>
      <img 
        src={backgroundImages[imageCounter]}
        alt="animal hidden"
        className={highScoreModal ? "animal-image blurred-image" : "animal-image"} 
        style={{
          display: startGameModal ? 'none' : 'block',
          zIndex: 1
        }}
        onClick={(e) => findClickLocation(e)}
        ref={myRef}>
      </img>
      {startGameModal ?
        <StartGameModal
          highScores={highScores}
          hideModal={toggleStartGameModal}
        />
        :
        <>
          <Header
            correctAnswer={correctAnswer}
            wrongAnswer={wrongAnswer}
            allFound={allFound}
            showTimer={startTimer}
            finalTime={finalTime}
            setFinalTime={setFinalTime}
            timeToBeat={highScores[2].time}
            toggleHighScoreModal={toggleHighScoreModal}
            highScoreModal={highScoreModal}
            loadNextImage={loadNextImage}
          />
          <TargetBox
            correctAnswer={correctAnswer}
	          wrongAnswer={wrongAnswer}
	          highScoreModal={highScoreModal}
	          clickLocation={clickLocation}
            marginLeft={marginLeft}
	          imgWidth={imgWidth}
	          imgHeight={imgHeight} 
	          checkFunction={checkFunction}
            select={select}
          />
        </>
      }
      {highScoreModal && 
        <HighScoreModal
          finalTime={finalTime}
        />
      }
    </div>
  );
}

export default App;
