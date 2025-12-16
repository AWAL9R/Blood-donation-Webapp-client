import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase/firebase';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';
import { axiosInstance } from '../hooks/useAxiosSecure';


const googleProvider = new GoogleAuthProvider();



const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (newUser) => {
    //         setLoading(false)
    //         setUser(newUser)
    //     })

    //     return () => {
    //         unsubscribe();
    //     }
    // })




    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        async function fetchData() {
            try {
                const response = await axiosInstance.get('/me', { signal });
                //console.log(response.data);
                if (response.data.user) {
                    setUser({ ...response.data.user })
                }else{
                    setUser(null)
                }
                setLoading(false)
            } catch (error) {
                error;
                //setLoading(false)
            }
        }

        fetchData();

        // Cleanup function to abort the request when component unmounts or dependencies change
        return () => {
            controller.abort();
        };
    }, []); // Empty array for mount/unmount, add dependencies for re-fetching


    const signInWithPassword = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signUpWithPassword = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleSignin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = () => {
        setLoading(true)
        // signOut(auth)
        //     .then(() => {
        //         toast.success("Logged out", { style: { borderRadius: '10px', background: '#333', color: '#fff', }, })
        //     })
        //     .catch((error) => {
        //         // An error happened.
        //         toast.error("Error Logging out : " + error.message, { style: { borderRadius: '10px', background: '#333', color: '#fff', }, })
        //     });
        axiosInstance.get('/logout')
            .then(data => {
                if (data.data.message) {
                    toast(data.data.message)
                    setUser(null)
                } else {
                    toast("Something went wrong....")
                }
                setLoading(false)
            }).catch(err => {
                toast(err.message)
                setLoading(false)
            })
    }

    // const setUserVerified=async(currUser)=>{

    // }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, signInWithPassword, signUpWithPassword, googleSignin, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;