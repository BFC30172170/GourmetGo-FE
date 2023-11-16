import React, { useEffect, useState, useContext, createContext } from 'react';

const authContext = createContext();

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(localStorage.user || null);
    const [username, setUsername] = useState(localStorage.username || null);

    const login = async (username,password) => {
        console.log('here')
        //const res = await fetch (`login endpoint`);
        const res = {username:'Test User',jwt:'48e823jr823mdj2'}

        setUser(res.jwt)
        setUsername(res.username)
        localStorage.setItem('user',res.jwt)
        localStorage.setItem('username',res.username)
        return {user,username};
    }

    const logout = async () => {
        setUser(null)
        setUsername(null)
        localStorage.removeItem('user')
        localStorage.removeItem('username')
    }

    return {
        user,
        username,
        login,
        logout
    }
};