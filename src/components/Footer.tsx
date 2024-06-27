// Footer.tsx

import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-disclaimer">
        <p>Disclaimer: All content provided is for informational purposes only and does not constitute financial advice.</p>
      </div>
      <div className="contact-us">
        <h3>Contact Us</h3>
        <p>Email: contact@476finance.com</p>
        <p>Phone: +123-456-7890</p>
      </div>
      <div className="get-in-touch">
        <h3>Get in Touch</h3>
        {/* Social Media Links */}
      </div>
      <div className="footer-copyright">
       <p>© 2024 476Finance. All rights reserved.</p>
      </div>
    </footer>

  );
}

export default Footer;