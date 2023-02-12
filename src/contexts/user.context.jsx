import { createContext, useState, useEffect } from 'react';

import {
  onAuthStateChangedAuthUser,
  createUserProfileDocument,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedAuthUser((user) => {
      if (user) {
        createUserProfileDocument(user);
      }
      setCurrentUser(user);
    });
  
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};