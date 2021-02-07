import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDcjcJfjmDlZAZh1NHKlVOVjYpO9brM40k",
  authDomain: "netflix-clone-b215b.firebaseapp.com",
  projectId: "netflix-clone-b215b",
  storageBucket: "netflix-clone-b215b.appspot.com",
  messagingSenderId: "497660754342",
  appId: "1:497660754342:web:21a9ff59280cd4763f7767",
  measurementId: "G-FZPBWD6H3R",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { auth }
export default db
