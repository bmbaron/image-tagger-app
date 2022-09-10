import React, { useState, useRef, useEffect, memo } from 'react';
import './App.css';
import { getImages, getHighScores } from './components/firebaseConnect'
import placeholder from './components/loading-image.png'
import Timer from './components/Timer'

function App() {

  let myRef = useRef(null)

  const [isLoading, setIsLoading] = useState(true)
  const [startTimer, setStartTimer] = useState(false)
  const [finalTime, setFinalTime] = useState(0.0)

  const [imageData, setImageData] = useState([])

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

  useEffect(() => {
    getImages().then((res) => {
      setImageData(res)
      initializeImage(res)
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
    if(null !== myRef.current) {
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
      setIsLoading(true)
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

  const Image = memo(function Image({ src, ref, onClick }) {
    return <img src={src} ref={myRef} onLoad={() => setIsLoading(false)} onClick={(e) => findClickLocation(e)} alt="animal" className="animal-image" />;
  });

  return (
    <div className="App">
      <img
        className="placeholder"
        alt="placeholder"
        src={placeholder}
        style={{ display: isLoading ? "block" : "none" }}
      />
      <Image 
        src={image}
        style={{display: isLoading ? "none" : "block"}}
      />
      <div className="info">
        <div
          className={correctAnswer ? "status-box correct": "status-box"}
          style={{ backgroundColor: allFound && 'rgba(31, 222, 53, 0.5)' }}
        >
          {startTimer ? <Timer endTimer={allFound} setFinalTime = {setFinalTime} /> : <h1 className="status-title">Hidden Animals</h1>}
          <div className="animal-targets">
          <div className={foundAnimals["rabbit"] ? "found" : ""}>
              <input type="checkbox" id="animal1" name="animal1" value="Rabbit" checked={foundAnimals["rabbit"]} disabled/>
              <label htmlFor="animal1">picture 1</label>
            </div>
            <div className={foundAnimals["snake"] ? "found" : ""}>
              <input type="checkbox" id="animal2" name="animal2" value="Snake" checked={foundAnimals["snake"]} disabled/>
              <label htmlFor="animal2">picture 2</label>
            </div>
            <div className={foundAnimals["spider"] ? "found" : ""}>
              <input type="checkbox" id="animal3" name="animal3" value="Spider" checked={foundAnimals["spider"]} disabled/>
              <label htmlFor="animal3">picture 3</label>
            </div>
          </div>
          <button className="next-pic-button" onClick={getNext}>next picture</button>
        </div>
        <h1 className="instructions">{allFound ? "Finished in " + finalTime + " seconds": "Each picture has 1 animal. Tag their heads."}</h1>
      </div>

      {null !== myRef.current && <div className={wrongAnswer ? "target-box wrong" : "target-box"} 
        //don't show when loading image, position in middle of screen when image loads, position at user's click after 
        style={{
          display: isLoading ? 'none' : 'block',
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
    </div>
  );
}

export default App;
