import React from 'react'
import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../../navBar/NavBar';
import Footer from '../../footer/Footer';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../../features/auth/authSlice';

const ProtectedRoutes = () => {
    
    // const token = Cookies.get("token")
    const user = useSelector(selectLoggedInUser)
    console.log(user.Data === undefined);
    if (user.Data === undefined) {
        return <Navigate to="/login" />;
      }
    
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
      );
}

export default ProtectedRoutes


  