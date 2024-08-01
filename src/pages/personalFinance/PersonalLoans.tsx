import React, { useState } from 'react';
import './PersonalLoans.css';

const providers = [
  {
    name: "TD",
    keyOffering: "Borrow up to $50,000",
    loanAmount: "Up to $50,000",
    link: "https://www.td.com/ca/en/personal-banking/products/borrowing/loans/benefits-of-a-personal-loan",
  },
  {
    name: "CIBC",
    keyOffering: "Specific monthly payment amounts",
    loanAmount: "Minimum $3,000",
    link: "https://www.cibc.com/en/personal-banking/loans-and-lines-of-credit/loans/personal-loan.html",
  },
  {
    name: "Spring Financial",
    keyOffering: "Personal Loans",
    loanAmount: "Varies",
    link: "https://www.springfinancial.ca/personal-loans",
  },
  {
    name: "RBC",
    keyOffering: "Flexible terms, Fixed and variable rates",
    loanAmount: "Terms: 1 - 5 years",
    link: "https://www.rbcroyalbank.com/personal-loans/personal-loans.html",
  },
  {
    name: "Fairstone",
    keyOffering: "Personal Loans From $500-$60,000",
    loanAmount: "$500 - $60,000",
    link: "https://www.fairstone.ca/en/loans/personal-loans",
  },
  {
    name: "Scotiabank",
    keyOffering: "Personal Loans",
    loanAmount: "Varies",
    link: "https://www.scotiabank.com/ca/en/personal/loans-lines/personal-loan.html",
  },
];

const PersonalLoans: React.FC = () => {
  const [activeInfoTab, setActiveInfoTab] = useState<string>('whatIs');
  const [activeProviderTab, setActiveProviderTab] = useState<string | null>(null);

  const renderInfoContent = () => {
    switch (activeInfoTab) {
      case 'whatIs':
        return <WhatIsTab />;
      case 'tips':
        return <TipsTab />;
      default:
        return null;
    }
  };

  const renderProviderContent = () => {
    if (activeProviderTab) {
      const provider = providers.find(p => p.name === activeProviderTab);
      return provider ? <ProviderTab provider={provider} /> : null;
    }
    return null;
  };

  return (
    <div className="tabs-p">
      <nav className="tabs-nav">
        <button className={`tab-link ${activeInfoTab === 'whatIs' ? 'active' : ''}`} onClick={() => setActiveInfoTab('whatIs')}>What is a Personal Loan?</button>
        <button className={`tab-link ${activeInfoTab === 'tips' ? 'active' : ''}`} onClick={() => setActiveInfoTab('tips')}>Tips</button>
      </nav>
      <div className="tab-content">
        {renderInfoContent()}
      </div>
      <div className="divider" />
      <nav className="tabs-nav providers-nav">
        {providers.map((provider) => (
          <button
            key={provider.name}
            className={`tab-link ${activeProviderTab === provider.name ? 'active' : ''}`}
            onClick={() => setActiveProviderTab(provider.name)}
          >
            {provider.name}
          </button>
        ))}
      </nav>
      <div className="tab-content">
        {renderProviderContent()}
      </div>
    </div>
  );
};

const WhatIsTab: React.FC = () => (
  <div className="tab-pane">
    <h2>What is a Personal Loan?</h2>
    <p>
      A personal loan is a type of unsecured loan that helps you meet your current financial needs.
      You borrow money from a lender and pay it back in fixed monthly installments, usually over one to seven years.
    </p>
    <p>Consider your loan purpose, interest rates, and repayment terms before applying.</p>
  </div>
);
const TipsTab: React.FC = () => (
  <div className="tab-pane">
    <h2>Tips on Personal Loans</h2>
    <ul>
      <li><strong>Purpose:</strong> Personal loans can be used for various purposes such as debt consolidation, home improvements, medical bills, or vacations.</li>
      <li><strong>Types:</strong> There are secured loans (requiring collateral) and unsecured loans (no collateral).</li>
      <li><strong>Interest Rates:</strong> These can range from 5% to over 40%, depending on factors like your credit score, income, and whether the loan is secured or unsecured.</li>
      <li><strong>Terms:</strong> Loan terms generally range from 6 months to 10 years. Choose terms based on your repayment capacity and financial goals.</li>
      <li><strong>Fees:</strong> Always check for any origination fees, prepayment penalties, or other hidden charges.</li>
    </ul>
  </div>
);
const ProviderTab: React.FC<{ provider: typeof providers[0] }> = ({ provider }) => (
  <div className="tab-pane">
    <h2>{provider.name}</h2>
    <p><strong>Key Offering:</strong> {provider.keyOffering}</p>
    <p><strong>Loan Amount:</strong> {provider.loanAmount}</p>
    <a href={provider.link} target="_blank" rel="noopener noreferrer">Apply Now</a>
  </div>
);

export default PersonalLoans;

