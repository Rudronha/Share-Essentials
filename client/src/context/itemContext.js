import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../axiosConfig';
import { UserContext } from './userContext';
// Create a Context
const ItemContext = createContext();

const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const { user } = useContext(UserContext);

    // Function to fetch items
    const fetchItems = async()=>{
        try{
            if(user){
                //console.log(user.userId);
                const res = await axios.get(`users/getItem/${ user.userId }`);
                //console.log(res.data);
                setItems(res.data);
            }
        }catch(error){
            console.error('Error in fetching user Items:',error);
        } 
    };
    
    // Function to update items
    const updateItems = async(fromData) => {
        //setItems([...items,formData]);
        console.log(fromData);
        try{
            const res =await axios.post('users/product/add', fromData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            setItems([...items,res.data]); 
        } catch(error) {
            console.error('Error:', error);
        }
    }

    // Function to clear items
    const clearIems = () => {
        
    };
    
    useEffect(() => {
        fetchItems();   
    }, [user]);
    
    return (
        <ItemContext.Provider value={{ items, updateItems, clearIems }}>
            {children}
        </ItemContext.Provider>
    );
};

export { ItemContext, ItemProvider };
