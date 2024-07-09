import React, { createContext, useState, useEffect } from 'react';
import axios from '../axiosConfig';
// Create a Context
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [userData,setUserdata] = useState('');
    useEffect(() => {
        // Check if user data is stored in localStorage
        //console.log("hello");
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
               // console.log('Parsed User:', parsedUser); // Debugging
                setUser(parsedUser);
                
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                localStorage.removeItem('user'); // Remove invalid data
            }
        }
        
    }, []);
    
    // Function to update user data
    const updateUser = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
        setUser(userData);
    };

    // Function to clear user data
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('user');
    };
    //console.log(user.userId);
    
    
    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
