import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/Home'
import LoginPage from './components/pages/Login'
import SignupPage from './components/pages/Signup'
import { useAuth } from './providers/Auth'
import UserProfilePage from './components/pages/Profile'
import UnAuthLayout from './components/pages/Layouts/UnAuth'

const PageRoutes = () => {
    const auth = useAuth();
    return (
        <Routes>
            {!auth.user &&
                <Route path="/" element={<UnAuthLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Route>}
            {auth.user && <><Route index element={<UserProfilePage />} />
            </>}
        </Routes>
    )
}

export default PageRoutes