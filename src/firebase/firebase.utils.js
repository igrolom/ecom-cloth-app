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

// USER AUTH OBJECT FROM DB - async |userAuth - from AUTH library, that we are logging from  this.setState({ currentUser: user });
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  console.log(userRef);
  const snapShot = await userRef.get();
  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log('error creating user: ', err);
    }
    console.log(snapShot);
  }
  return userRef;
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); // gives access to new google auth provider class
provider.setCustomParameters({ prompt: 'select_account' }); //Always trigger google popup
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
