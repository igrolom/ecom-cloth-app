import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBxQO7RLrHDi4WhmepD2ydKW25rSlhURtg',
  authDomain: 'crwn-db-feb41.firebaseapp.com',
  projectId: 'crwn-db-feb41',
  storageBucket: 'crwn-db-feb41.appspot.com',
  messagingSenderId: '452133175976',
  appId: '1:452133175976:web:14add5581e58cd2667789d',
  measurementId: 'G-JCDPGT6Q9X',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); // gives access to new google auth provider class
provider.setCustomParameters({ prompt: 'select_account' }); //Always trigger google popup
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
