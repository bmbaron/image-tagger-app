
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
	getDocs,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjZAohn-J3xFugwy4wFCldlJQVGj6TyGc",
  authDomain: "image-tagger-2c2fa.firebaseapp.com",
  projectId: "image-tagger-2c2fa",
  storageBucket: "image-tagger-2c2fa.appspot.com",
  messagingSenderId: "601142688113",
  appId: "1:601142688113:web:f0ac78b857720d752bded0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export async function getImages() {
	const imageData = []
  const imageUrlPrefix = 'https://firebasestorage.googleapis.com/v0/b/image-tagger-2c2fa.appspot.com/o/images%2F'
  const images = [
    imageUrlPrefix + 'hidden-bunny.png?alt=media',
    imageUrlPrefix + 'hidden-snake.png?alt=media',
    imageUrlPrefix + 'hidden-spider.png?alt=media',
  ]

	console.log("getting firebase image data")
	const articlesRef = collection(db, "images")
	const querySnapshot = await getDocs(articlesRef)
		
	let counter = 0;

	querySnapshot.forEach((doc) => { 
		imageData[counter] = {
			url: images[counter],
			animal: doc.data().animal,
			coords: doc.data().coords
		}
		counter += 1
	})

	return imageData
}

export async function getHighScores() {
	const scoreData = []

	console.log("getting firebase high scores")
	const articlesRef = collection(db, "highscores")
	const querySnapshot = await getDocs(articlesRef)
		
	let counter = 0;

	querySnapshot.forEach((doc) => { 
		scoreData[counter] = doc.data()
		counter += 1
	})
  //sort the results from fastest to slowest times
  const sortedScores = scoreData.sort((a,b) => {
    return (a.time  - b.time)
  })
  //only return top fastest times
  const top3scores = sortedScores.slice(0, 3)

  return top3scores
}
