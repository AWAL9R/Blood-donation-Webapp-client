import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Loading from './Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    // const [user, loading]=useAuth();
    // if(loading){
    //     return <Loading></Loading>
    // }
    // if(user==null){
    //     return <Navigate to='/login'></Navigate>
    // }
    // return children

    const {loading, user}=useAuth();
    const location=useLocation()

    if(loading)  return <Loading/>
    if(user) return children;
    
   const to="/login?next="+encodeURIComponent(location.pathname)
    return <Navigate to={to}/>
};

export default PrivateRoute;