import React, { createContext, useContext, useEffect, useState } from 'react'
import { CircularProgress, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import UserService from '../../services/user';
import VerifyEmailBlock from '../../components/blocks/general/VerifyEmail';


const AuthContext = createContext(
    {
        user: null,
        signInWithCredentialsHandler: (email, password) => null,
        signInWithCredentialsHandlerAttr: { loading: false },
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
    const [signInWithCredentialsHandlerAttr, setSignInWithCredentialsHandlerAttr] = useState({
        loading: false,
    })
    const router = useNavigate();
    const [customError, setCustomError] = useState({ message: "" })

    const signInWithCredentialsHandler = async (email, password) => {

        try {
            setSignInWithCredentialsHandlerAttr(prev => ({ ...prev, loading: true }));
            const response = await AuthService.post("/signin", { email, password });
            const data = await response.data;
            if (!data.verified) {
                await AuthService.post("/send-verification", {
                    email: data.email,
                    first_name: data.first_name
                })
            }
            setUser(data);
            setCookie("access_token", data.access_token);
            setSignInWithCredentialsHandlerAttr(prev => ({ ...prev, loading: false }));
            router("/");
        } catch (error) {
            const { response } = error
            if (response?.data?.message)
                toast(response.data.message, { type: "error" });
            setSignInWithCredentialsHandlerAttr(prev => ({ ...prev, loading: false }));
        }
    }
    const signOutHandler = async () => {
        setCookie("access_token", null, { expires: new Date(1970, 1, 1, 0, 0, 0) });
        setUser(null);
    }
    useEffect(() => {
        const authStateChangeHandler = async () => {
            const accessToken = cookies.access_token;
            if (!accessToken) return;
            setLoading(true);
            try {
                const response = await UserService.post("/me", {}, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                const data = await response.data;
                if (!data.verified) {
                    await AuthService.post("/send-verification", {
                        email: data.email,
                        first_name: data.first_name
                    })
                    return;
                }
                setUser(data);
            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);
            }
        }
        authStateChangeHandler();
    }, [])
    if (loading) {
        return <Stack width="100vw" height="100vh" alignItems="center" justifyContent="center"> <CircularProgress /></Stack>
    }
    if (user && !user.verified) return <VerifyEmailBlock />
    return (
        <AuthContext.Provider value={{ user, setUser, signInWithCredentialsHandler, signInWithCredentialsHandlerAttr, signOutHandler, loading, setLoading, error, setError, customError }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;