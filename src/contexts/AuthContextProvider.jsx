import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../firebase/firebase';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';


const googleProvider = new GoogleAuthProvider();



const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (newUser) => {
            setLoading(false)
            setUser(newUser)
        })

        return () => {
            unsubscribe();
        }
    })

    const signInWithPassword = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signUpWithPassword = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleSignin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = () => {
        setLoading(true)
        signOut(auth)
            .then(() => {
                toast.success("Logged out", { style: { borderRadius: '10px', background: '#333', color: '#fff', }, })
            })
            .catch((error) => {
                // An error happened.
               toast.error("Error Logging out : "+error.message, { style: { borderRadius: '10px', background: '#333', color: '#fff', }, })
            });
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, signInWithPassword, signUpWithPassword, googleSignin, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;