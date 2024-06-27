import React from 'react';
import { Link } from 'react-router-dom';
import './Aside.css'; // Import your styles

const Aside: React.FC = () => {
  return (
    <aside className="auth-sidebar">
      <div className="auth-buttons-sidebar">
        <button className="login-button">
          <Link to="/login">Login</Link>
        </button>
        <button className="create-account-button">
          <Link to="/create-account">Create New Account</Link>
        </button>
      </div>
    </aside>
  );
}

export default Aside;
