import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../axiosConfig';
import { UserContext } from './userContext';
// Create a Context
const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [allproducts, setProducts] = useState([]);
    const {user} = useContext(UserContext);
    //console.log(allproducts);
    // Function to fetch items
    const fetchItems = async()=>{
        try{
            //console.log(user.userId);
            const res = await axios.get(`products/all`);
            //console.log(res.data);
            setProducts(res.data);
        }catch(error){
            console.error('Error in fetching user Items:',error);
        } 
    };
    
    // Function to update items
    // const updateItems = async(fromData) => {
    //     //setItems([...items,formData]);
    //     console.log(fromData);
    //     try{
    //         const res =await axios.post('users/product/add', fromData,{
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         console.log(res.data);
    //         setItems([...items,res.data]); 
    //     } catch(error) {
    //         console.error('Error:', error);
    //     }
    // }
    
    useEffect(() => {
        fetchItems();   
    }, [user]);
    
    return (
        <ProductContext.Provider value={{ allproducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext, ProductProvider };
