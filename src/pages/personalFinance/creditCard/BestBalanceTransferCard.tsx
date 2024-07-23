// ./pages/personalFinance/creditCard/BestBalanceTransferCard.tsx
import React from 'react';
import './CreditCardCategory.css'; // Import the styles

const BestBalanceTransferCard: React.FC = () => {
    return (
        <div className="credit-card-category-container">
            <h1>BEST BALANCE TRANSFER CARDS</h1>
            <div className="ranked-cards">
                <div className="card">
                    <img src="/images/balance_transfer_card1.png" alt="Balance Transfer Card 1" />
                    <p>
                        <strong>1. MBNA True Line® Gold Mastercard®</strong><br />
                        <em>Annual Fee:</em> $39<br />
                        <em>Welcome Offer:</em> 0% introductory annual interest rate (AIR) on balance transfers for the first 6 months<br />
                        <em>Rewards Rate:</em> N/A
                    </p>
                </div>
                <div className="card">
                    <img src="/images/balance_transfer_card2.png" alt="Balance Transfer Card 2" />
                    <p>
                        <strong>2. Scotiabank® Value® Visa* Card</strong><br />
                        <em>Annual Fee:</em> $29<br />
                        <em>Welcome Offer:</em> 0.99% introductory interest rate on balance transfers for the first 6 months<br />
                        <em>Rewards Rate:</em> N/A
                    </p>
                </div>
                <div className="card">
                    <img src="/images/balance_transfer_card3.png" alt="Balance Transfer Card 3" />
                    <p>
                        <strong>3. CIBC Select Visa* Card</strong><br />
                        <em>Annual Fee:</em> $29<br />
                        <em>Welcome Offer:</em> 0% introductory interest rate on balance transfers for the first 10 months<br />
                        <em>Rewards Rate:</em> N/A
                    </p>
                </div>
                <div className="card">
                    <img src="/images/balance_transfer_card4.png" alt="Balance Transfer Card 4" />
                    <p>
                        <strong>4. BMO® Preferred Rate Mastercard®*</strong><br />
                        <em>Annual Fee:</em> $20<br />
                        <em>Welcome Offer:</em> 3.99% introductory interest rate on balance transfers for 9 months<br />
                        <em>Rewards Rate:</em> N/A
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BestBalanceTransferCard;
