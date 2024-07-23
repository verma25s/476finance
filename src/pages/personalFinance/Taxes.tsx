import React, { useState } from 'react';
import './Taxes.css';

interface TaxBracket {
  income: string;
  rate: number;
}

interface ProvincialTaxBrackets {
  [key: string]: TaxBracket[];
}

interface Address {
  name: string;
  address: string;
}

interface ProvinceAddresses {
  [key: string]: Address[];
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


const provinceAddresses: ProvinceAddresses = {
  Alberta: [
    { name: "Alberta Tax Services Office", address: "9833 109 St NW, Edmonton, AB T5K 2E8" },
    { name: "Calgary Tax Services Office", address: "220 4th Ave SE, Calgary, AB T2G 0L1" }
  ],
  BritishColumbia: [
    { name: "Vancouver Tax Services Office", address: "1166 W Pender St, Vancouver, BC V6E 3H8" },
    { name: "Victoria Tax Services Office", address: "1415 Vancouver St, Victoria, BC V8V 3W4" }
  ],
  Manitoba: [
    { name: "Winnipeg Tax Services Office", address: "360 Main St, Winnipeg, MB R3C 3Z3" },
    { name: "Brandon Tax Services Office", address: "1039 Princess Ave, Brandon, MB R7A 6E2" }
  ],
  NewBrunswick: [
    { name: "Saint John Tax Services Office", address: "126 Prince William St, Saint John, NB E2L 2B6" },
    { name: "Moncton Tax Services Office", address: "777 Main St, Moncton, NB E1C 1E9" }
  ],
  NewfoundlandAndLabrador: [
    { name: "St. John's Tax Services Office", address: "223 Churchill Ave, St. John's, NL A1A 1N3" },
    { name: "Corner Brook Tax Services Office", address: "12 Main St, Corner Brook, NL A2H 6G9" }
  ],
  NorthwestTerritories: [
    { name: "Yellowknife Tax Services Office", address: "4920 52 St, Yellowknife, NT X1A 3T1" },
    { name: "Inuvik Tax Services Office", address: "85 Kingmingya Rd, Inuvik, NT X0E 0T0" }
  ],
  NovaScotia: [
    { name: "Halifax Tax Services Office", address: "1557 Hollis St, Halifax, NS B3J 1V5" },
    { name: "Sydney Tax Services Office", address: "15 Dorchester St, Sydney, NS B1P 5Y9" }
  ],
  Nunavut: [
    { name: "Iqaluit Tax Services Office", address: "924 Mivvik St, Iqaluit, NU X0A 0H0" },
    { name: "Rankin Inlet Tax Services Office", address: "256 Williamson Lake Rd, Rankin Inlet, NU X0C 0G0" }
  ],
  Ontario: [
    { name: "Toronto Centre Tax Services Office", address: "1 Front St W, Toronto, ON M5J 2X6" },
    { name: "Ottawa Tax Services Office", address: "333 Laurier Ave W, Ottawa, ON K1P 1C1" }
  ],
  PrinceEdwardIsland: [
    { name: "Charlottetown Tax Services Office", address: "161 Grafton St, Charlottetown, PE C1A 1K3" },
    { name: "Summerside Tax Services Office", address: "275 Notre Dame St, Summerside, PE C1N 1S5" }
  ],
  Quebec: [
    { name: "Montreal Tax Services Office", address: "305 René-Lévesque Blvd W, Montreal, QC H2Z 1A6" },
    { name: "Quebec City Tax Services Office", address: "2750 Einstein St, Quebec City, QC G1P 4R1" }
  ],
  Saskatchewan: [
    { name: "Regina Tax Services Office", address: "1901 Hamilton St, Regina, SK S4P 3M3" },
    { name: "Saskatoon Tax Services Office", address: "340 3rd Ave N, Saskatoon, SK S7K 2M7" }
  ],
  Yukon: [
    { name: "Whitehorse Tax Services Office", address: "300 Main St, Whitehorse, YT Y1A 2B5" },
    { name: "Dawson City Tax Services Office", address: "998 Front St, Dawson City, YT Y0B 1G0" }
  ]
};

const taxServiceCompanies = [
  { name: 'H&R Block', description: 'Comprehensive tax services.', link: 'https://www.hrblock.ca' },
  { name: 'TurboTax', description: 'Self-filing tax software with expert help.', link: 'https://www.turbotax.ca' },
  { name: 'KPMG', description: 'Professional services for complex tax situations.', link: 'https://home.kpmg/ca' }
];

const Taxes: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>('Alberta');
  const [income, setIncome] = useState<string>('');
  const [calculatedTax, setCalculatedTax] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('Download Tax Forms');

  const calculateTotalTax = () => {
    const incomeNumber = parseFloat(income);
    if (!incomeNumber || incomeNumber < 0) {
      alert('Please enter a valid income.');
      return;
    }

    let remainingIncome = incomeNumber;

    const federalTax = federalTaxBrackets.reduce((acc, bracket) => {
      const maxIncome = parseFloat(bracket.income.split(' ')[2]?.replace(',', '').replace('$', '')) || remainingIncome;
      const taxableIncome = Math.min(remainingIncome, maxIncome);
      remainingIncome -= taxableIncome;
      return acc + (taxableIncome * bracket.rate / 100);
    }, 0);

    remainingIncome = incomeNumber;
    const provinceBrackets = provincialTaxBrackets[selectedProvince];
    const provincialTax = provinceBrackets.reduce((acc, bracket) => {
      const maxIncome = parseFloat(bracket.income.replace('Up to ', '').replace('Over ', '').replace(',', '').replace('$', '')) || remainingIncome;
      const taxableIncome = Math.min(remainingIncome, maxIncome);
      remainingIncome -= taxableIncome;
      return acc + (taxableIncome * bracket.rate / 100);
    }, 0);

    setCalculatedTax(`Federal Tax: $${federalTax.toFixed(2)}, Provincial Tax: $${provincialTax.toFixed(2)}, Total Tax: $${(federalTax + provincialTax).toFixed(2)}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'H&R Block':
        case 'TurboTax':
        case 'KPMG':
          const activeCompany = taxServiceCompanies.find(company => company.name === activeTab);
          return (
            <div className="company-info">
              <h3>{activeCompany?.name}</h3>
              <p>{activeCompany?.description}</p>
              <a href={activeCompany?.link} target="_blank" rel="noopener noreferrer">Visit Website</a>
            </div>
          );
      case 'Download Tax Forms':
        return (
          <div className="tab-content">
            <p>Access all necessary CRA forms and resources directly through our links. Key forms and publications for both individuals and businesses are available for download.</p>
            <ul>
              <li><a href="https://www.canada.ca/en/revenue-agency/services/forms-publications.html" target="_blank" rel="noopener noreferrer">Click Here: Download Tax Forms</a></li>
              
            </ul>
          </div>
        );
      case 'Helpful Publications':
        return (
          <div className="tab-content">
            <p>Explore our collection of helpful publications to better understand the tax system and stay updated with the latest changes.</p>
            <ul>
              <li><a href="https://www.canada.ca/en/revenue-agency/services/forms-publications/publications.html" target="_blank" rel="noopener noreferrer">Click Here: Helpful Publications</a></li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const renderAddresses = () => {
    const addresses = provinceAddresses[selectedProvince] || [];
    return (
      <div className="address-box">
        {addresses.map((address: Address, index: number) => (
          <div key={index}>
            <div className="office-name">{address.name}</div>
            <div>{address.address}</div>
          </div>
        ))}
      </div>
    );
  };  

  return (
    <div className="taxes-container">
      <h1>Welcome to Your Canadian Tax Guide</h1>
      <h2>Understanding Canadian Taxes</h2>
      <p>Welcome to your comprehensive guide on Canadian taxes. Whether you're filing for the first time or looking to understand more about the tax system, this page is your one-stop resource for all things tax-related in Canada, including federal and provincial taxes.</p>
      <h3>Mark these critical dates in your calendar to stay on top of your taxes:</h3>
      <ul>
        <li><strong>April 30:</strong> Deadline for filing personal income tax returns</li>
        <li><strong>June 15:</strong> Deadline for self-employed individuals</li>
        <li><strong>Quarterly Payments:</strong> March 15, June 15, September 15, and December 15</li>
      </ul>
      <h3>Deductions and Credits</h3>
      <p>Discover how you can reduce your taxable income through various deductions and credits available for both individuals and businesses. Learn more about popular deductions such as RRSP contributions, childcare expenses, and educational credits.</p>
      <h3>Guide for Filing Taxes</h3>
      <p>Filing your taxes doesn't have to be complicated. Follow our step-by-step guide to file your taxes efficiently using:</p>
      <ul>
        <li><strong>Paper Filing:</strong> Instructions and required documents</li>
        <li><strong>Online through NETFILE:</strong> A direct link to the CRA's filing system</li>
        <li><strong>Third-party Software:</strong> Recommendations for reliable tax preparation software</li>
      </ul>
      <h3>Resources and Forms</h3>
      <div className="tabs">
        <button className={`tab ${activeTab === 'Download Tax Forms' ? 'active' : ''}`} onClick={() => setActiveTab('Download Tax Forms')}>Download Tax Forms</button>
        <button className={`tab ${activeTab === 'Helpful Publications' ? 'active' : ''}`} onClick={() => setActiveTab('Helpful Publications')}>Helpful Publications</button>
      </div>
      {renderTabContent()}
      <h3>Contact Information</h3>
      <div className="contact-information">
        <p>Need additional help? Contact the Canada Revenue Agency or your provincial tax authority through these links:</p>
      <ul>
        <li><a href="https://www.canada.ca/en/revenue-agency.html" target="_blank" rel="noopener noreferrer">Canada Revenue Agency</a></li>
        <li>
           Provincial Contacts:
          <select onChange={(e) => setSelectedProvince(e.target.value)} value={selectedProvince}>
            {Object.keys(provincialTaxBrackets).map(province => (
           <option key={province} value={province}>{province.replace(/([A-Z])/g, ' $1').trim()}</option>
         ))}
          </select>
         {renderAddresses()}
        </li>
      </ul>
      </div>

      <h3>Tax Brackets and Rates</h3>
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