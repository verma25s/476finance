// ./pages/personalFinance/CreditCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CreditCard.css'; // Import the styles

const CreditCard: React.FC = () => {
    return (
        <div className="credit-card-container">
            <h1>Credit Cards</h1>
            <p>Latest credit card offers, rates, & reviews</p>
            
            <div className="card-categories">
                <Link to="/personalFinance/best-credit-cards" className="card-category">Best Credit Cards</Link>
                <Link to="/personalFinance/best-travel-cards" className="card-category">Best Travel Cards</Link>
                <Link to="/personalFinance/best-cash-back-cards" className="card-category">Best Cash-Back Cards</Link>
                <Link to="/personalFinance/best-balance-transfer-cards" className="card-category">Best Balance Transfer Cards</Link>
                <Link to="/personalFinance/best-sign-up-offers" className="card-category">Best Sign-Up Offers</Link>
                <Link to="/personalFinance/best-rewards-cards" className="card-category">Best Rewards Cards</Link>
                <Link to="/personalFinance/best-home-improvement-cards" className="card-category">Best Home Improvement Cards</Link>
                <Link to="/personalFinance/best-gas-cards" className="card-category">Best Gas Cards</Link>
            </div>

            <h2>Featured credit card review</h2>
            <div className="featured-cards">
                <div className="card">
                    <img src="path_to_image1" alt="Credit Card 1" />
                    <p>Credit Card 1 Description</p>
                </div>
                <div className="card">
                    <img src="path_to_image2" alt="Credit Card 2" />
                    <p>Credit Card 2 Description</p>
                </div>
                {/* Add more featured cards as needed */}
            </div>
        </div>
    );
};

export default CreditCard;
