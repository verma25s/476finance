// ./pages/personalFinance/creditCard/BestBalanceTransferCard.tsx
import React from 'react';
// import the CSS file for styling
import './CreditCardCategory.css'; // Import the styles
// importing images for various card
import scotiaValue from '../../../components/images/scotia_value.png';
import cibcSelect from '../../../components/images/cibc_select.png';
import mbnaElite from '../../../components/images/mbna_elite.png';
import bmoPreferredRate from '../../../components/images/bmo_preferredrate.png';

// define the functional component BestBalanceTransferCard
const BestBalanceTransferCard: React.FC = () => {
    return (
        <div className="credit-card-category-container">
            <h1>BEST BALANCE TRANSFER CARDS</h1>
            <div className="ranked-cards">
                <div className="card">
                    <img src={mbnaElite} alt="Balance Transfer Card 1" />
                    <p>
                        <strong>1. MBNA True Line® Gold Mastercard®</strong><br />
                        <em>Annual Fee:</em> $39<br />
                        <em>Welcome Offer:</em> 0% introductory annual interest rate (AIR) on balance transfers for the first 6 months<br />
                        <em>Rewards Rate:</em> Earn up to 2% cash back on eligible gas and grocery purchases.
                    </p>
                </div>
                <div className="card">
                    <img src={scotiaValue} alt="Balance Transfer Card 2" />
                    <p>
                        <strong>2. Scotiabank® Value® Visa* Card</strong><br />
                        <em>Annual Fee:</em> $29<br />
                        <em>Welcome Offer:</em> 0.99% introductory interest rate on balance transfers for the first 6 months<br />
                        <em>Rewards Rate:</em> Earn up to 2% cash back on eligible gas and grocery purchases.
                    </p>
                </div>
                <div className="card">
                    <img src={cibcSelect} alt="Balance Transfer Card 3" />
                    <p>
                        <strong>3. CIBC Select Visa* Card</strong><br />
                        <em>Annual Fee:</em> $29<br />
                        <em>Welcome Offer:</em> 0% introductory interest rate on balance transfers for the first 10 months<br />
                        <em>Rewards Rate:</em> Earn up to 2% cash back on eligible gas and grocery purchases.
                    </p>
                </div>
                <div className="card">
                    <img src={bmoPreferredRate} alt="Balance Transfer Card 4" />
                    <p>
                        <strong>4. BMO® Preferred Rate Mastercard®*</strong><br />
                        <em>Annual Fee:</em> $20<br />
                        <em>Welcome Offer:</em> 3.99% introductory interest rate on balance transfers for 9 months<br />
                        <em>Rewards Rate:</em> Earn up to 2% cash back on eligible gas and grocery purchases.
                    </p>
                </div>
            </div>
        </div>
    );
};
// export the component for use in other parts of the application
export default BestBalanceTransferCard;
