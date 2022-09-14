
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
	getDocs,
	addDoc
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

export async function getImageData() {
	const imageData = []

	console.log("getting firebase image data")
	const articlesRef = collection(db, "images")
	const querySnapshot = await getDocs(articlesRef)
		
	let counter = 0;

	querySnapshot.forEach((doc) => { 
		imageData[counter] = {
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

export async function addHighScore(name, finalTime) {
	if(name && finalTime) {
		const testRef = collection(db, 'highscores');
		addDoc(testRef, {
			"name": name,
			"time": finalTime,
		})
		.then(() => {
			window.location.reload();
		})
		.catch((error) => console.log("fail: " + error))
	}
}

