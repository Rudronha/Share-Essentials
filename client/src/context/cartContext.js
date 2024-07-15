import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../axiosConfig';
import { UserContext } from './userContext';

// Create a Context
const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [carts, setCarts] = useState([]);
    const { user } = useContext(UserContext);

    // Function to fetch items
    const fetchCartItems = async () => {
        try {
            if (user) {
                const res = await axios.get(`products/cart/${user.userId}`);
                setCarts(res.data);
            }
        } catch (error) {
            console.error('Error in fetching user cart Items:', error);
        }
    };

    // Function to update items
    const addToCart = async (product) => {
        //console.log("add");
        try {
            await axios.get(`products/cart/add/${product.id}`, { withCredentials: true });
            fetchCartItems();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    //return favorite id
    const retCartId = (productId) =>{
        let ret;
        const res = carts.some(cart =>{ 
            if(cart.Product.id === productId){
                ret= cart.id;
            } 
        });
        
        return ret;
    }

    // Function to clear items
    const removeFromCart = async (id) => {
       // console.log("remove");
       // console.log(id);
        try {
            await axios.get(`products/cart/del/${id}`, { withCredentials: true });
            fetchCartItems();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    },[user]);

    // Check if a product is in the favorites list
    const isCart = (productId) => {
        return carts.some(fav => fav.Product.id === productId);
    }

    return (
        <CartContext.Provider value={{ carts, addToCart, removeFromCart, isCart,retCartId }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
