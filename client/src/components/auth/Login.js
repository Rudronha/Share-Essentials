import React, { useState } from 'react';
import styles from './Login.css';
import backgroundImage from '../../image/joe-woods.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in:', { email, password });
  };

  return (
      <div className={styles.homeContainer} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className={styles.loginContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Login</h2>
            <div className={styles.inputGroup}>
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
            <div className={styles.inputGroup}>
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
            <button type="submit" className={styles.btn}>Login</button>
          </form>
        </div>
      </div>
    );
  };

export default Login;
