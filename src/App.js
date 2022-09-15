import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { getImageData, getHighScores } from './components/firebaseConnect'
import Header from './components/Header'

import StartGameModal from './components/StartGameModal'
import HighScoreModal from './components/HighScoreModal'

import rabbitImage from './images/hidden-rabbit.png'
import spiderImage from './images/hidden-spider.png'
import snakeImage from './images/hidden-snake.png'


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
    }, 3000)
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
          getNext()
        }
      }
      else {
        setWrongAnswer(true)
      }
    }
    else {
      setWrongAnswer(true)
    }
    setSelect("select")
  }

  function getNext() {
    if(null !== imageData) {
      setClickLocation([0,0])
      setAnimal(imageData[imageCounter+1].animal)
      setCoords(imageData[imageCounter+1].coords)
      setImageCounter(prev => prev + 1)
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
      <img 
        src={backgroundImages[imageCounter]}
        alt="animal hidden"
        className={highScoreModal ? "animal-image blurred-image" : "animal-image"} 
        style={{display: startGameModal ? 'none' : 'block'}}
        onClick={(e) => findClickLocation(e)}
        ref={myRef}>
      </img>
      {startGameModal &&
        <StartGameModal
          highScores={highScores}
          hideModal={toggleStartGameModal}
        />
      }
      {!startGameModal &&
        <Header
          correctAnswer={correctAnswer}
          allFound={allFound}
          showTimer={startTimer}
          finalTime={finalTime}
          setFinalTime={setFinalTime}
          timeToBeat={highScores[2].time}
          toggleHighScoreModal={toggleHighScoreModal}
          highScoreModal={highScoreModal}
        >
          {/* <button className="button next-pic-button" onClick={getNext}>next picture</button> */}
        </Header>
      }
      {/* target box */}
      {!startGameModal && <div className={correctAnswer ? "target-box correct" : (wrongAnswer ? "target-box wrong" : "target-box")} 
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
      </div>}
      {highScoreModal && 
        <HighScoreModal
          finalTime={finalTime}
        />
      }
    </div>
  );
}

export default App;
