import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/userContext';
import { UserDataProvider } from './context/userDataContext';
import { ItemProvider } from './context/itemContext';
import { ProductProvider } from './context/productContext';
import { FavoriteProvider } from './context/favoriteContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <UserDataProvider>
        <ItemProvider>
          <ProductProvider>
            <FavoriteProvider>
              <App />
            </FavoriteProvider>
          </ProductProvider>
        </ItemProvider>
      </UserDataProvider>
    </UserProvider>
  </React.StrictMode>
);

