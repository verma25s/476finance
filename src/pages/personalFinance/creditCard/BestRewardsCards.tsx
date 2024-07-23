// ./pages/personalFinance/creditCard/BestRewardsCard.tsx
import React from 'react';
import './CreditCardCategory.css'; // Import the styles

const BestRewardsCards: React.FC = () => {
    return (
        <div className="credit-card-category-container">
            <h1>BEST REWARDS CARDS</h1>
            <div className="ranked-cards">
                <div className="card">
                    <img src="/images/rewards_card1.png" alt="Rewards Card 1" />
                    <p>
                        <strong>1. American Express® Cobalt™ Card</strong><br />
                        <em>Annual Fee:</em> $155.88<br />
                        <em>Welcome Offer:</em> Earn up to 50,000 Membership Rewards® points<br />
                        <em>Rewards Rate:</em> 5X points on eligible eats and drinks, 2X on travel, transit, and gas, 1X on everything else
                    </p>
                </div>
                <div className="card">
                    <img src="/images/rewards_card2.png" alt="Rewards Card 2" />
                    <p>
                        <strong>2. TD® First Class Travel® Visa Infinite* Card</strong><br />
                        <em>Annual Fee:</em> $120<br />
                        <em>Welcome Offer:</em> Earn up to 80,000 TD Points<br />
                        <em>Rewards Rate:</em> 9X points on travel booked through Expedia for TD, 3X on all other travel, 1X on everything else
                    </p>
                </div>
                <div className="card">
                    <img src="/images/rewards_card3.png" alt="Rewards Card 3" />
                    <p>
                        <strong>3. Scotiabank Gold American Express® Card</strong><br />
                        <em>Annual Fee:</em> $120<br />
                        <em>Welcome Offer:</em> Earn up to 40,000 bonus points<br />
                        <em>Rewards Rate:</em> 5X points on groceries, dining, and entertainment, 3X on gas, transit, and select streaming services, 1X on everything else
                    </p>
                </div>
                <div className="card">
                    <img src="/images/rewards_card4.png" alt="Rewards Card 4" />
                    <p>
                        <strong>4. BMO World Elite®* Mastercard®*</strong><br />
                        <em>Annual Fee:</em> $150<br />
                        <em>Welcome Offer:</em> Earn up to 50,000 points<br />
                        <em>Rewards Rate:</em> 3X points on travel, 2X on dining and entertainment, 1X on everything else
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BestRewardsCards;
