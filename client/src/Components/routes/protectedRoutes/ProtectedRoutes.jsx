import React from 'react'
import { useSelector } from 'react-redux'

import { selectLoggedInUser } from '../../../features/auth/authSlice'
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../../navBar/NavBar';

const ProtectedRoutes = () => {
    const user = useSelector(selectLoggedInUser)
    console.log(user.token);
    // 
    // 
    console.log(user);

    if(user.token === "" || user.token === undefined ){
        return <Navigate to='/login'/>
    }
    
    return (
        <>
            <NavBar />
            <Outlet />
        </>
      );
}

export default ProtectedRoutes


  