import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from '../axiosConfig';
import { UserContext } from './userContext';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransaction] = useState([]);
  const [transactionsOnUserItems, setTransactionsOfUserItems] = useState([]);
  const { user } = useContext(UserContext);

  const fetchTransaction = useCallback(async () => {
    try {
      if (user) {
        const response = await axios.get(`/transactions/trans/${user.userId}`);
        const responseOnUseritem = await axios.get(`/transactions/trans/user/${user.userId}`);
        setTransaction(response.data);
        setTransactionsOfUserItems(responseOnUseritem.data);
      }
    } catch (error) {
      console.error('Failed to fetch requests', error);
    }
  }, [user]);

  const makeTransaction = async (reqdata) => {
    try {
      await axios.post('/transactions/trans', reqdata);
      fetchTransaction();
    } catch (error) {
      console.error('Failed to send request', error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [user, fetchTransaction]);

  return (
    <TransactionContext.Provider value={{ transactions, transactionsOnUserItems, makeTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
