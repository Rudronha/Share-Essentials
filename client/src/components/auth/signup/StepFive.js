import React, { useState } from 'react';
import styles from './StepFive.module.css';
import { Link } from 'react-router-dom';

const StepFive = ({ formData, onSubmit, onBack }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Create Password</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          id="npassword"
          required
          minLength="6"
        />
      </div>
      <Link type=" " className={styles.linkBack} onClick={onBack}>Back</Link>
      <button type="submit" className={styles.btn}>Signup</button>
    </form>
  );
};

export default StepFive;
