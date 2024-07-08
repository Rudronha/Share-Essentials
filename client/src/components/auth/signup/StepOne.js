import React, { useState } from 'react';
import styles from './StepOne.module.css';

const StepOne = ({ onNext }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ username, email });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Signup</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.btn}>Next</button>
    </form>
  );
};

export default StepOne;
