import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './../Config/firebaseConfig';

const GoogleAuthContext = React.createContext();
export const useGoogleAuth = () => {
  return useContext(GoogleAuthContext);
};

const GoogleAuthenticationProvider = ({ children }) => {
  const naviagte = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const gAuthProvider = new GoogleAuthProvider();

  const googleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithPopup(auth, gAuthProvider);
      naviagte('/');
    } catch {
      setError('Failed To SignIn');
    }
  };

  const googleSignOut = async () => {
    try {
      setError('');
      setLoading(true);
      await signOut(auth);
      setCurrentUser(null);
    } catch {
      setError('Failed To SignOut');
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    googleSignIn,
    googleSignOut,
    error,
    loading,
  };
  return (
    <GoogleAuthContext.Provider value={value}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export default GoogleAuthenticationProvider;
