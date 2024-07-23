import React, { useState } from 'react';
import './Taxes.css';

interface TaxBracket {
  income: string;
  rate: number;
}

interface ProvincialTaxBrackets {
  [key: string]: TaxBracket[];
}

const federalTaxBrackets: TaxBracket[] = [
  { income: '$0 - $50,197', rate: 15 },
  { income: '$50,198 - $100,392', rate: 20.5 },
  { income: '$100,393 - $155,625', rate: 26 },
  { income: '$155,626 - $221,708', rate: 29 },
  { income: 'Over $221,708', rate: 33 }
];

const provincialTaxBrackets: ProvincialTaxBrackets = {
  Alberta: [
    { income: 'Up to $148,269', rate: 10 },
    { income: '$148,270 - $177,922', rate: 12 },
    { income: '$177,923 - $237,230', rate: 13 },
    { income: '$237,231 - $355,845', rate: 14 },
    { income: 'Over $355,846', rate: 15 }
  ],
  BritishColumbia: [
    { income: 'Up to $47,937', rate: 5.06 },
    { income: '$47,938 - $95,875', rate: 7.7 },
    { income: '$95,876 - $110,076', rate: 10.5 },
    { income: '$110,077 - $133,664', rate: 12.29 },
    { income: '$133,665 - $181,232', rate: 14.7 },
    { income: 'Over $181,233', rate: 16.8 }
  ],
  Manitoba: [
    { income: 'Up to $47,000', rate: 10.8 },
    { income: '$47,001 - $100,000', rate: 12.75 },
    { income: 'Over $100,001', rate: 17.4 }
  ],
  NewBrunswick: [
    { income: 'Up to $49,958', rate: 9.4 },
    { income: '$49,959 - $99,916', rate: 14 },
    { income: '$99,917 - $185,064', rate: 16 },
    { income: 'Over $185,065', rate: 19.5 }
  ],
  NewfoundlandAndLabrador: [
    { income: 'Up to $43,198', rate: 8.7 },
    { income: '$43,199 - $86,395', rate: 14.5 },
    { income: '$86,396 - $154,244', rate: 15.8 },
    { income: '$154,245 - $215,943', rate: 17.8 },
    { income: '$215,944 - $275,870', rate: 19.8 },
    { income: 'Over $275,871', rate: 20.8 }
  ],
  NorthwestTerritories: [
    { income: 'Up to $50,597', rate: 5.9 },
    { income: '$50,598 - $101,198', rate: 8.6 },
    { income: '$101,199 - $164,525', rate: 12.2 },
    { income: 'Over $164,526', rate: 14.05 }
  ],
  NovaScotia: [
    { income: 'Up to $29,590', rate: 8.79 },
    { income: '$29,591 - $59,180', rate: 14.95 },
    { income: '$59,181 - $93,000', rate: 16.67 },
    { income: '$93,001 - $150,000', rate: 17.5 },
    { income: 'Over $150,001', rate: 21 }
  ],
  Nunavut: [
    { income: 'Up to $53,268', rate: 4 },
    { income: '$53,269 - $106,537', rate: 7 },
    { income: '$106,538 - $173,205', rate: 9 },
    { income: 'Over $173,206', rate: 11.5 }
  ],
  Ontario: [
    { income: 'Up to $51,446', rate: 5.05 },
    { income: '$51,447 - $102,894', rate: 9.15 },
    { income: '$102,895 - $150,000', rate: 11.16 },
    { income: '$150,001 - $220,000', rate: 12.16 },
    { income: 'Over $220,001', rate: 13.16 }
  ],
  PrinceEdwardIsland: [
    { income: 'Up to $32,656', rate: 9.8 },
    { income: '$32,657 - $64,313', rate: 13.8 },
    { income: 'Over $64,314', rate: 16.7 }
  ],
  Quebec: [
    { income: 'Up to $51,780', rate: 14 },
    { income: '$51,781 - $103,545', rate: 19 },
    { income: '$103,546 - $126,000', rate: 24 },
    { income: 'Over $126,001', rate: 25.75 }
  ],
  Saskatchewan: [
    { income: 'Up to $52,057', rate: 10.5 },
    { income: '$52,058 - $148,734', rate: 12.5 },
    { income: 'Over $148,735', rate: 14.5 }
  ],
  Yukon: [
    { income: 'Up to $55,867', rate: 6.4 },
    { income: '$55,868 - $111,733', rate: 9 },
    { income: '$111,734 - $173,205', rate: 10.9 },
    { income: '$173,206 - $500,000', rate: 12.8 },
    { income: 'Over $500,001', rate: 15 }
  ]
};

interface TaxService {
  name: string;
  description: string;
  link: string;
}

const taxServiceCompanies: TaxService[] = [
  { name: 'H&R Block', description: 'Comprehensive tax services.', link: 'https://www.hrblock.ca' },
  { name: 'TurboTax', description: 'Self-filing tax software with expert help.', link: 'https://www.turbotax.ca' },
  { name: 'KPMG', description: 'Professional services for complex tax situations.', link: 'https://home.kpmg/ca' }
];

const Taxes = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>('Alberta');
  const [income, setIncome] = useState<string>('');
  const [calculatedTax, setCalculatedTax] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('H&R Block');

  const calculateTotalTax = () => {
    const incomeNumber = parseFloat(income);
    if (!incomeNumber || incomeNumber < 0) {
      alert('Please enter a valid income.');
      return;
    }
    
    let remainingIncome = incomeNumber;

    const federalTax = federalTaxBrackets.reduce((acc: number, bracket: TaxBracket) => {
      const maxIncome = parseFloat(bracket.income.split(' ')[2]?.replace(',', '').replace('$', '')) || remainingIncome;
      const taxableIncome = Math.min(remainingIncome, maxIncome);
      remainingIncome -= taxableIncome;
      return acc + (taxableIncome * bracket.rate / 100);
    }, 0);

    remainingIncome = incomeNumber;
    const provinceBrackets = provincialTaxBrackets[selectedProvince];
    const provincialTax = provinceBrackets.reduce((acc: number, bracket: TaxBracket) => {
      const maxIncome = parseFloat(bracket.income.replace('Up to ', '').replace('Over ', '').replace(',', '').replace('$', '')) || remainingIncome;
      const taxableIncome = Math.min(remainingIncome, maxIncome);
      remainingIncome -= taxableIncome;
      return acc + (taxableIncome * bracket.rate / 100);
    }, 0);

    setCalculatedTax(`Federal Tax: $${federalTax.toFixed(2)}, Provincial Tax: $${provincialTax.toFixed(2)}, Total Tax: $${(federalTax + provincialTax).toFixed(2)}`);
  };

  const renderTabContent = () => {
    const company = taxServiceCompanies.find(company => company.name === activeTab);
    return (
      <div className="company-info">
        <h3>{company?.name}</h3>
        <p>{company?.description}</p>
        <a href={company?.link} target="_blank" rel="noopener noreferrer">Visit Website</a>
      </div>
    );
  };

  return (
    <div className="taxes-container">
      <h1>Understanding Canadian Taxes</h1>
      <section className="tax-info">
        <h2>Taxes:</h2>
        <p>Add information about Canadian Tax <a href="https://www.canada.ca/en/revenue-agency.html" target="_blank" rel="noopener noreferrer">browse online</a></p>
      </section>
      <div className="tax-calculator">
        <h2>See Your Tax Bracket</h2>
        <label htmlFor="province">Select your province:</label>
        <select id="province" onChange={(e) => setSelectedProvince(e.target.value)} value={selectedProvince}>
          {Object.keys(provincialTaxBrackets).map(province => (
            <option key={province} value={province}>{province.replace(/([A-Z])/g, ' $1').trim()}</option>
          ))}
        </select>
        <label htmlFor="income">Enter Your Income:</label>
        <input type="number" id="income" value={income} onChange={(e) => setIncome(e.target.value)} />
        <button onClick={calculateTotalTax}>Calculate</button>
        {calculatedTax && (
          <div className="calculated-tax-box">
            <p>Your total tax information is:</p>
            <p>{calculatedTax}</p>
          </div>
        )}
      </div>
      <section>
        <h2>Provincial Tax Brackets</h2>
        <table>
          <thead>
            <tr>
              <th>Income Range</th>
              <th>Tax Rate (%)</th>
            </tr>
          </thead>
          <tbody>
            {provincialTaxBrackets[selectedProvince].map((bracket, index) => (
              <tr key={index}>
                <td>{bracket.income}</td>
                <td>{bracket.rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <hr className="horizontal-bar" />
      <section className="tax-services">
        <h2 className="services-header">TAX SERVICES</h2>
        <div className="tabs">
          {taxServiceCompanies.map((company, index) => (
            <button
              key={index}
              className={`tab ${activeTab === company.name ? 'active' : ''}`}
              onClick={() => setActiveTab(company.name)}
            >
              {company.name}
            </button>
          ))}
        </div>
        {renderTabContent()}
      </section>
    </div>
  );
};

export default Taxes;