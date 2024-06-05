import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from "../../../context/userContext";
import { useNavigate } from 'react-router-dom'

function Logout() {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        logout()
        navigate('/')
    }, []);

    return (
        <div></div>
    )
}

export default Logout