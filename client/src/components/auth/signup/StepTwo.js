import React, { useState } from 'react';
import axios from '../../../axiosConfig';
import styles from './StepTwo.module.css';
import { Link } from 'react-router-dom';

const StepTwo = ({ formData, onNext, onBack }) => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.post('/verify-email', { email: formData.email, code: verificationCode });
      //if (response.data.success) {
        onNext({ emailVerified: true });
      //}
    } catch (error) {
      console.error('Error verifying email:', error);
    }
  };

  return (
    <form onSubmit={handleVerifyEmail} className={styles.form}>
      <h2>Email Verification</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="verificationCode">Verification Code</label>
        <input
          type="text"
          id="verificationCode"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
      </div>
      <Link className={styles.linkBack} onClick={onBack}>Resend</Link>
      <Link className={styles.linkBack} onClick={onBack}>Back</Link>
      <button type="submit" className={styles.btn}>Verify</button>
    </form>
  );
};

export default StepTwo;
