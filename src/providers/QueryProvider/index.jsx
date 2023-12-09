import React, { createContext, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import UserService from '../../services/user';
import { useAuth } from '../Auth';

const QueryContext = createContext(null);

const QueryProvider = (props) => {
    const auth = useAuth();
    const { search } = useLocation();
    const [cookies, setCookie] = useCookies(["access_token"])
    const query = new URLSearchParams(search);
    useEffect(() => {
        const onAuthStateChanged = async () => {
            const accessToken = query.get("token");
            try {
                const response = await UserService.post("/me", {}, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                const data = await response.data;
                auth.setUser(data);
                setCookie("access_token", accessToken);
            } catch (error) {
                console.log(error);

            } finally {
                auth.setLoading(false);
            }
        }
        if (query.get("action") === "login") {
            if (query.get("token"))
                onAuthStateChanged();
        }
    }, [])
    return (
        <QueryContext.Provider value={{}}>{props.children}</QueryContext.Provider>
    )
}

export default QueryProvider