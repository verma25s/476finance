// ./pages/personalFinance/creditCard/BestTravelCard.tsx
import React from 'react';
import './CreditCardCategory.css'; // Import the styles
import scotiaGold from '../../../components/images/scotia_gold.png';
import amexAeroplanReserve from '../../../components/images/amex_reserveaeroplan.png';

const BestTravelCard: React.FC = () => {
    return (
        <div className="credit-card-category-container">
            <h1>BEST TRAVEL CARDS</h1>
            <div className="ranked-cards">
                <div className="card">
                    <img src="/images/travel_card1.png" alt="Travel Card 1" />
                    <p>
                        <strong>1. TD® First Class Travel® Visa Infinite* Card</strong><br />
                        <em>Annual Fee:</em> $120<br />
                        <em>Welcome Offer:</em> Earn up to 80,000 TD Points<br />
                        <em>Rewards Rate:</em> 9X points on travel booked through Expedia for TD, 3X on all other travel, 1X on everything else
                    </p>
                </div>
                <div className="card">
                    <img src={scotiaGold} alt="Travel Card 2" />
                    <p>
                        <strong>2. Scotiabank® Gold American Express® Card</strong><br />
                        <em>Annual Fee:</em> $120<br />
                        <em>Welcome Offer:</em> Earn up to 40,000 bonus points<br />
                        <em>Rewards Rate:</em> 5X points on groceries, dining, and entertainment, 3X on gas, transit, and select streaming services, 1X on everything else
                    </p>
                </div>
                <div className="card">
                    <img src="/images/travel_card3.png" alt="Travel Card 3" />
                    <p>
                        <strong>3. BMO World Elite®* Mastercard®*</strong><br />
                        <em>Annual Fee:</em> $150<br />
                        <em>Welcome Offer:</em> Earn up to 50,000 points<br />
                        <em>Rewards Rate:</em> 3X points on travel, 2X on dining and entertainment, 1X on everything else
                    </p>
                </div>
                <div className="card">
                    <img src={amexAeroplanReserve} alt="Travel Card 4" />
                    <p>
                        <strong>4. American Express® Aeroplan®* Card</strong><br />
                        <em>Annual Fee:</em> $120<br />
                        <em>Welcome Offer:</em> Earn up to 15,000 Aeroplan points<br />
                        <em>Rewards Rate:</em> 2X points on eligible purchases with Air Canada, 1.5X on dining and food delivery, 1X on everything else
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BestTravelCard;
