import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../axiosConfig';
import { UserContext } from './userContext';

// Create a Context
const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { user } = useContext(UserContext);

    // Function to fetch items
    const fetchItems = async () => {
        try {
            if (user) {
                const res = await axios.get(`products/favorites/${user.userId}`);
                setFavorites(res.data);
            }
        } catch (error) {
            console.error('Error in fetching user Items:', error);
        }
    };

    // Function to update items
    const addToFavorite = async (product) => {
        //console.log("add");
        try {
            await axios.get(`products/favorites/add/${product.id}`, { withCredentials: true });
            fetchItems();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    //return favorite id
    const retFavoriteId = (productId) =>{
        let ret;
        favorites.some(fav =>{ 
            if(fav.Product.id === productId){
                //console.log(fav.id);
                ret= fav.id;
            } 
        });
        return ret;
    }

    // Function to clear items
    const removeFromFavorites = async (id) => {
       // console.log("remove");
       // console.log(id);
        try {
            await axios.get(`products/favorites/del/${id}`, { withCredentials: true });
            fetchItems();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [user]);

    // Check if a product is in the favorites list
    const isFavorite = (productId) => {
        return favorites.some(fav => fav.Product.id === productId);
    }

    return (
        <FavoriteContext.Provider value={{ favorites, addToFavorite, removeFromFavorites, isFavorite,retFavoriteId }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export { FavoriteContext, FavoriteProvider };
