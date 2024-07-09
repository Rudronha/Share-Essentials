import React, { useState } from 'react';
import axios from '../../../axiosConfig';
import styles from './StepTwo.module.css';
import { Link } from 'react-router-dom';

const StepTwo = ({ formData, onNext, onBack }) => {
  const [otp, setOTP] = useState('');

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/verify-email', { email: formData.email, otp: otp });
      console.log(response.data);
      if (response.data.success) {
        onNext({emailVerified: true});
      }
    } catch (error) {
      console.error('Error verifying email:', error);
    }
  };
  const reSendEmail = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('/send-email', { email: formData.email });
    }
    catch (error) {
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
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          required
        />
      </div>
      <button className={styles.btnBack} onClick={onBack}>Back</button>
      <button className={styles.btnBack} onClick={reSendEmail}>Resend</button>
      <button type="submit" className={styles.btn}>Verify</button>
    </form>
  );
};

export default StepTwo;
