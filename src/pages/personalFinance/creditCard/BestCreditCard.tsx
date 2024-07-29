// ./pages/personalFinance/creditCard/BestCreditCard.tsx
import React from 'react';
import './CreditCardCategory.css'; // Import the styles
import amexPlatinum from '../../../components/images/amex_platinum.png';
import capitalSilver from '../../../components/images/capital_silver.png';
import cibcInfinite from '../../../components/images/cibc_infiniteprivilege.png';

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
                    <img src={capitalSilver} alt="Capital One Quicksilver Student Cash Rewards Credit Card" />
                    <p>
                        <strong>Capital One Quicksilver Student Cash Rewards Credit Card</strong><br />
                        <em>Annual Fee:</em> $0<br />
                        <em>Welcome Offer:</em> Earn a one-time $50 cash bonus if you spend $100 or more on purchases within three months of opening an account<br />
                        <em>Rewards Rate:</em> 1.5% cash back on every purchase, every day
                    </p>
                </div>
                <div className="card">
                    <img src={cibcInfinite} alt="Ink Business Preferred Credit Card" />
                    <p>
                        <strong>CIBC Aventura® Visa Infinite Privilege* Card</strong><br />
                        <em>Annual Fee:</em> $488<br />
                        <em>Welcome Offer:</em> Join and get over $2,200 in value.†<br />
                        <em>Rewards Rate:</em> 3 points per $1 on travel booked through the CIBC Rewards Centre, 2 points on eligible dining, transportation, gas, electric vehicle charging and groceries, Annual travel credit | Lounge access2 | NEXUSTM, † fee rebate and more</p>
                </div>
            </div>
        </div>
    );
};

export default BestCreditCard;
