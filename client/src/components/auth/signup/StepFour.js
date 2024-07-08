import React, { useEffect, useState } from 'react';
import axios from '../../../axiosConfig';
import styles from './StepFour.module.css';
import { Link } from 'react-router-dom';

const StepFour = ({ formData, onNext, onBack }) => {
  const [otp, setOtp] = useState('');
  const [mobile, setMobile] = useState('');
  const [mob,setMob] = useState(false);
  const handleSendOtp = async () => {
    setMob(true);
    try {
      await axios.post('/send-otp', { mobile: formData.mobile });
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.post('/verify-otp', { mobile: formData.mobile, otp });
      //if (response.data.success) {
        onNext({ mobileVerified: true });
      //}
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <form onSubmit={handleVerifyOtp} className={styles.form}>
      <h2>Mobile Verification</h2>
      <div className={styles.inputGroup}>
        {mob?
                <>
                    <label htmlFor="otp">OTP</label>
                    <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    />
                    <Link type='' className={styles.linkBack} >Resend</Link><br></br>
                    <Link type='' className={styles.linkBack} onClick={onBack}>Back</Link>
                    <button type="submit" className={styles.btn} onClick={handleVerifyOtp}>Verify</button>
                </>
            :
                <>
                    <label htmlFor="otp">Mobile No</label>
                    <input
                    type="text"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                />
                <Link type=" " className={styles.linkBack} onClick={onBack}>Back</Link>
                <button type="button" className={styles.btn} onClick={handleSendOtp}>Send OTP</button>
                </>
        }
      </div>
    </form>
  );
};

export default StepFour;
