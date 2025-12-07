import React, { useEffect } from 'react';
import Loading from '../components/Loading';
import { useAuth } from '../hooks/useAuth';


const LogoutPage = () => {
    const { logOut } = useAuth()
    useEffect(()=>{
        logOut()
    })
    return (
        <div>
            <Loading message="Logging out....." />
        </div>
    );
};

export default LogoutPage;