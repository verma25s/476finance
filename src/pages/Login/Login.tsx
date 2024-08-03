import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useCookies } from 'react-cookie';

let isLoggedInState = false;
export const getIsLoggedIn = () => {
  return isLoggedInState;
};
export const setIsLoggedIn = (loggedIn: boolean) => {
  isLoggedInState = loggedIn;
};

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cookies, setCookie] = useCookies(['userEmail']);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      // Login successful
      setError('');
      console.log('Login successful');
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      // cookie setup if user's email login is successful
      if (isLoggedInState) {
        setCookie('userEmail', email, { path: '/', maxAge: 86400 });
        console.log(email);
        console.log(cookies.userEmail);
        navigate('/');
      }
      
    } catch (error) {
      setError("Incorrect username or Password");//update error state on error
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
       
        <h1>476Finance</h1>
        <h2>Welcome to 476Finance</h2>
        <p className="tagline">Smart money made simple</p>
      </div>
      <div className="login-right">
        <h2>Sign in to 476Finance</h2>
        <form onSubmit={handleSubmit}>
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

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
       
        <p>
          Don't have an account? <Link to="/create-account">Create new account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;