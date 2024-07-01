import { NavLink } from 'react-router-dom';
import { getIsLoggedIn, setIsLoggedIn }  from '../pages/Login/Login'
import './Aside.css'; // Import your styles
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Aside = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
 
    const handleButtonClick = async () => {
        try {
          const response = await fetch('logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
          
    
          if (!response.ok) {
            throw new Error('Invalid credentials');
          }    
          console.log('Logout successful');

        }
        catch {}

        if (getIsLoggedIn()) {
          // Perform logout actions
          setIsLoggedIn(false); // Update isLoggedInState using setIsLoggedIn function
          localStorage.removeItem('isLoggedIn');
          setMessage("Logged Out Successfully");
          navigate('/')

          console.log(getIsLoggedIn());
      } else {
         
      }
    };


  return (
    <aside className="auth-sidebar">
      
      {message && <p className="logout-message">{message}</p>}
      {!getIsLoggedIn() &&
          
        <div className="auth-buttons-sidebar">
        
        <button className="login-button">
          <NavLink to="/login">Login</NavLink>
        </button>
        <button className="create-account-button">
          <NavLink to="/create-account">Create New Account</NavLink>
        </button>
        </div>
        }

{getIsLoggedIn() &&
        <div className="auth-buttons-sidebar">
        
        <button className="login-button" onClick={handleButtonClick}>
          Logout
        </button>
        
        </div>
        }



    </aside>
  );
}

export default Aside;
