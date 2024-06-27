import React from 'react';
import { Link } from 'react-router-dom';
import './CreateAccount.css'; // Import your styles

const CreateAccount: React.FC = () => {
  return (
    <div className="create-account-container">
      <h1>476Finance</h1>
      <h2>Create your account</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" id="dob" name="dob" required />
        <div className="terms">
          <input type="checkbox" id="terms" name="terms" required />
          <label htmlFor="terms">I accept all terms and conditions and privacy policy</label>
        </div>
        <button type="submit" className="next-button">Next</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default CreateAccount;
