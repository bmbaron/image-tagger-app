// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export async function getPhotoData() {
	return [
    // {
    //   "img": bunny,
    //   "animal": "bunny",
    //   "coords": [0.26,0.28]
    // },
    // {
    //   "img": snake,
    //   "animal": "snake",
    //   "coords": [0.79,0.74]
    // },
    // {
    //   "img": spider,
    //   "animal": "spider",
    //   "coords": [0.16,0.74]
    // },
  ]
}