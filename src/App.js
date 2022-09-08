import React, { useState, useRef, useEffect } from 'react';
import './App.css';
// import { getPhotoData } from './components/firebaseConnect'

import bunny from './components/hidden-bunny.png'
import snake from './components/hidden-snake.png'
import spider from './components/hidden-spider.png'

function App() {

  let myRef = useRef(null)

  const [image, setImage] = useState("")
  const [animal, setAnimal] = useState("")
  const [coords, setCoords] = useState([])
  const [imageCounter, setImageCounter] = useState(0)

  const [clickLocation, setClickLocation] = useState([0,0])
  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)

  const [found, setFound] = useState(false)
  const [select, setSelect] = useState("")

  const data = [
    {
      "img": bunny,
      "animal": "bunny",
      "coords": [0.26,0.28]
    },
    {
      "img": snake,
      "animal": "snake",
      "coords": [0.79,0.74]
    },
    {
      "img": spider,
      "animal": "spider",
      "coords": [0.16,0.74]
    },
  ]

  function initializeImage() {
    setImage(data[0].img)
    setAnimal(data[0].animal)
    setCoords(data[0].coords)
    setImageCounter(1)
  }

  
  function handleResize(data) {
    if(null !== myRef.current) {
      setImgWidth(myRef.current.clientWidth)
      setImgHeight(myRef.current.clientHeight)

      console.log("RESIZE")
      console.log(myRef.current.clientWidth)
      console.log(myRef.current.clientHeight)
    }
  }

  useEffect(() => {
    initializeImage()
    window.addEventListener('resize', handleResize)
    console.log("ran")
  }, [])



  function findClickLocation(event) {
    if(null !== myRef.current) {
      if(imgWidth === 0 && imgHeight === 0) {
        setImgWidth(myRef.current.clientWidth)
        setImgHeight(myRef.current.clientHeight)
      }
      let boxStartX = Number((event.clientX/myRef.current.clientWidth).toFixed(2))
      let boxEndX = Number(((event.clientX+50)/myRef.current.clientWidth).toFixed(2))
      let boxStartY = Number((event.clientY/myRef.current.clientHeight).toFixed(2))
      let boxEndY = Number(((event.clientY+50)/myRef.current.clientHeight).toFixed(2))

      setClickLocation([boxStartX, boxStartY])

      console.log(boxStartX, boxStartY)
      console.log(boxEndX, boxEndY)
      console.log(coords[0], coords[1])
      console.log("__________________")



      if(boxStartX < coords[0] && coords[0] < boxEndX && boxStartY < coords[1] && coords[1] < boxEndY) {
        setFound(true)
      }
      else {
        setFound(false)
      }
    }
  }

  function checkFunction(event) {
    console.log(found)
    if(found) {
      if (event.target.value === animal) {
        alert(`you found a ${animal}`)
      }
      else {
        alert("wrong animal")
      }
      setSelect("select")
    }
    else {
      alert("you didn't find a match")
    }
  }

  function getNext() {
    if(null !== data) {
      setImage(data[imageCounter].img)
      setAnimal(data[imageCounter].animal)
      setCoords(data[imageCounter].coords)
      console.log(data[imageCounter].coords)
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
        ref={myRef}
        src={image}
        alt="white square with black dot in center"
        style={{margin: 'auto', width: 'auto', height: '100vh'}}
        onClick={(e) => findClickLocation(e)}
      />      
      <div style={{position: 'fixed', top: '0', right: '0', background: 'white'}}>
        <h1>{`${clickLocation[0]}`} <br /> {`${clickLocation[1]}`}</h1>
        <button onClick={getNext}>next picture</button>
      </div>
     
      {null !== myRef.current && <div className="dot" 
        style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          // margin: '-25px',
          background: 'red',
          left: clickLocation[0]*imgWidth,
          top: clickLocation[1]*imgHeight,
        }}
      >
        <select
          className="decorated"
          id="animals"
          name="animals"
          value={select}
          onChange={(e) => checkFunction(e)}
          size={4}
          style={{marginLeft: '4px'}}
        >
          <option value="select">select</option>
          <option value="bunny">bunny</option>
          <option value="snake">snake</option>
          <option value="spider">spider</option>
        </select>
      </div>}
    </div>
  );
}

export default App;
