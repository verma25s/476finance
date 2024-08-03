import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateAccount.css';

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // form submission handling 
  const handleSubmit = async () => {
  
    // POST request data
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // parse object as JSON
      body: JSON.stringify({ name, password, email, dob }),
    });

    const data = await response.json();
  
    if (response.ok) {
      alert(data.success);// success alert
      navigate('/');
    } else {
      alert(data.error);// error alert
    }
  };
  
  
  return (
    <div className="create-account-container">
      <h1>476Finance</h1>
      <h2>Create your account</h2>
      
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <div className="terms">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <label htmlFor="terms">
            Accept terms and conditions
          </label>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="next-button">
          Next
        </button>
        <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      </form>

    </div>
  );
};

export default CreateAccount;
