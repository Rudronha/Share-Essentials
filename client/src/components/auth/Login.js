import React, { useContext, useState } from 'react';
import './Login.css';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle login logic here
    try{
      const response = await axios.post('/users/login',{email:email,password:password},{ withCredentials: true });
      const user = { 
        userId: response.data.userId, 
        username: response.data.username
       };
      console.log({ "message":response.data.message });
      //localStorage.setItem('user');
      updateUser(user);
      toast.success('Login Successfully!');
      navigate('/home');
    }catch(error){
      console.error('Error Login:', error);
    }
  };

  return (
        <div className="loginContainer">
          <form onSubmit={handleSubmit} className="form">
            <h2>Login</h2>
            <div className="inputGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">Login</button>
          </form>
        </div>
    );
  };

export default Login;
