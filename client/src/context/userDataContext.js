import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../axiosConfig';
import { UserContext } from './userContext';
// Create a Context
const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
    const [userData,setUserdata] = useState('');
    const { user } = useContext(UserContext);
    //console.log(user);
    //Function to fetch user data
    const fatchUser = async()=>{
        try{
           // console.log("hello");
            if(user){
                const response = await axios.get(`/users/user/${user.userId}`);
                setUserdata(response.data);
               // console.log(response.data);
            }
            
        }catch(error){
            console.error('Error in facting user data:',error);
        }
    }
    
    
    // Function to update user data
    const updateUserData = async(updatedData) => {
       setUserdata(updatedData);
    };
    // Function to clear user data
    const clearUserData = () => {
       
    };
    

    useEffect(()=>{
        fatchUser();
    },[user]);
    
    return (
        <UserDataContext.Provider value={{ userData, updateUserData, clearUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export { UserDataContext, UserDataProvider };
