// necessary imports for fuctioning
import { NavLink } from 'react-router-dom';
import { getIsLoggedIn, setIsLoggedIn }  from '../pages/Login/Login'
import './Aside.css'; // Import your styles
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const Aside = () => {
  // navigation object creation
  const navigate = useNavigate();
  // store logout message
  const [message, setMessage] = useState<string | null>(null);
  // manages cookies for user email
  const [cookies, setCookie, removeCookie] = useCookies(['userEmail']);
 
    const handleButtonClick = async () => {
      removeCookie('userEmail', { path: '/' });
      // try-catch block conditioning
        try {
          // send a logout request
          const response = await fetch('logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
          
    
          if (!response.ok) {
            // error-handling incase if logout fails
            throw new Error('Invalid credentials');
          } 
          // on successfull logout   
          console.log('Logout successful');

        }
        // catches error
        catch {}

        if (getIsLoggedIn()) {
          // Perform logout actions
          setIsLoggedIn(false); // Update isLoggedInState using setIsLoggedIn function
          localStorage.removeItem('isLoggedIn');
          setMessage("Logged Out Successfully");
          navigate('/');// Navigate back to home page

      } else {
         
      }
    };


  return (
    // different containers for buttons and action sidebars
    <div className="auth-sidebar">
      
      {message && <p className="logout-message">{message}</p>}
      {!cookies.userEmail &&
          
        <div className="auth-buttons-sidebar">
        
        <button className="login-button">
          <NavLink to="/login">Login</NavLink>
        </button>
        <button className="create-account-button">
          <NavLink to="/create-account">Create New Account</NavLink>
        </button>
        </div>
        }

{cookies.userEmail &&
        <div className="auth-buttons-sidebar">
        
        <button className="login-button" onClick={handleButtonClick}>
          Logout
        </button>
        
        </div>
        }
    </div>
  );
}

export default Aside;
