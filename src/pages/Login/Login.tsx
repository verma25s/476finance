import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import your styles

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <h1>476Finance</h1>
        <h2>Welcome to 476Finance</h2>
        <p className="tagline">Smart money made simple</p>
      </div>
      <div className="login-right">
        <h2>Sign in to 476Finance</h2>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />

          <button type="submit" className="signin-button">Sign In</button>
        </form>
        <p><a href="/reset-password">Forgot password?</a></p>
        <p>Don't have an account? <Link to="/create-account">Create new account</Link></p>
      </div>
    </div>
  );
}

export default Login;
