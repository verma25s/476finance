// ./pages/personalFinance/creditCard/BestSignUpOffer.tsx
import React from 'react';
import './CreditCardCategory.css'; // Import the styles
import scotiaPassport from '../../../components/images/scotia_passportinfinite.png';
import cibcAventureInfinite from '../../../components/images/cibc_aventurainfinite.png';
import amexGold from '../../../components/images/amex_gold.png';

const BestSignUpOffers: React.FC = () => {
    return (
        <div className="credit-card-category-container">
            <h1>BEST SIGN-UP OFFERS</h1>
            <div className="ranked-cards">
                <div className="card">
                    <img src={amexGold} alt="Sign Up Offer Card 1" />
                    <p>
                        <strong>1. American Express® Gold Rewards Card</strong><br />
                        <em>Annual Fee:</em> $150<br />
                        <em>Welcome Offer:</em> Earn up to 50,000 Membership Rewards® points<br />
                        <em>Rewards Rate:</em> 2X points on travel, gas, groceries, and drugstore purchases, 1X on everything else
                    </p>
                </div>
                <div className="card">
                    <img src={scotiaPassport} alt="Sign Up Offer Card 2" />
                    <p>
                        <strong>3. Scotiabank Passport™ Visa Infinite* Card</strong><br />
                        <em>Annual Fee:</em> $139<br />
                        <em>Welcome Offer:</em> Earn up to 40,000 bonus points<br />
                        <em>Rewards Rate:</em> 2X points on grocery stores, dining, entertainment, and daily transit, 1X on everything else
                    </p>
                </div>
                <div className="card">
                    <img src={cibcAventureInfinite} alt="Sign Up Offer Card 3" />
                    <p>
                        <strong>4. CIBC Aventura® Visa Infinite* Card</strong><br />
                        <em>Annual Fee:</em> $139<br />
                        <em>Welcome Offer:</em> Earn up to 20,000 Aventura points<br />
                        <em>Rewards Rate:</em> 2X points on travel purchased through the CIBC Rewards Centre, 1.5X on gas, groceries, and drugstores, 1X on everything else
                    </p>
                </div>
            </div>
        </div>
    );
};
export default BestSignUpOffers;
