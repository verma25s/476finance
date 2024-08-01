import React, { useState } from 'react';
import './CardRecommendationForm.css';

interface Props {
    onSubmit: (useType: string, benefit: string, annualFee: string) => void;
}

const CardRecommendationForm: React.FC<Props> = ({ onSubmit }) => {
    // this initializes useType state with an empty string
    const [useType, setUseType] = useState('');
    // this initializes benefit state with an empty string
    const [benefit, setBenefit] = useState('');
    // this initializes annualFee state with an empty string
    const [annualFee, setAnnualFee] = useState('');

    const handleUseTypeChange = (value: string) => {
        setUseType(value);
    };

    const handleBenefitChange = (value: string) => {
        setBenefit(value);
    };

    const handleAnnualFeeChange = (value: string) => {
        setAnnualFee(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(useType, benefit, annualFee);
    };

    return (
        <form className="card-recommendation-form" onSubmit={handleSubmit}>
            <h2>Need help finding a Card?</h2>
            <p>Answer a few questions to help you find a Card that is appropriate for you.</p>
            
            <div className="form-group">
                <label>1) Your Card is for...</label>
                <div className="button-group">
                    <input
                        type="button"
                        value="Personal Use"
                        className={useType === 'personal' ? 'selected' : ''}
                        onClick={() => handleUseTypeChange('personal')}
                    />
                    <input
                        type="button"
                        value="Business Use"
                        className={useType === 'business' ? 'selected' : ''}
                        onClick={() => handleUseTypeChange('business')}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>2) Which benefit appeals to you the most?</label>
                <div className="button-group">
                    <input
                        type="button"
                        value="Travel"
                        className={benefit === 'travel' ? 'selected' : ''}
                        onClick={() => handleBenefitChange('travel')}
                    />
                    <input
                        type="button"
                        value="Flexible Rewards"
                        className={benefit === 'rewards' ? 'selected' : ''}
                        onClick={() => handleBenefitChange('rewards')}
                    />
                    <input
                        type="button"
                        value="Cash Back"
                        className={benefit === 'cashback' ? 'selected' : ''}
                        onClick={() => handleBenefitChange('cashback')}
                    />
                    <input
                        type="button"
                        value="Lower Interest Rate"
                        className={benefit === 'low-interest' ? 'selected' : ''}
                        onClick={() => handleBenefitChange('low-interest')}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>3) What annual fee are you comfortable paying to receive greater benefits?</label>
                <div className="button-group">
                    <input
                        type="button"
                        value="No Annual Fee"
                        className={annualFee === 'no-fee' ? 'selected' : ''}
                        onClick={() => handleAnnualFeeChange('no-fee')}
                    />
                    <input
                        type="button"
                        value="$1 - $199"
                        className={annualFee === 'low-fee' ? 'selected' : ''}
                        onClick={() => handleAnnualFeeChange('low-fee')}
                    />
                    <input
                        type="button"
                        value="$200 - $399"
                        className={annualFee === 'mid-fee' ? 'selected' : ''}
                        onClick={() => handleAnnualFeeChange('mid-fee')}
                    />
                    <input
                        type="button"
                        value="$400+"
                        className={annualFee === 'high-fee' ? 'selected' : ''}
                        onClick={() => handleAnnualFeeChange('high-fee')}
                    />
                </div>
            </div>

            <button type="submit" className="submit-button">View Card recommendations</button>
        </form>
    );
};

export default CardRecommendationForm;
