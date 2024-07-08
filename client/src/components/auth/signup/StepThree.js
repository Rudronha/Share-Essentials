import React, { useState } from 'react';
import styles from './StepThree.module.css';
import { Link } from 'react-router-dom';

const StepThree = ({ formData, onNext, onBack }) => {
  const [country, setCountry] = useState(formData.country);
  const [state, setState] = useState(formData.state);
  const [city, setCity] = useState(formData.city);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ country, state, city });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Enter Address Details</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <Link type='' className={styles.linkBack} onClick={onBack}>Back</Link>
      <button type="submit" className={styles.btn}>Next</button>
      
    </form>
  );
};

export default StepThree;
