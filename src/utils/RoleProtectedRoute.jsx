import { useContext } from "react";
import { UserContext } from "../context/userContext"
import { Navigate } from 'react-router-dom';

const RoleProtectedRoute = ({ role, children }) => {
    const { userData } = useContext(UserContext);

    if (role == userData?.role.toString()) {
        return children
    }

    // return <Navigate to={"/"}/>
}

export default RoleProtectedRoute
