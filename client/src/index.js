import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import { UserProvider } from './context/userContext';
import { UserDataProvider } from './context/userDataContext';
import { ItemProvider } from './context/itemContext';
import { ProductProvider } from './context/productContext';
import { FavoriteProvider } from './context/favoriteContext';
import { CartProvider } from './context/cartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <UserDataProvider>
        <ItemProvider>
          <ProductProvider>
            <FavoriteProvider>
              <CartProvider>
                  <App />
                <ToastContainer/>
              </CartProvider>
            </FavoriteProvider>
          </ProductProvider>
        </ItemProvider>
      </UserDataProvider>
    </UserProvider>
  </React.StrictMode>
);

