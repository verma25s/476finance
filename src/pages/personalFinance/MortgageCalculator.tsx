import React, { useState } from 'react';
import './MortgageCalculator.css';
const provinces = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia",
  "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"
];

const MortgageCalculator: React.FC = () => {
  const [income, setIncome] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('');
  const [debts, setDebts] = useState<string>('');
  const [creditCardDebt, setCreditCardDebt] = useState<string>('');
  const [condoFees, setCondoFees] = useState<string>('');
  const [province, setProvince] = useState<string>('British Columbia');
  const [purchasePrice, setPurchasePrice] = useState<number | string>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number | string>(0);
  const [interestRate, setInterestRate] = useState<number | string>(5.34);
  const [amortizationPeriod, setAmortizationPeriod] = useState<number | string>(25);
  const [propertyTax, setPropertyTax] = useState<number | string>(1336.87);
  const [heatingCost, setHeatingCost] = useState<number | string>(175);
  const [errors, setErrors] = useState<{ income?: string, downPayment?: string }>({});
  const validateInputs = () => {
    let isValid = true;
    const newErrors: { income?: string, downPayment?: string } = {};
    const incomeNum = parseFloat(income);
    const downPaymentNum = parseFloat(downPayment);

    // for income input 
    if (isNaN(incomeNum) || incomeNum < 1000 || incomeNum > 1500000) {
      newErrors.income = "You didn't enter a valid income amount. Enter an income between $1,000 and $1,500,000.";
      isValid = false;
    }
    // to validate down payement input 
    if (isNaN(downPaymentNum) || downPaymentNum < 1000 || downPaymentNum > 4850000) {
      newErrors.downPayment = "You didn't enter a valid down payment amount. Enter a value between $1,000 and $4,850,000.";
      isValid = false;
    }
    // setting validation errors state
    setErrors(newErrors);
    return isValid;
  };

  const calculateAffordability = () => {
    if (!validateInputs()) return;

    const annualIncome = parseFloat(income);
    const monthlyGrossIncome = annualIncome / 12;
    const monthlyDebts = parseFloat(debts) + parseFloat(creditCardDebt) + parseFloat(condoFees);
    const frontEndRatio = 0.28;
    const backEndRatio = 0.36;

    const maxMonthlyHousingPayment = monthlyGrossIncome * frontEndRatio;
    const maxTotalDebtPayment = monthlyGrossIncome * backEndRatio;

    const availableForHousing = maxTotalDebtPayment - monthlyDebts;
    const finalMonthlyHousingPayment = Math.min(maxMonthlyHousingPayment, availableForHousing);

    // parse numeric inputs
    const propertyTaxPerMonth = typeof propertyTax === 'string' ? parseFloat(propertyTax) : propertyTax;
    const condoFeesNum = typeof condoFees === 'string' ? parseFloat(condoFees) : condoFees;
    const heatingCostNum = typeof heatingCost === 'string' ? parseFloat(heatingCost) : heatingCost;
    const principalAndInterest = finalMonthlyHousingPayment - (propertyTaxPerMonth / 12) - (condoFeesNum + heatingCostNum);

    // parse interest rate and amortization period
    const interestRateNum = typeof interestRate === 'string' ? parseFloat(interestRate) : interestRate;
    const r = (interestRateNum / 100) / 12;
    const amortizationPeriodNum = typeof amortizationPeriod === 'string' ? parseInt(amortizationPeriod) : amortizationPeriod;
    const n = amortizationPeriodNum * 12;

    // loan amount calculation
    const loanAmount = principalAndInterest / (r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
    const estimatedPurchasePrice = loanAmount + parseFloat(downPayment);

    setPurchasePrice(estimatedPurchasePrice.toFixed(2));
    setMonthlyPayment(finalMonthlyHousingPayment.toFixed(2));
  };

  return (
    <div className="calculator-container">
      <h1>Mortgage Affordability Calculator</h1>
      <h2>Let's start with the basics</h2>
      <div className="basic-inputs">
        <div>
          <label>Total gross annual household income</label>
          <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
          {errors.income && <p className="error">{errors.income}</p>}
        </div>
        <div>
          <label>Down payment</label>
          <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
          {errors.downPayment && <p className="error">{errors.downPayment}</p>}
        </div>
        <div>
          <label>Province or territory of residence</label>
          <select value={province} onChange={(e) => setProvince(e.target.value)}>
            {provinces.map(province => <option key={province} value={province}>{province}</option>)}
          </select>
        </div>
        <div>
          <label>Loans and other debts (per month)</label>
          <input type="number" value={debts} onChange={(e) => setDebts(e.target.value)} />
        </div>
        <div>
          <label>Credit cards and lines of credit (total owing)</label>
          <input type="number" value={creditCardDebt} onChange={(e) => setCreditCardDebt(e.target.value)} />
        </div>
        <div>
          <label>Monthly condo fees (if applicable)</label>
          <input type="number" value={condoFees} onChange={(e) => setCondoFees(e.target.value)} />
        </div>
      </div>
      <button onClick={calculateAffordability}>Calculate</button>
      {parseFloat(purchasePrice as string) > 0 && (
        <>
          <div className="affordability-estimate">
            <div>
              <h2>Maximum purchase price</h2>
              <p>${purchasePrice}</p>
            </div>
            <div>
              <h2>Monthly mortgage payment</h2>
              <p>${monthlyPayment}</p>
            </div>
          </div>
          <p className="tip">Tip: Consider increasing your down payment to qualify for a higher purchase price.</p>
          <div className="edit-expenses">
            <div>
              <label>Mortgage term</label>
              <select>
                <option>5-year fixed closed</option>
                <option>10-year fixed closed</option>
              </select>
            </div>
            <div>
              <label>Interest rate (%)</label>
              <input type="number" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
            </div>
            <div>
              <label>Amortization period (years)</label>
              <input type="number" value={amortizationPeriod} onChange={(e) => setAmortizationPeriod(parseInt(e.target.value))} />
            </div>
            <div>
              <label>Property tax per month</label>
              <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(parseFloat(e.target.value))} />
            </div>
            <div>
              <label>Heating cost per month</label>
              <input type="number" value={heatingCost} onChange={(e) => setHeatingCost(parseFloat(e.target.value))} />
            </div>
          </div>
        </>
      )}
      <div className="additional-info">
        <h2>Current Mortgage Rates in Canada</h2>
        <p>As of July 2024, here are some of the best mortgage rates available:</p>
        <ul>
          <li><strong>BMO:</strong> 3-year fixed term at 7.20%, 5-year fixed term at 7.04%, 5-year variable at 7.20%.</li>
          <li><strong>RBC:</strong> 5-year fixed rate at 5.14%, 5-year variable rate at 6.49%.</li>
          <li><strong>Nesto:</strong> 5-year fixed rate at 4.69%, 3-year variable rate at 6.35%.</li>
          <li><strong>Simplii Financial:</strong> 3-year fixed rate at 5.59%, 5-year fixed rate at 5.49%.</li>
        </ul>
        <p>It's important to compare rates from different lenders to ensure you get the best deal. Each lender offers unique benefits and conditions, so be sure to consider factors like prepayment options, rate hold periods, and additional perks such as cash back or points.</p>
        <h2>Benefits of Different Mortgage Types</h2>
        <p>When choosing a mortgage, you'll encounter various options such as fixed-rate, variable-rate, and hybrid mortgages. Here's a brief overview:</p>
        <ul>
          <li><strong>Fixed-Rate Mortgage:</strong> Provides stability with consistent payments over the term. Ideal for those who prefer predictable budgeting.</li>
          <li><strong>Variable-Rate Mortgage:</strong> Typically offers lower initial rates, but payments can fluctuate with market changes. Good for those who expect rates to fall or stay steady.</li>
          <li><strong>Hybrid Mortgage:</strong> Combines features of both fixed and variable rates.</li>
        </ul>
      </div>
    </div>
  );
};
export default MortgageCalculator;
