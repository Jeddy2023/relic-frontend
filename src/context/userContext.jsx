import React, { useState, createContext, useEffect, useContext } from "react";
import Cookies from 'js-cookie';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const userDataFromCookie = Cookies.get('userData');
        const accessTokenFromCookie = Cookies.get('accessToken');
        if (userDataFromCookie && accessTokenFromCookie) {
            setUserData(JSON.parse(userDataFromCookie));
            setAccessToken(accessTokenFromCookie);
        }
    }, []);

    const login = (data) => {
        const { accessToken, user } = data;
        setUserData(user);
        setAccessToken(accessToken);
        Cookies.set('accessToken', accessToken, { expires: 7 });
        Cookies.set('userData', JSON.stringify(user), { expires: 7 });
    };

    const logout = () => {
        setUserData(null);
        setAccessToken(null);
        Cookies.remove('accessToken');
        Cookies.remove('userData');
    };

    return (
        <UserContext.Provider value={{ userData, accessToken, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
