// ./pages/personalFinance/creditCard/BestCreditCard.tsx
import React from 'react';
import './CreditCardCategory.css'; // Import the styles
import amexPlatinum from '../../../components/images/amex_platinum.png';

const BestCreditCard: React.FC = () => {
    return (
        <div className="credit-card-category-container">
            <h1>Best Credit Cards</h1>
            <div className="ranked-cards">
                <div className="card">
                    <img src={amexPlatinum} alt="The Platinum Card from American Express" />
                    <p>
                        <strong>1. The Platinum Card® from American Express</strong><br />
                        <em>Annual Fee:</em> $799<br />
                        <em>Welcome Offer:</em> Earn up to 100,000 Membership Rewards® points – that’s up to $1,000 in value.<br />
                        <em>Rewards Rate:</em> 1X - 5X points
                    </p>
                </div>
                <div className="card">
                    <img src="/images/capital_one_quicksilver.png" alt="Capital One Quicksilver Student Cash Rewards Credit Card" />
                    <p>
                        <strong>2. Capital One Quicksilver Student Cash Rewards Credit Card</strong><br />
                        <em>Annual Fee:</em> $0<br />
                        <em>Welcome Offer:</em> Earn a one-time $50 cash bonus if you spend $100 or more on purchases within three months of opening an account<br />
                        <em>Rewards Rate:</em> 1.5% cash back
                    </p>
                </div>
                <div className="card">
                    <img src="/images/ink_business_preferred.png" alt="Ink Business Preferred Credit Card" />
                    <p>
                        <strong>3. Ink Business Preferred® Credit Card</strong><br />
                        <em>Annual Fee:</em> $95<br />
                        <em>Welcome Offer:</em> Earn 120,000 points after spending $8,000 in the first 3 months (that's $1,200 cash back or $1,500 toward travel when redeemed through Chase TravelSM)<br />
                        <em>Rewards Rate:</em> 1X - 3X points
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BestCreditCard;
