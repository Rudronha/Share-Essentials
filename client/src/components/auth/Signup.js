import React, { useState } from 'react';
import StepOne from './signup/StepOne';
import StepTwo from './signup/StepTwo';
import StepThree from './signup/StepThree';
import StepFour from './signup/StepFour';
import StepFive from './signup/StepFive';
import styles from './Signup.css';
import axios from 'axios';
import backgroundImage from '../../image/joe-woods.jpg';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    emailVerified: false,
    country: '',
    state: '',
    city: '',
    mobile: '',
    mobileVerified: false,
    password: ''
  });

  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (data) => {
    try {
      // Handle the final form submission
      const response = await axios.post('/signup', data);
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className={styles.homeContainer} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.signupContainer}>
        {step === 1 && <StepOne onNext={handleNextStep} />}
        {step === 2 && <StepTwo formData={formData} onNext={handleNextStep} onBack={handlePreviousStep} />}
        {step === 3 && <StepThree formData={formData} onNext={handleNextStep} onBack={handlePreviousStep} />}
        {step === 4 && <StepFour formData={formData} onNext={handleNextStep} onBack={handlePreviousStep} />}
        {step === 5 && <StepFive formData={formData} onSubmit={handleSubmit} onBack={handlePreviousStep} />}
      </div>
    </div>
  );
};

export default Signup;
