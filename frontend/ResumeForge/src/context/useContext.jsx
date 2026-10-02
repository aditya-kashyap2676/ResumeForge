import { createContext, useState, useEffect } from "react";
import axiosInstance from "../Utils/axiosinstance";
import { API_PATHS } from "../Utils/apipaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(() => Boolean(localStorage.getItem("token")));

    useEffect(() => {
        if (user) return;

        const accessToken = localStorage.getItem("token");

        if (!accessToken) return;

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, {
                    timeout: 60000,
                });
                setUser(response.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    setUser(null);
                    localStorage.removeItem("token");
                } else {
                    console.error("Failed to load user profile", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);

    const updateUser = (userData) => {
        setUser(userData);

        if (userData?.token) {
            localStorage.setItem("token", userData.token);
        }

        setLoading(false);
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;