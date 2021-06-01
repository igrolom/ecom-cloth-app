import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

// GET DOCUMENTS and COLLECTIONS
firestore
  .collection('users')
  .doc('bonY097s3DbFHwT46THt')
  .collection('cartItems')
  .doc('7soXWh39oyOxOMsVj06N');
firestore.doc('/users/bonY097s3DbFHwT46THt/cartItems/7soXWh39oyOxOMsVj06N');
firestore.collection('/users/bonY097s3DbFHwT46THt/cartItems');
