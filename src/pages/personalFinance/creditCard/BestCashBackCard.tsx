// ./pages/personalFinance/creditCard/BestCashBackCard.tsx
import React from 'react';
import './CreditCardCategory.css'; // Import the styles

const BestCashBackCard: React.FC = () => {
    return (
        <div className="credit-card-category-container">
            <h1>BEST CASH-BACK CARDS</h1>
            <div className="ranked-cards">
                <div className="card">
                    <img src="/images/cash_back_card1.png" alt="Cash Back Card 1" />
                    <p>
                        <strong>1. Tangerine Money-Back Credit Card</strong><br />
                        <em>Annual Fee:</em> $0<br />
                        <em>Welcome Offer:</em> 15% cash back on up to $1,000 in everyday purchases within the first 2 months<br />
                        <em>Rewards Rate:</em> 2% cash back on purchases in up to 3 categories of your choice, 0.5% on everything else
                    </p>
                </div>
                <div className="card">
                    <img src="/images/cash_back_card2.png" alt="Cash Back Card 2" />
                    <p>
                        <strong>2. SimplyCash™ Preferred Card from American Express</strong><br />
                        <em>Annual Fee:</em> $99<br />
                        <em>Welcome Offer:</em> 10% cash back on purchases for the first 4 months (up to $400)<br />
                        <em>Rewards Rate:</em> 2% cash back on all purchases
                    </p>
                </div>
                <div className="card">
                    <img src="/images/cash_back_card3.png" alt="Cash Back Card 3" />
                    <p>
                        <strong>3. BMO CashBack® World Elite®* Mastercard®*</strong><br />
                        <em>Annual Fee:</em> $120<br />
                        <em>Welcome Offer:</em> 10% cash back on all purchases for the first 3 months (up to $200)<br />
                        <em>Rewards Rate:</em> 1.5% cash back on all purchases
                    </p>
                </div>
                <div className="card">
                    <img src="/images/cash_back_card4.png" alt="Cash Back Card 4" />
                    <p>
                        <strong>4. Scotia Momentum® Visa Infinite* Card</strong><br />
                        <em>Annual Fee:</em> $120<br />
                        <em>Welcome Offer:</em> 10% cash back on all purchases for the first 3 months (up to $2,000)<br />
                        <em>Rewards Rate:</em> 4% cash back on groceries and recurring bills, 2% on gas and daily transit, 1% on everything else
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BestCashBackCard;
