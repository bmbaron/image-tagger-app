import React, { useState, useRef, useEffect, memo } from 'react';
import './App.css';
import { getImages, getHighScores } from './components/firebaseConnect'
import Timer from './components/Timer'
// import ScoreTable from './components/ScoreTable'
import StartGameModal from './components/StartGameModal'
import HighScoreModal from './components/HighScoreModal'

function App() {

  let myRef = useRef(null)

  const [startTimer, setStartTimer] = useState(false)
  const [finalTime, setFinalTime] = useState(1000)

  const [imageData, setImageData] = useState([])
  const [highScores, setHighScores] = useState([])

  const [image, setImage] = useState("")
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
    getImages().then((res) => {
      setImageData(res)
      initializeImage(res)
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

  function initializeImage(res) {
    setImage(res[0].url)
    setAnimal(res[0].animal)
    setCoords(res[0].coords)
    setImageCounter(1)
  }
  
  function handleResize() {
    if(null !== myRef.current) {
      setImgWidth(myRef.current.clientWidth)
      setImgHeight(myRef.current.clientHeight)
    }
  }

  function findClickLocation(event) {
      if(imgWidth === 0 && imgHeight === 0) {
        setImgWidth(myRef.current.clientWidth)
        setImgHeight(myRef.current.clientHeight)
        setStartTimer(true)
      }

      let boxStartX = Number((((event.clientX-event.currentTarget.getBoundingClientRect().left)-25)/myRef.current.clientWidth).toFixed(2))
      let boxEndX = Number((((event.clientX-event.currentTarget.getBoundingClientRect().left)+50)/myRef.current.clientWidth).toFixed(2))
      let boxStartY = Number((((event.clientY-event.currentTarget.getBoundingClientRect().top)-25)/myRef.current.clientHeight).toFixed(2))
      let boxEndY = Number((((event.clientY-event.currentTarget.getBoundingClientRect().top)+50)/myRef.current.clientHeight).toFixed(2))

      // console.log((event.clientX-event.currentTarget.getBoundingClientRect().left)/myRef.current.clientWidth)
      // console.log((event.clientY-event.currentTarget.getBoundingClientRect().top)/myRef.current.clientHeight)

      setClickLocation([boxStartX, boxStartY])
      setMarginLeft(event.currentTarget.getBoundingClientRect().left)

      //check if animal is within the target box 
      if(boxStartX < coords[0] && coords[0] < boxEndX && boxStartY < coords[1] && coords[1] < boxEndY) {
        setFound(true)
      }
      else {
        setFound(false)
      }
  }

  function checkFunction(event) {
    // console.log(found)
    if(found) {
      if (event.target.value === animal) {
        setFoundAnimals(prev => ({...prev, [event.target.value]: true}))
        setCorrectAnswer(true)
        setTimeout(()=>{
          if (Object.values(foundAnimals).filter(x => x === true).length < 2) {
            getNext()
          }
        }, 1000)
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
      setImage(imageData[imageCounter].url)
      setAnimal(imageData[imageCounter].animal)
      setCoords(imageData[imageCounter].coords)
      setFound(false)
    }
    if(imageCounter === 2) {
      setImageCounter(0)
    }
    else {
      setImageCounter(imageCounter+1)
    }
  }

  const Image = memo(function Image({ src }) {
    return <img
            src={src}
            ref={myRef}
            onClick={(e) => findClickLocation(e)}
            alt="animal"
            className={highScoreModal ? "animal-image blurred-image" : "animal-image"} 
            style={{display: startGameModal ? 'none' : 'block'}}
          />;
  });

  function toggleStartGameModal() {
    setStartGameModal(prev => !prev)
  }

  function toggleHighScoreModal() {
    setHighScoreModal(prev => !prev)
  }

  function reloadGame() {
    window.location.reload()
  }

  return (
    <div className="App">
      <Image 
        src={image}
      />
      {startGameModal &&
        <StartGameModal
          highScores={highScores}
          hideModal={toggleStartGameModal}
        />
      }
      {!startGameModal && <div className="info">
        <div
          className={correctAnswer ? "status-box correct": "status-box"}
          style={{ backgroundColor: allFound && 'rgba(31, 222, 53, 0.5)' }}
        >
          {startTimer ? 
            <div className="timer-elements">
              <Timer
                endTimer={allFound}
                setFinalTime={setFinalTime}
                maxTime={highScores[2].time}
              />
              {finalTime !== 1000 && 
                <>
                <button
                  className="button submit-score-button"
                  style={{display: finalTime < highScores[2].time ? 'block' : 'none' }}
                  onClick={toggleHighScoreModal}
                >
                  {highScoreModal ? "cancel" : "submit high score"}</button>
                <button
                  className="button play-again-button"
                  onClick={reloadGame}
                >
                  play again
                </button>
                </>
              }
            </div>
            : 
            <h1 className="status-title">click to start</h1>
          }
          {/* <button className="button next-pic-button" onClick={getNext}>next picture</button> */}
        </div>
      </div>
      }

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
          <option value="snake">snake</option>
          <option value="spider">spider</option>
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
