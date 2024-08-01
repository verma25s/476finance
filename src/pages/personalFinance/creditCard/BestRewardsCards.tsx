// ./pages/personalFinance/creditCard/BestRewardsCard.tsx
// import react library
import React from 'react';
import './CreditCardCategory.css'; // Import the styles
// import credit card images
import amexCobalt from '../../../components/images/amex_cobalt.png';
import scotiaGold from '../../../components/images/scotia_gold.png';
import bmoAscend from '../../../components/images/bmo_ascend.png';
import rbcAvionInfinite from '../../../components/images/rbc_avioninfinite.png';

// define the BestRewardsCards functional component
const BestRewardsCards: React.FC = () => {
    return (
        <div className="credit-card-category-container">
            <h1>BEST REWARDS CARDS</h1>
            <div className="ranked-cards">
                <div className="card">
                    <img src={amexCobalt} alt="Rewards Card 1" />
                    <p>
                        <strong>1. American Express® Cobalt™ Card</strong><br />
                        <em>Annual Fee:</em> $155.88<br />
                        <em>Welcome Offer:</em> Earn up to 50,000 Membership Rewards® points<br />
                        <em>Rewards Rate:</em> 5X points on eligible eats and drinks, 2X on travel, transit, and gas, 1X on everything else
                    </p>
                </div>
                <div className="card">
                    <img src={rbcAvionInfinite} alt="Rewards Card 2" />
                    <p>
                        <strong>2. RBC Avion Visa Infinite Privilege</strong><br />
                        <em>Annual Fee:</em> $399<br />
                        <em>Welcome Offer:</em> Premium card earning travellers valuable points at an impressive rate. Includes comprehensive travel insurance and many other exclusive travel perks.<br />
                        <em>Rewards Rate:</em> 9X points on travel booked through Expedia for RBC, 3X on all other travel, 1X on everything else
                    </p>
                </div>
                <div className="card">
                    <img src={scotiaGold} alt="Rewards Card 3" />
                    <p>
                        <strong>3. Scotiabank Gold American Express® Card</strong><br />
                        <em>Annual Fee:</em> $120<br />
                        <em>Welcome Offer:</em> Earn up to 40,000 bonus points<br />
                        <em>Rewards Rate:</em> 5X points on groceries, dining, and entertainment, 3X on gas, transit, and select streaming services, 1X on everything else
                    </p>
                </div>
                <div className="card">
                    <img src={bmoAscend} alt="Rewards Card 4" />
                    <p>
                        <strong>4. BMO Ascend™ World Elite®* Mastercard®</strong><br />
                        <em>Annual Fee:</em> $150<br />
                        <em>Welcome Offer:</em>"Up to 100,000 Points"<br />
                        <em>Rewards Rate:</em> "Earn up to 2% cash back on eligible gas and grocery purchases.
                    </p>
                </div>
            </div>
        </div>
    );
};
// export the BestRewardsCards component as default export
export default BestRewardsCards;
