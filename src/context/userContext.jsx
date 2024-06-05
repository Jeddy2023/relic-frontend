import React, { useState, createContext, useEffect, useContext } from "react";
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from "react-router-dom";

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
        const { accessToken, user, expiresIn } = data;
        setUserData(user);
        setAccessToken(accessToken);
        const expirationDate = new Date(new Date().getTime() + expiresIn);
        Cookies.set('accessToken', accessToken, { expires: expirationDate });
        Cookies.set('userData', JSON.stringify(user), { expires: expirationDate });
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
