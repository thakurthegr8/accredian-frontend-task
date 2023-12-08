import React, { createContext, useContext, useState } from 'react'
import { CircularProgress, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth';
import { useCookies } from 'react-cookie';

const AuthContext = createContext(
    {
        user: null,
        signInWithCredentialsHandler: (email, password) => null,
        signOutHandler: () => null,
        loading: false,
        error: null,
        customError: { message: "" }
    });

export const useAuth = () => useContext(AuthContext)

const AuthProvider = (props) => {
    const [cookies, setCookie] = useCookies(['access_token']);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useNavigate();
    const [customError, setCustomError] = useState({ message: "" })

    const signInWithCredentialsHandler = async (email, password) => {
        try {
            const response = await AuthService.post("/signin", { email, password });
            const data = await response.data;
            setUser(data);
            setCookie("access_token", data.access_token);
            router("/");
        } catch (error) {
            // if (error instanceof Error)
            //     setCustomError({ message: mapErrorMessage(error.message) })
        }
    }
    const signOutHandler = async () => {
        // await signOutLocal().then(res => router("/"));
    }
    if (loading) {
        return <Stack width="100vw" height="100vh" alignItems="center" justifyContent="center"> <CircularProgress /></Stack>
    }
    // if (user && !user.emailVerified) return <VerifyEmailBlock />
    return (
        <AuthContext.Provider value={{ user, signInWithCredentialsHandler, signOutHandler, loading, error, customError }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;