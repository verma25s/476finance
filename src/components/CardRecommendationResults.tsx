// src/components/CardRecommendationResults.tsx
import React from 'react';
import './CardRecommendationResults.css'; // Import styles

//Images
//Amex
import amexPlatinum from './images/amex_platinum.png';
import amexGold from './images/amex_gold.png';
import amexReserveAeroplan from './images/amex_reserveaeroplan.png';
import amexCobalt from './images/amex_cobalt.png';
import amexPreferredCash from './images/amex_prederredcash.png';
import amexSimpleCash from './images/amex_simplecash.png';
import amexAeroplan from './images/amex_aeroplan.png';
import amexGreen from './images/amex_green.png';
import amexMariott from './images/amex_mariott.png';

//Cibc
import cibcDividentInfinite from './images/cibc_dividentinfinite.png';
import cibcAventuraGold from './images/cibc_aventuragold.png';
import cibcInfinitePrivilege from './images/cibc_infiniteprivilege.png';
import cibcAventuraInfinite from './images/cibc_aventurainfinite.png';
import cibcSelect from './images/cibc_select.png';

interface Props {
    useType: string;
    benefit: string;
    annualFee: string;
}

const CardRecommendationResults: React.FC<Props> = ({ useType, benefit, annualFee }) => {
    const cards = [
        {
            name: "American Express®  Platinum Card®",
            annualFee: "$799",
            welcomeOffer: "Earn up to 100,000 Membership Rewards® points – that’s up to $1,000 in value.",
            firstYearValue: "1370",
            interestRates: "21.99% on purchases and 21.99% on funds advances",
            additionalInfo: "Enjoy a $200 Annual Dining Credit at some of Canada’s best restaurants. Access to a $200 Annual Travel Credit. Unlock access to more than 1,400 airport lounges worldwide with the Global Lounge Collection.",
            useType: "personal",
            benefit: "travel",
            image: amexPlatinum
        },
        {
            name: "American Express® Gold Rewards Card",
            annualFee: "$250",
            welcomeOffer: "Earn up to 60,000 Membership Rewards® points – that’s up to $600 in value.",
            firstYearValue: "$1170",
            interestRates: "21.99% on purchases and 21.99% on funds advances",
            additionalInfo: "Earn 2x the points on eligible travel and everyday purchases. Access to a $100 Annual Travel Credit. Enjoy 4 complimentary visits per year to Plaza Premium Lounges.",
            useType: "personal",
            benefit: "travel",
            image: amexGold
        },
        {
            name: "American Express Cobalt® Card",
            annualFee: "$12.99 monthly ($155.88 annually)",
            welcomeOffer: "Earn up to 15,000 Membership Rewards® points – that’s up to $150 in value.",
            firstYearValue: "$1361",
            interestRates: "21.99% on purchases, 21.99% on funds advances",
            additionalInfo: "Earn 5X the points on eligible eats & drinks. Earn 3X the points on eligible streaming subscriptions. Earn 2X the points on eligible travel & transit.",
            useType: "personal",
            benefit: "rewards",
            image: amexCobalt
        },
        {
            name: "American Express® Aeroplan®* Reserve Card",
            annualFee: "$599",
            welcomeOffer: "Earn up to 85,000 Aeroplan®* points",
            firstYearValue: "1300",
            interestRates: "21.99% on purchases, 21.99% on funds advances",
            additionalInfo: "Enjoy benefits like Maple Leaf Lounge Access, an Annual Worldwide Companion Pass, Priority Airport Services, and accelerated earn rates. Earn up to $2,600 or more in value within your first 13 months.",
            useType: "personal",
            benefit: "travel",
            image: amexReserveAeroplan
        },
        {
            name: "American Express® Aeroplan®* Card",
            annualFee: "$120",
            welcomeOffer: "Earn up to 50,000 Aeroplan®* points",
            firstYearValue: "780",
            interestRates: "21.99% on purchases, 21.99% on funds advances",
            additionalInfo: "Enjoy your first eligible checked bag free, flight reward deals with preferred pricing, and the joy of earning and redeeming with accelerated earn rates. Earn up to $1,100 or more in value within your first 13 months.",
            useType: "personal",
            benefit: "travel",
            image: amexAeroplan
        },
        {
            name: "Marriott Bonvoy® American Express®* Card",
            annualFee: "$120",
            welcomeOffer: "Earn 50,000 Marriott Bonvoy® Points",
            firstYearValue: "N/A",
            interestRates: "21.99% on purchases, 21.99% on funds advances",
            additionalInfo: "Earn 5 points for every $1 spent in eligible Card purchases at hotels participating in Marriott Bonvoy. Enjoy an Annual Free Night Award. Receive complimentary Marriott Bonvoy Silver Elite status.",
            useType: "personal",
            benefit: "travel",
            image: amexMariott
        },
        {
            name: "SimplyCash® Preferred Card from American Express",
            annualFee: "$119.88 annually ($9.99 monthly)",
            welcomeOffer: "Earn up to $400 in Statement Credits in your first 10 months",
            firstYearValue: "Earn up to $400 in Statement Credits in your first 10 months",
            interestRates: "21.99% on purchases, 21.99% on funds advances",
            additionalInfo: "Earn up to 4% cash back on eligible gas and grocery purchases. Earn 2% cash back on everything else. Elevated benefits and insurances.",
            useType: "personal",
            benefit: "cashback",
            image: amexPreferredCash
        },
        {
            name: "SimplyCash® Card from American Express",
            annualFee: "$0",
            welcomeOffer: "Earn up to $100 in Statement Credits in your first 10 months",
            firstYearValue: "N/A",
            interestRates: "21.99% on purchases, 21.99% on funds advances",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases. Earn 1.25% cash back on everything else. No limit to the amount of cash back you can earn.",
            useType: "personal",
            benefit: "cashback",
            image: amexSimpleCash
        },
        {
            name: "American Express® Green Card",
            annualFee: "$0",
            welcomeOffer: "Earn a Welcome Bonus of 10,000 Membership Rewards® points – that’s $100 in value.",
            firstYearValue: "N/A",
            interestRates: "21.99% on purchases, 21.99% on funds advances",
            additionalInfo: "Earn 1X the points for every $1 in eligible Card purchases. Pay for almost anything charged to your Card with points. Access to American Express® Experiences.",
            useType: "personal",
            benefit: "rewards",
            image: amexGreen
        },
        {
            name: "CIBC Aventura® Gold Visa* Card",
            annualFee: "$139",
            welcomeOffer: "Join and get up to $1,300 in value†!",
            firstYearValue: "$1335",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Experience more of the world with our most flexible travel rewards program. 2 points per $1 on travel booked through the CIBC Rewards Centre, 1.5 points per $1 on eligible gas, electric vehicle charging, grocery and drugstore purchases, Lounge access3 | NEXUSTM, † fee rebate8",
            useType: "personal",
            benefit: "travel",
            image: cibcAventuraGold
        },
        {
            name: "CIBC Aventura® Visa Infinite*",
            annualFee: "$139",
            welcomeOffer: "$900 CIBC Aventura Rewards points",
            firstYearValue: "$1536",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "(First Year Rebated† , This offer is not available for residents of Quebec. Earn points on all purchases and redeem on travel or statement credits.",
            useType: "personal",
            benefit: "travel",
            image: cibcAventuraInfinite
        },
        {
            name: "CIBC Dividend® Visa Infinite* Card",
            annualFee: "$120",
            welcomeOffer: "$900 CIBC Aventura Rewards points",
            firstYearValue: "$1536",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Get a first-year annual fee rebate for you and up to three Authorized Users† and earn 10% cash back for the first 4 statements on net purchases of up to $3,000†.",
            benefit: "cashback",
            useType: "personal",
            image: cibcDividentInfinite
        },
        {
            name: "CIBC Aventura® Visa Infinite Privilege* Card",
            annualFee: "$499",
            welcomeOffer: "Join and get over $2,200 in value.†",
            firstYearValue: "$1536",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "3 points per $1 on travel booked through the CIBC Rewards Centre, 2 points on eligible dining, transportation, gas, electric vehicle charging and groceries, Annual travel credit3 | Lounge access2 | NEXUSTM, † fee rebate5 and more",
            benefit: "travel",
            useType: "personal",
            image: cibcInfinitePrivilege
        },
        {
            name: "CIBC Select Visa* Card",
            annualFee: "$29",
            welcomeOffer: "Get 0% interest on balance transfers for up to 10 months†",
            firstYearValue: "$29",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "low-interest",
            image: cibcSelect
        },
        {
            name: "RBC Avion Visa Infinite Privilege",
            annualFee: "$399",
            welcomeOffer: "$1178 Avion points",
            firstYearValue: "$1421",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Premium card earning travellers valuable points at an impressive rate. Includes comprehensive travel insurance and many other exclusive travel perks.",
            useType: "personal",
            benefit: "travel",
            image: "/images/rbc_avion_visa_infinite_privilege.png"
        },
        {
            name: "TD Cash Back Visa Infinite* Card",
            annualFee: "$120",
            welcomeOffer: "Up to $350 cash back†",
            firstYearValue: "$969",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 6% cash back on gas, groceries, and recurring bills for the first 3 months (up to $2,000). Earn 3% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "cashback",
            image: "/images/td_cash_back_visa_infinite.png"
        },
        {
            name: "Scotia Momentum® Visa Infinite* Card",
            annualFee: "$120",
            welcomeOffer: "Up to $200 cash back",
            firstYearValue: "$848",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 4% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "cashback",
            image: "/images/scotia_momentum_visa_infinite.png"
        },
        {
            name: "MBNA Rewards World Elite® Mastercard®",
            annualFee: "$120",
            welcomeOffer: "Up to 20,000 Points",
            firstYearValue: "$733",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "rewards",
            image: "/images/mbna_rewards_world_elite_mastercard.png"
        },
        {
            name: "Tangerine World Mastercard",
            annualFee: "No annual fee",
            welcomeOffer: "Up to $100 cash back",
            firstYearValue: "$220",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "cashback",
            image: "/images/tangerine_world_mastercard.png"
        },
        {
            name: "Rogers Red Mastercard®",
            annualFee: "No annual fee",
            welcomeOffer: "$60 cash back",
            firstYearValue: "$300",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "cashback",
            image: "/images/rogers_red_mastercard.png"
        },
        {
            name: "RBC ION Visa Card",
            annualFee: "No annual fee",
            welcomeOffer: "6,000 Points",
            firstYearValue: "$243",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "rewards",
            image: "/images/rbc_ion_visa.png"
        },
        {
            name: "Tangerine Money-Back Credit Card",
            annualFee: "No annual fee",
            welcomeOffer: "Up to $100 cash back",
            firstYearValue: "$220",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "cashback",
            image: "/images/tangerine_money_back.png"
        },
        {
            name: "National Bank World Elite Mastercard",
            annualFee: "$150",
            welcomeOffer: "Up to 40,000 Points",
            firstYearValue: "$1,283",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "rewards",
            image: "/images/national_bank_world_elite_mastercard.png"
        },
        {
            name: "BMO Ascend™ World Elite®* Mastercard®*",
            annualFee: "$150",
            welcomeOffer: "Up to 100,000 Points",
            firstYearValue: "$1,256",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "rewards",
            image: "/images/bmo_ascend_world_elite_mastercard.png"
        },
        {
            name: "Scotiabank Passport™ Visa Infinite* Card",
            annualFee: "$150",
            welcomeOffer: "Up to 35,000 Scene+ points",
            firstYearValue: "$747",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "travel",
            image: "/images/scotiabank_passport_visa_infinite.png"
        },
        {
            name: "Scotiabank Gold American Express® Card",
            annualFee: "$139",
            welcomeOffer: "Up to 35,000 Scene+ points",
            firstYearValue: "$950",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to $950* in value in the first 12 months, including up to 45,000 bonus Scene+ points and first year annual fee waived.1",
            useType: "personal",
            benefit: "travel",
            image: "/images/scotiabank_gold_amex.png"
        },
        {
            name: "National Bank Syncro Mastercard",
            annualFee: "$35",
            welcomeOffer: "No Welcome Offer",
            firstYearValue: "$-35",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "low-interest",
            image: "/images/national_bank_syncro_mastercard.png"
        },
        {
            name: "BMO Preferred Rate Mastercard®*",
            annualFee: "$20",
            welcomeOffer: "Get 0.99% interest for up to 9 months on balance transfers",
            firstYearValue: "$29",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "low-interest",
            image: "/images/bmo_preferred_rate_mastercard.png"
        },
        {
            name: "Scotiabank Value® Visa* Card",
            annualFee: "$29",
            welcomeOffer: "0% introductory interest rate on Balance Transfers for the first 10 months",
            firstYearValue: "N/A",
            interestRates: "20.99% on purchases, 22.99% on cash advances",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "low-interest",
            image: "/images/scotiabank_value_visa.png"
        },
        {
            name: "KOHO Everything Mastercard® Prepaid Card",
            annualFee: "No annual fee",
            welcomeOffer: "$20 cash back",
            firstYearValue: "$182",
            interestRates: "N/A",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "low-interest",
            image: "/images/koho_everything_mastercard.png"
        },
        {
            name: "KOHO Extra Prepaid Mastercard",
            annualFee: "No annual fee",
            welcomeOffer: "3 months free + $20 cash back",
            firstYearValue: "$128",
            interestRates: "N/A",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "low-interest",
            image: "/images/koho_extra_prepaid_mastercard.png"
        },
        {
            name: "Neo Money Card",
            annualFee: "No annual fee",
            welcomeOffer: "No Welcome Offer",
            firstYearValue: "$120",
            interestRates: "N/A",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "low-interest",
            image: "/images/neo_money_card.png"
        },
        {
            name: "EQ Bank Card",
            annualFee: "No annual fee",
            welcomeOffer: "No Welcome Offer",
            firstYearValue: "$120",
            interestRates: "N/A",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "low-interest",
            image: "/images/eq_bank_card.png"
        },
        {
            name: "KOHO Essential Mastercard® Prepaid Card",
            annualFee: "No annual fee",
            welcomeOffer: "$20 cash back",
            firstYearValue: "$104",
            interestRates: "N/A",
            additionalInfo: "Earn up to 2% cash back on eligible gas and grocery purchases.",
            useType: "personal",
            benefit: "low-interest",
            image: "/images/koho_essential_prepaid_mastercard.png"
        },
    ];

    const filteredCards = cards.filter(card => {
        // Filter by use type
        if (useType && card.useType !== useType) return false;

        // Filter by benefit
        if (benefit && card.benefit !== benefit) return false;

        // Filter by annual fee
        if (annualFee === 'no-fee' && card.annualFee !== 'No annual fee') return false;
        if (annualFee === 'low-fee' && parseInt(card.annualFee.replace('$', '')) > 199) return false;
        if (annualFee === 'mid-fee' && (parseInt(card.annualFee.replace('$', '')) < 200 || parseInt(card.annualFee.replace('$', '')) > 399)) return false;
        if (annualFee === 'high-fee' && parseInt(card.annualFee.replace('$', '')) < 400) return false;

        return true;
    });

    return (
        <div className="card-recommendation-results">
            <h2>Recommended Cards</h2>
            <div className="cards">
                {filteredCards.map((card, index) => (
                    <div key={index} className="card">
                        <img src={card.image} alt={card.name} />
                        <p>
                            <strong>{card.name}</strong><br />
                            <em>First Year Value:</em> {card.firstYearValue}<br />
                            <em>Annual Fee:</em> {card.annualFee}<br />
                            <em>Welcome Offer:</em> {card.welcomeOffer}<br />
                            <em>Interest Rates:</em> {card.interestRates}<br />
                            <em>Additional Info:</em> {card.additionalInfo}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardRecommendationResults;