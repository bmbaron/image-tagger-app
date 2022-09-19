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

import { Backdrop } from '@mui/material';



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
  }, [foundAnimals])

  useEffect(() => {
    if(startTimer && finalTime < highScores[2].time) {
      console.log("winner")
    }
  }, [startTimer, finalTime, highScores])

  
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
    
    if(firstClick) {
      setFirstClick(false)
      setImgWidth(myRef.current.clientWidth)
      setImgHeight(myRef.current.clientHeight)
      setStartTimer(true)
    }

    let boxStartX = Number((((event.clientX-event.currentTarget.getBoundingClientRect().left)-25)/myRef.current.clientWidth).toFixed(2))
    let boxEndX = Number((((event.clientX-event.currentTarget.getBoundingClientRect().left)+50)/myRef.current.clientWidth).toFixed(2))
    let boxStartY = Number((((event.clientY-event.currentTarget.getBoundingClientRect().top)-25)/myRef.current.clientHeight).toFixed(2))
    let boxEndY = Number((((event.clientY-event.currentTarget.getBoundingClientRect().top)+50)/myRef.current.clientHeight).toFixed(2))

    setClickLocation([boxStartX, boxStartY])
    // console.log(boxStartX, boxStartY)
    // console.log(coords[0], coords[1])

    setMarginLeft(event.currentTarget.getBoundingClientRect().left)

    //check if animal is within the target box 
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
        if(imageCounter < 2) {
          setImageCounter(prev => prev + 1)
          setTimeout(() => {
            getNext()
          }, 600);
        }
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

  function getNext() {
    if(null !== imageData) {
      setClickLocation([0,0])
      setAnimal(imageData[imageCounter+1].animal)
      setCoords(imageData[imageCounter+1].coords)
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
            : wrongAnswer && 'rgba(255, 0, 0, 0.4)'
        }}
        open={correctAnswer | wrongAnswer ? true : false}
      />
      <img 
        src={backgroundImages[imageCounter]}
        alt="animal hidden"
        className={highScoreModal ? "animal-image blurred-image" : "animal-image"} 
        style={{display: startGameModal ? 'none' : 'block'}}
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
