import React from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie';

import { selectLoggedInUser } from '../../../features/auth/authSlice'
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../../navBar/NavBar';

const ProtectedRoutes = () => {
    const user = useSelector(selectLoggedInUser)
    console.log(user);
    // const token = response.data.token;
    // Cookies.set("token", token);
    console.log(user);

    if(!user ){
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


  