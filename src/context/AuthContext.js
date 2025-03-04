// contexts/AuthContext.js
import {createContext, useState, useContext, useEffect} from 'react';
import {getUser} from "@/components/services/auth";
import { signIn, signOut, useSession } from "next-auth/react";
const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const { data: session } = useSession();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            getUser(storedToken).then((user) => {
                setUser(user.profile);
                setLoading(false);
            }).catch((error) => {
                console.error('Error fetching user:', error);
                setLoading(false);
            });
            setLoading(false);
        } else {
            if (session){
                console.log("You are logged in social auth");
                console.log(session.accessToken);
                setToken(session.accessToken);
                setUser(session.user);
                setLoading(false);
            }
            setLoading(false);
        }
    }, [session]);


    const login = (token) => {
        setToken(token);
        getUser(token).then((user) => {
            setUser(user.profile);
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching user:', error);
            setLoading(false);
        });
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('state');
    };

    return (
        <AuthContext.Provider value={{user, token, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
