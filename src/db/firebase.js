import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB83JX_KTrvZm8Shrqd4KeYhPH2vUaNa44",
  authDomain: "reinstagram-v-one.firebaseapp.com",
  databaseURL: "https://reinstagram-v-one.firebaseio.com",
  projectId: "reinstagram-v-one",
  storageBucket: "reinstagram-v-one.appspot.com",
  messagingSenderId: "542279418969",
  appId: "1:542279418969:web:84521c39ccc92570419d48",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
