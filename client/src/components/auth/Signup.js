import React, { useState } from 'react';
import StepOne from './signup/StepOne';
import StepTwo from './signup/StepTwo';
import StepThree from './signup/StepThree';
import StepFour from './signup/StepFour';
import StepFive from './signup/StepFive';
import'./Signup.css';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

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
    password: ''
  });
  const navigate = useNavigate();

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
      console.log(data);
      const response = await axios.post('/users/register', data);
      //console.log(response.data);
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
      <div className="signupContainer">
        {step === 1 && <StepOne onNext={handleNextStep} />}
        {step === 2 && <StepTwo formData={formData} onNext={handleNextStep} onBack={handlePreviousStep} />}
        {step === 3 && <StepThree formData={formData} onNext={handleNextStep} onBack={handlePreviousStep} />}
        {step === 4 && <StepFour formData={formData} onNext={handleNextStep} onBack={handlePreviousStep} />}
        {step === 5 && <StepFive formData={formData} onSubmit={handleSubmit} onBack={handlePreviousStep} />}
      </div>
  );
};

export default Signup;
