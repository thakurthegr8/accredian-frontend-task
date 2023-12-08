import React from 'react'
import UnAuthNavbar from '../../../sections/general/Navbar/UnAuth'
import { Outlet } from 'react-router-dom'

const UnAuthLayout = () => {
    return (
        <>
            <UnAuthNavbar />
            <Outlet />
        </>
    )
}

export default UnAuthLayout