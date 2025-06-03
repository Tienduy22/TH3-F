import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
    const [auth, setAuth] = useState(null); 

    useEffect(() => {
        axios
            .get("http://localhost:8081/api/user/check-auth", {
                withCredentials: true,
            })
            .then(() => setAuth(true))
            .catch(() => setAuth(false));
    }, []);

    if (auth === null) {
        return <div>Loading...</div>; 
    }

    if (auth === false) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
