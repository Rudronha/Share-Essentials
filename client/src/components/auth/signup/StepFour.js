import React, { useEffect, useState } from 'react';
import axios from '../../../axiosConfig';
import styles from './StepFour.module.css';
import { Link } from 'react-router-dom';

const StepFour = ({ formData, onNext, onBack }) => {
  const [mobile, setMobile] = useState('');

  const handleSubmit = () => {
    onNext({mobile});
  };

  return (
    <form className={styles.form}>
      <h2>Mobile Verification</h2>
      <div className={styles.inputGroup}>
          <label htmlFor="otp">Mobile No</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <button type=" " className={styles.btnBack} onClick={onBack}>Back</button>
          <button type="button" className={styles.btn} onClick={handleSubmit}>Next</button>
      </div>
    </form>
  );
};

export default StepFour;
