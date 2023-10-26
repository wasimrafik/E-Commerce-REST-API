import React from 'react'
import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../../navBar/NavBar';

const ProtectedRoutes = () => {
    
    const token = Cookies.get("token")

    if (!token) {
        return <Navigate to="/login" />;
      }
    
    return (
        <>
            <NavBar />
            <Outlet />
        </>
      );
}

export default ProtectedRoutes


  