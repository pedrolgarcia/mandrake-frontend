import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

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

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadStoragedData = async () => {
            const storagedUser = Cookies.get('user');
            const storagedToken = Cookies.get('token');

            console.log(storagedToken)

            if (storagedToken) {
                api.defaults.headers.Authorization = `JWT ${storagedToken}`;
                setToken(String(storagedToken));
            }
            if(storagedUser) {
                setUser(JSON.parse(storagedUser));
            }
        };

        loadStoragedData();
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const response = await api.post(REMOTE.SIGN_IN, { username, password });
            console.log(response)
            api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

            if(response.data?.token) {
                setToken(response.data?.token);
                Cookies.set('token', String(response.data?.token));
            }
        } catch(e) {
            throw new Error(e.response?.data?.error);            
        }
        // const response = await auth.signIn(username, password);
        // if (response.data.token) {
        //     setToken(response.data.token);
        //     api.defaults.headers.Authorization = `JWT ${response.data.token}`;

        //     const user = await auth.me(response.data.token);
        //     if (user.data.status == '1') {
        //         await toggleTheme(true);
                
        //         if(user.data.data && user.data.data.formatted_name)
        //             user.data.data.formatted_name = formatName(user.data.data.formatted_name);

        //         setUser(user.data.data);
        //         setGroup(user.data?.data?.last_group_name);

        //         await AsyncStorage.multiSet([
        //             ['@FitFIND:user', JSON.stringify(user.data.data)],
        //             ['@FitFIND:token', response.data.token],
        //         ]);

        //     }
        // }
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
