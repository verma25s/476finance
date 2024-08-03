// ./pages/personalFinance/creditCard/CreditCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreditCard.css'; // Import the styles
import CardRecommendationForm from '../../../components/CardRecommendationForm';
import CardRecommendationResults from '../../../components/CardRecommendationResults';

//Images 
import amexPlatinum from '../../../components/images/amex_platinum.png';
import capitalSilver from '../../../components/images/capital_silver.png';
import cibcInfinite from '../../../components/images/cibc_infiniteprivilege.png';

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
                        Enjoy a $200 Annual Dining Credit at some of Canada’s best restaurants
                        Access to a $200 Annual Travel Credit
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
export default CreditCard;
