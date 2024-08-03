// ./pages/personalFinance/creditCard/BestHomeImprovementCard.tsx
import React from 'react';
import './CreditCardCategory.css'; // Import the styles
import scotiaScene from '../../../components/images/scotia_scene.png';
import homedepotCustomerCreditCard from '../../../components/images/homedepot_customercard.png';
import lowesAdvantage from '../../../components/images/lowes_advantage.png';
import canadiantireTriangle from '../../../components/images/canadiantire_triangle.png';

const BestHomeImprovementCard: React.FC = () => {
    return (
        <div className="credit-card-category-container">
            <h1>BEST HOME IMPROVEMENT CARDS</h1>
            <div className="ranked-cards">
                <div className="card">
                    <img src={canadiantireTriangle} alt="Home Improvement Card 1" />
                    <p>
                        <strong>1. Canadian Tire Triangle™ Mastercard®</strong><br />
                        <em>Annual Fee:</em> $0<br />
                        <em>Welcome Offer:</em> 15% back in CT Money on your first purchase (up to $50)<br />
                        <em>Rewards Rate:</em> 4% back in CT Money at Canadian Tire, Sport Chek, and participating stores, 1.5% back in CT Money on groceries, 0.5% on everything else
                    </p>
                </div>
                <div className="card">
                    <img src={lowesAdvantage} alt="Home Improvement Card 2" />
                    <p>
                        <strong>2. Lowe’s Advantage Card</strong><br />
                        <em>Annual Fee:</em> $0<br />
                        <em>Welcome Offer:</em> 5% off every day on purchases at Lowe’s<br />
                        <em>Rewards Rate:</em> 5% off every day on purchases at Lowe’s, special financing options available
                    </p>
                </div>
                <div className="card">
                    <img src={homedepotCustomerCreditCard} alt="Home Improvement Card 3" />
                    <p>
                        <strong>3. The Home Depot Consumer Credit Card</strong><br />
                        <em>Annual Fee:</em> $0<br />
                        <em>Welcome Offer:</em> Special financing on purchases of $299 or more<br />
                        <em>Rewards Rate:</em> Up to 24 months financing during special promotions
                    </p>
                </div>
                <div className="card">
                    <img src={scotiaScene} alt="Home Improvement Card 4" />
                    <p>
                        <strong>4. Scotiabank SCENE Visa Card</strong><br />
                        <em>Annual Fee:</em> $0<br />
                        <em>Welcome Offer:</em> Earn 2,500 SCENE points with your first $500 in everyday purchases in the first 3 months<br />
                        <em>Rewards Rate:</em> 5X SCENE points for every $1 spent at participating Cineplex theatres or cineplex.com, 1X point for every $1 spent on everyday purchases
                    </p>
                </div>
            </div>
        </div>
    );
};
export default BestHomeImprovementCard;
