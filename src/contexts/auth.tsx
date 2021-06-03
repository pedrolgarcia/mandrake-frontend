import React, { createContext, useEffect, useState } from 'react';
import Router from 'next/router';
import { setCookie } from 'nookies';

import { api } from '@services/api';
import REMOTE from '@services/endpoints';

interface User {
    email: string;
    formatted_name: string;
    picture: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    signIn(username: string, password: string): Promise<void>;
    signOut(): void;
    updateMe(): void;
    updateToken(token: string): void;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // const loadStoragedData = async () => {
        //     const storagedUser = Cookies.get('user');
        //     const storagedToken = Cookies.get('token');

        //     console.log(storagedToken)

        //     if (storagedToken) {
        //         api.defaults.headers.Authorization = `JWT ${storagedToken}`;
        //         setToken(String(storagedToken));
        //     }
        //     if(storagedUser) {
        //         setUser(JSON.parse(storagedUser));
        //     }
        // };

        // loadStoragedData();
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const response = await api.post(REMOTE.SIGN_IN, { username, password });

            if(response.data?.token) {
                api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

                setToken(response.data?.token);
                setCookie(undefined, 'mandrake.token', response.data?.token, {
                    maxAge: 60 * 60 * 1 // 1 hour
                });

                Router.push('/')
            }
        } catch(e) {
            throw new Error(e.response?.data?.error);            
        }
    };

    const signOut = async () => {
        // await AsyncStorage.removeItem('@FitFIND:user');
        // await AsyncStorage.removeItem('@FitFIND:token');
        // setUser(null);
        // setToken('');
        // delete api.defaults.headers.Authorization;
    };

    const updateMe = async () => {
        // if (token) {
        //     const user = await auth.me(token);
        //     if (user.data.status == '1') {
        //         if(user.data.data && user.data.data.formatted_name)
        //             user.data.data.formatted_name = formatName(user.data.data.formatted_name);
                    
        //         setUser(user.data.data);

                // await AsyncStorage.multiSet([
                //     ['@FitFIND:user', JSON.stringify(user.data.data)],
                //     ['@FitFIND:group', user.data?.data?.last_group_name],
                // ]);
            // }
        // }
    };

    const updateToken = async (token: string) => {
        setToken(token);
        // await Cookies.setItem('@FitFIND:token', token);
        // api.defaults.headers.Authorization = `JWT ${token}`;
    };

    return <AuthContext.Provider value={{ signed: !!token, user, signIn, signOut, updateMe, updateToken }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
