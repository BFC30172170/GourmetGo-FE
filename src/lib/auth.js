import React, { useEffect, useState, useContext, createContext } from 'react';
import useApiClient from './api';
import { useToast } from './toast';

const authContext = createContext();

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const toast = useToast();
    const [jwt, setJwt] = useState(localStorage.jwt || null);
    const [username, setUsername] = useState(localStorage.username || null);
    const [id, setId] = useState(localStorage.id || null);
    const apiClient= useApiClient();

    const login = async (email,password) => {
        //Handle the auth
        const [data,err] = await apiClient.auth.login({email,password});
        setJwt(data.token);
        localStorage.setItem('jwt',data.token);

        if(err){
            toast.addToast({ message: err.message, status: err.status })
        }

        //Handle the user
        const [data2,err2] = await apiClient.user.getByID(email);

        if(err2){
            toast.addToast({ message: err2.message, status: err2.status })
        }
        setUsername(data2.username);
        setId(data2.id);
        localStorage.setItem('username',data2.username);
        localStorage.setItem('id',data2.id);

        //return user details
        return {username,id,message:'Login Successful'};
    }

    const logout = async () => {
        setJwt(null)
        setUsername(null)
        localStorage.removeItem('jwt')
        localStorage.removeItem('username')
    }

    const register = async (email,password,confirm,firstName,lastName) => {
        try {
        // Check pass match
        if (password !== confirm){
            console.error('password mismatch');
            return 'PASSWORDS DO NOT MATCH'
        }

        // create user and set their token
        const body = {
            "id":email,
            username: firstName + " " + lastName,
            firstName,
            lastName,
            email,
            password
        }
        const res = await apiClient.auth.register(body)
        setJwt(res.token);
        localStorage.setItem('jwt',res.token);

        // no they're authenticated, get the user details and set them
        const res2 = await apiClient.user.getByID(email);

        setUsername(res2.username);
        setId(res2.id);
        localStorage.setItem('username',res2.username);
        localStorage.setItem('id',res2.id);
    } catch (error) {
            
    }
    }

    return {
        jwt,
        id,
        username,
        login,
        logout,
        register
    }
};