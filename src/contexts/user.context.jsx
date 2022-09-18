// this is essentially just a glorified component that leverages useState!@

import { createContext, useState, useEffect } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth
} from '../utils/firebase/firebase.utils'

// The actual value: the context value we want to access.
// UserContext uses createContext hook to make an object with key values initialised at null.
export const UserContext = createContext({
  setCurrentUser: () => null, //    blank function
  currentUser: null,
});

// The provider: allows any of its child components to access the values inside of its useState.  
// We wrap the {children} inside .Provider, which is a component supplied by react.
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // instatiate this value as an object. 
  const value = { currentUser, setCurrentUser };
  // we want to call the setter and get the currentUser value anywhere inside the component tree
  // so we set the value of UserContext.Provider to {value}

  useEffect(() => {
    // make authStateChangeListener stop listening by using useEffect's side effect.
    // onAuthStateChangeListener mounts, it will check the authentication state automatically
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe; // we want to unsubscribe whenever it unmounts.
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

