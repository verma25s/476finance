// ./pages/personalFinance/creditCard/BestTravelCard.tsx
// import react library
import React from 'react';
import './CreditCardCategory.css'; // Import the styles
// import credit cards images
import scotiaGold from '../../../components/images/scotia_gold.png';
import amexAeroplan from '../../../components/images/amex_aeroplan.png';
import rbcEliteWestjet from '../../../components/images/rbc_elitewestjet.png';
import cibcAventuraInfinite from '../../../components/images/cibc_aventurainfinite.png';

// define the BestTravelCard functional component
const BestTravelCard: React.FC = () => {
    return (
        <div className="credit-card-category-container">
            <h1>BEST TRAVEL CARDS</h1>
            <div className="ranked-cards">
                <div className="card">
                    <img src={rbcEliteWestjet} alt="Travel Card 1" />
                    <p>
                        <strong>1. WestJet RBC World Elite Mastercard</strong><br />
                        <em>Annual Fee:</em> $120<br />
                        <em>Welcome Offer:</em> Get up to 450 WestJet dollars (a value of up to $450 off the base fare) when you spend a minimum of $5,000 in the first 3 months on your card<br />
                        <em>Rewards Rate:</em> Receive a round-trip companion voucher – every year – for any WestJet destination starting from $119 CAD2 (plus taxes, fees, charges and other ATC) or choose to exchange it for 4 lounge vouchers.
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
                    <img src={cibcAventuraInfinite} alt="Travel Card 3" />
                    <p>
                        <strong>CIBC Aventura® Visa Infinite*</strong><br />
                        <em>Annual Fee:</em> $139<br />
                        <em>Welcome Offer:</em> $900 CIBC Aventura Rewards points<br />
                        <em>Rewards Rate:</em> First Year Rebated† , This offer is not available for residents of Quebec. Earn points on all purchases and redeem on travel or statement credits.
                    </p>
                </div>
                <div className="card">
                    <img src={amexAeroplan} alt="Travel Card 4" />
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
// export the BestTravelCard component as default export
export default BestTravelCard;
