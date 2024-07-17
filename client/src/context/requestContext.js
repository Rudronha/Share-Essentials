import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from '../axiosConfig';
import { UserContext } from './userContext';

export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [requestsOnUserItems, setRequestsOfUserItems] = useState([]);
  const { user } = useContext(UserContext);

  const fetchRequests = useCallback(async () => {
    try {
      if (user) {
        const response = await axios.get(`/transactions/request/user/${user.userId}`);
        const responseOnUseritem = await axios.get(`/transactions/request/${user.userId}`);
        setRequests(response.data);
        setRequestsOfUserItems(responseOnUseritem.data);
      }
    } catch (error) {
      console.error('Failed to fetch requests', error);
    }
  }, [user]);

  const sendRequest = async (reqdata) => {
    try {
      await axios.post('/transactions/request/send', reqdata);
      fetchRequests();
    } catch (error) {
      console.error('Failed to send request', error);
    }
  };

  const respondToRequest = async (requestId, status) => {
    try {
      await axios.post(`/transactions/respond/${requestId}`, { status });
      fetchRequests();
    } catch (error) {
      console.error('Failed to respond to request', error);
    }
  };

  const removeRequest = async (requestId) => {
    try {
      await axios.get(`transactions/request/remove/${requestId}`);
      setRequests((prevRequests) => 
        prevRequests.filter((req) => req.id !== requestId)
      );
    } catch (error) {
      console.error('Error in deleting request:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user, fetchRequests]);

  return (
    <RequestContext.Provider value={{ requests, requestsOnUserItems, sendRequest, respondToRequest, removeRequest }}>
      {children}
    </RequestContext.Provider>
  );
};
