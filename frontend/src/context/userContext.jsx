import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    // Function to clear user data (e.g. on logout)
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    // Function to verify token and get user data
    const verifyToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
            setUser(response.data.user);
        } catch (error) {
            console.error("Token verification failed:", error);
            // Clear invalid token
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Check for existing token on app load
    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <UserContext.Provider 
            value={{
                user,
                updateUser,
                clearUser,
                loading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;