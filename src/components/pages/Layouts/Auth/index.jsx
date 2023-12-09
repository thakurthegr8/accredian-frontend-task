import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthNavbar from '../../../sections/general/Navbar/Auth'
import { Container } from '@mui/material'

const AuthLayout = () => {
    return (
        <>
            <AuthNavbar />
            <Outlet />
        </>
    )
}

export default AuthLayout;