// We are writing logic in here, to protect our frontend application from this 
// external service, firebase in this case, that is subject to change.
// We define how it is that this service will interface with our frontend app
// by adding this utils file as a later between the frontend code and this additional firebase library


// initializeApp creates an app instance for you, based off of some kind of config.
// this config is an object that allows us to to attach the firebase/app to the one we have made online
import { initializeApp } from 'firebase/app';

// install our authentication. Using these to create our google sign in.
import { 
  getAuth, // to create auth instance
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';
// the email/password provider is native to firebase/auth so no need for import,
// but we do need createUserWithEmailAndPassword.

// firestore is a different service. 
// we need to instatiate our firestore instance.
import {
  setFirestore,
  doc, // retreive doc from inside firestore database
  getDoc, // access the docs DATA
  setDoc, // setting the docs DATA
  getFirestore
} from 'firebase/firestore'

// Your web app's Firebase configuration. Our own config.
const firebaseConfig = { 
  apiKey: "AIzaSyCW5XqDgMmuHl4D_D5bigU1o3YwWF1jLNw", // not super secret. 
  authDomain: "crwn-clothing-db-a122c.firebaseapp.com",
  projectId: "crwn-clothing-db-a122c", // unique identifier for instance
  storageBucket: "crwn-clothing-db-a122c.appspot.com",
  messagingSenderId: "644273913632",
  appId: "1:644273913632:web:b3a70d0c7827b4a3b26145"
};

// Initialize Firebase. identifies this SDK library that
//  extracts some of the func we need to interact with our instance of firebase. (CRUD)
const firebaseApp = initializeApp(firebaseConfig);

// to use google auth, we initialise a provider using this google auth provider.
//  we can use other providers too.
// gives you back this prov instance. GoogleAuthProvider() is essentially a class. 
const provider = new GoogleAuthProvider();

// this takes some kind of config and we can state how we want it to behave
provider.setCustomParameters({
  prompt: 'select_account' // every time someonce interacts, force them to select account.
});

// export auth, create instance
export const auth = getAuth(); 
// export out sign in with popup, pass auth and provider. 
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// firestore. create the database. equal to calling getFrestore();
// telling firebase when we wanna get a documer, set a document. we pass the database.
export const db = getFirestore();

// create a method - async function that receives some use authentication object.
// we want a function that will take the data fromt the auth service and then store it in firestore
// in this case it is the user sign-in.
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // we need to check if there's an existing document reference. 
  // doc takes 3 args.. 1-database, 2-collection 3-identifier.
  if (!userAuth) return; // protect our code. Don't run the function unless we get the values. 
  const userDocRef = doc(db, 'users', userAuth.uid);
  // if we don't have an existing doc ref, google will still generate one for us.
  console.log(userDocRef); // gives back an object that represents some doc ref in the database.
  // but we don't get a value, but we get back the uid and path to collection uid.

  const userSnapshot = await getDoc(userDocRef);  
  console.log(userSnapshot.exists()); // points to same id as above, but this is a speial object
  // on this are different ways we can ascertain whether this document exists.

  // if user data does not exist we need to to do the following:
  // create / set the document with the data from userAuth in my collection.
  // the bang (!) reverses it, so if it doesn't exist then it will return true and statement will run
  if (!userSnapshot.exists()) {
    // create creds and a date object.
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // try catch block. 'i want you to try something aysncronously,
    // and if it fails then catch the error and do something with it.
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });

    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  // if user data DOES exist then it's simple:
  return userDocRef;
};

// We need an email and a password for this object.
// If we don't get either, then we don't call this method.
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  // this won't run unless we get both the above values.
  return await createUserWithEmailAndPassword(auth, email, password);
}

