import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAKlrDtjrWnvgD81-5pxpoEtQQ15Y3xnHE',
  authDomain: 'crwn-db-2731b.firebaseapp.com',
  projectId: 'crwn-db-2731b',
  storageBucket: 'crwn-db-2731b.appspot.com',
  messagingSenderId: '73227784279',
  appId: '1:73227784279:web:2a73b5fa19f43ff3259312',
  measurementId: 'G-4BJKDCNL00',
};

initializeApp(config);
// const app = initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(firestore, collectionKey);
  const batch = writeBatch(firestore);
  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);
