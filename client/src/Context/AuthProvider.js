import {
    createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import app from './../firebase/firebase.config';
export const AuthContext = createContext();
const auth =getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);

    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const logIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    };

    ///
    const googleLogin= ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

     const logOut = () => {
       setLoading(true);
       return signOut(auth);
     };
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            setLoading(false);

        })
        return()=>unsubscribe();
    },[])

    const authInfo = {
      user,
      createUser,
      updateUser,
      logIn,
      googleLogin,
      logOut,
      loading,
    };

    
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;