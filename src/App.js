import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { getImages } from './components/firebaseConnect'

function App() {

  let myRef = useRef(null)

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

  const [imageData, setImageData] = useState([])
  const [foundAnimals, setFoundAnimals] = useState({"rabbit": false, "snake": false, "spider": false})
  const [wrongAnswer, setWrongAnswer] = useState(false)

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

  useEffect(() => {
    getImages().then((res) => {
      setImageData(res)
      initializeImage(res)
    })
    window.addEventListener('resize', handleResize)
  }, [])



  function findClickLocation(event) {
    if(null !== myRef.current) {
      if(imgWidth === 0 && imgHeight === 0) {
        setImgWidth(myRef.current.clientWidth)
        setImgHeight(myRef.current.clientHeight)
      }
      let boxStartX = Number(((event.clientX-event.currentTarget.getBoundingClientRect().left)/myRef.current.clientWidth).toFixed(2))
      let boxEndX = Number((((event.clientX-event.currentTarget.getBoundingClientRect().left)+50)/myRef.current.clientWidth).toFixed(2))
      let boxStartY = Number(((event.clientY-event.currentTarget.getBoundingClientRect().top)/myRef.current.clientHeight).toFixed(2))
      let boxEndY = Number((((event.clientY-event.currentTarget.getBoundingClientRect().top)+50)/myRef.current.clientHeight).toFixed(2))

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

  useEffect(() => {
    setTimeout(()=>{
      setWrongAnswer(false)
    }, 2000)
  }, [wrongAnswer])

  function checkFunction(event) {
    // console.log(found)
    if(found) {
      if (event.target.value === animal) {
        setFoundAnimals(prev => ({...prev, [event.target.value]: true}))
      }
    }
    else {
      setWrongAnswer(true)
    }
    setSelect("select")
  }

  function getNext() {
    if(null !== imageData) {
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

  return (
    <div className="App" style={{width: '100vw'}}>
      <img
        className="animal-image"
        ref={myRef}
        src={image}
        alt="white square with black dot in center"
        onClick={(e) => findClickLocation(e)}
      />      
      <div className="status-box">
        <h1 className="status-title">Hidden Animals</h1>
        <div className="animal-targets">
        <div className={foundAnimals["rabbit"] ? "found" : ""}>
            <input type="checkbox" id="animal1" name="animal1" value="Rabbit" checked={foundAnimals["rabbit"]} disabled/>
            <label htmlFor="animal1">rabbit (picture 1)</label>
          </div>
          <div className={foundAnimals["snake"] ? "found" : ""}>
            <input type="checkbox" id="animal2" name="animal2" value="Snake" checked={foundAnimals["snake"]} disabled/>
            <label htmlFor="animal2">snake (picture 2)</label>
          </div>
          <div className={foundAnimals["spider"] ? "found" : ""}>
            <input type="checkbox" id="animal3" name="animal3" value="Spider" checked={foundAnimals["spider"]} disabled/>
            <label htmlFor="animal3">spider (picture 3)</label>
          </div>
        </div>
        <button className="next-pic-button" onClick={getNext}>next picture</button>
      </div>
      {null !== myRef.current && <div className="target-box" 
        style={{
          left: clickLocation[0]*imgWidth+marginLeft,
          top: clickLocation[1]*imgHeight,
        }}
      >
        <select
          className={wrongAnswer ? "wrong decorated" : "decorated"}
          id="animals"
          name="animals"
          onChange={(e) => checkFunction(e)}
          size={4}
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
