// ./pages/personalFinance/creditCard/CreditCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreditCard.css'; // Import the styles
import CardRecommendationForm from '../../../components/CardRecommendationForm';
import CardRecommendationResults from '../../../components/CardRecommendationResults';

//Images 
import amexPlatinum from '../../../components/images/amex_platinum.png';
import capitalSilver from '../../../components/images/capital_silver.png';

const CreditCard: React.FC = () => {
    const [recommendationCriteria, setRecommendationCriteria] = useState<{ useType: string; benefit: string; annualFee: string } | null>(null);

    const handleCardRecommendationSubmit = (useType: string, benefit: string, annualFee: string) => {
        setRecommendationCriteria({ useType, benefit, annualFee });
    };

    return (
        <div className="credit-card-container">
            <h1>CREDIT CARDS</h1>
            <p>Latest credit card offers, rates, & reviews</p>
            <div className="card-categories">
                <div className="card-categories-1">
                    <Link to="/personalFinance/creditCard/best-credit-cards" className="card-category">Best Credit Cards</Link>
                    <Link to="/personalFinance/creditCard/best-travel-cards" className="card-category">Best Travel Cards</Link>
                    <Link to="/personalFinance/creditCard/best-cash-back-cards" className="card-category">Best Cash-Back Cards</Link>
                    <Link to="/personalFinance/creditCard/best-balance-transfer-card" className="card-category">Best Balance Transfer Cards</Link>
                </div>
                <div className="card-categories-2">
                    <Link to="/personalFinance/creditCard/best-sign-up-offers" className="card-category">Best Sign-Up Offers</Link>
                    <Link to="/personalFinance/creditCard/best-rewards-cards" className="card-category">Best Rewards Cards</Link>
                    <Link to="/personalFinance/creditCard/best-home-improvement-cards" className="card-category">Best Home Improvement Cards</Link>
                    <Link to="/personalFinance/creditCard/best-gas-cards" className="card-category">Best Gas Cards</Link>
                </div>
            </div>

            <CardRecommendationForm onSubmit={handleCardRecommendationSubmit} />

            {recommendationCriteria && (
                <CardRecommendationResults
                    useType={recommendationCriteria.useType}
                    benefit={recommendationCriteria.benefit}
                    annualFee={recommendationCriteria.annualFee}
                />
            )}

            <h2>Featured Credit Card Reviews</h2>
            <div className="featured-cards">
                <div className="card">
                   <img src={amexPlatinum} alt="The Platinum Card from American Express" />
                    <p>
                        <strong>The Platinum Card® from American Express</strong><br />
                        <em>Annual Fee:</em> $799<br />
                        <em>Welcome Offer:</em> Earn 100,000 points after spending $8,000 in the first six months<br />
                        <em>Rewards Rate:</em> 1X on all purchases, 5X on flights booked directly with airlines or with American Express Travel
                        Enjoy a $200 Annual Dining Credit at some of Canada’s best restaurants40
                        Access to a $200 Annual Travel Credit6
                        Unlock access to more than 1,400 airport lounges worldwide with the Global Lounge Collection7
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
                    <img src="/images/ink_business_preferred.png" alt="Ink Business Preferred Credit Card" />
                    <p>
                        <strong>Ink Business Preferred® Credit Card</strong><br />
                        <em>Annual Fee:</em> $95<br />
                        <em>Welcome Offer:</em> Earn 120,000 points after spending $8,000 in the first 3 months (that's $1,200 cash back or $1,500 toward travel when redeemed through Chase TravelSM)<br />
                        <em>Rewards Rate:</em> 3X points on the first $150,000 spent in combined purchases on travel, shipping, internet, cable, and phone services, and advertising purchases made with social media sites and search engines each account anniversary year; 1X on all other purchases
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;
