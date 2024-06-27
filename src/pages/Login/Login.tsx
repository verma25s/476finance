import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import your styles

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
      } else {
        navigate('/'); // Redirect to home or another page on successful login
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal server error');
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
        <form onSubmit={handleLogin}>
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
          <a href="/reset-password">Forgot password?</a>
        </p>
        <p>
          Don't have an account? <Link to="/create-account">Create new account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

