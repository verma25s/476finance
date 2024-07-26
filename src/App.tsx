import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './app.css';
import './pages/home.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Aside from './components/Aside';

//Pages
import Login from './pages/Login/Login';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Market from './pages/market/Market';
import PersonalFinance from './pages/personalFinance/PersonalFinance';
import { Top_gainers } from './pages/top_gainers';
import { Forum } from './pages/Forum';
import { Top_losers } from './pages/Top_losers';
import { MessageBox } from './pages/messages';
import { SearchBar } from './pages/searchBar';
import { FullPost } from './pages/post';
import {TickerPage} from './pages/tickerPage';
import {News} from './pages/news';
//Personal Finance
import MortgageCalculator from './pages/personalFinance/MortgageCalculator';
import PersonalLoans from './pages/personalFinance/PersonalLoans';
import Taxes from './pages/personalFinance/Taxes';

//CreditCard
import CreditCard from './pages/personalFinance/creditCard/CreditCard'; // Correct import path
import BestCreditCard from './pages/personalFinance/creditCard/BestCreditCard'; // Correct import path
import BestTravelCard from './pages/personalFinance/creditCard/BestTravelCard'; // Correct import path
import BestCashBackCard from './pages/personalFinance/creditCard/BestCashBackCard'; // Correct import path
import BestSignUpOffers from './pages/personalFinance/creditCard/BestSignUpOffers'; // Correct import path
import BestRewardsCards from './pages/personalFinance/creditCard/BestRewardsCards'; // Correct import path
import BestHomeImprovementCards from './pages/personalFinance/creditCard/BestHomeImprovementCards'; // Correct import path

// src/App.tsx
import { useCookies } from 'react-cookie';


const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userEmail']);
  return (
    <Router>
      <div className="App">
        <Header />
        {cookies.userEmail ? <p>Welcome {cookies.userEmail}</p> : <p>Not logged in</p>}
        <Routes>
          <Route path="/" element={< MainContent />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/symbol/:symbol" Component={TickerPage} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/market/*" element={<Market />} />
          <Route path="/forum/:title" Component={FullPost} />
          <Route path="/personalFinance/*" element={<PersonalFinance />} />
          <Route path="/personalFinance/credit-Card" element={<CreditCard />} />
          <Route path="/personalFinance/mortgage-calculator" element = {<MortgageCalculator/>} />
          <Route path="/personalFinance/Taxes" element = {<Taxes/>} />
          <Route path="/personalFinance/personal-loans" element = {<PersonalLoans/>} />
          <Route path="/personalFinance/creditCard/best-credit-cards" element={<BestCreditCard />} />
          <Route path="/personalFinance/creditCard/best-travel-cards" element={<BestTravelCard />} />
          <Route path="/personalFinance/creditCard/best-cash-back-cards" element={<BestCashBackCard />} />
          <Route path="/personalFinance/creditCard/best-sign-up-offers" element={<BestSignUpOffers />} />
          <Route path="/personalFinance/creditCard/best-rewards-cards" element={<BestRewardsCards />} />
          <Route path="/personalFinance/creditCard/best-home-improvement-cards" element={<BestHomeImprovementCards />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/" className="logo"><h1><strong>476 Finance</strong></h1></Link>
      </div>
      <Nav />
      <SearchBar/>
    </header>
  );
};

const MainContent = () => {
  return (
    <main>
      <div className="main-content">
        <div className="tabs-content">
       
          <Section id="graphs" title="Graphical analysis" content={<Top_gainers />} />
          <Section id="Top 3's" title="Top 3's" content={<Top_losers />} />
          <Section id="Latest Finance and Business News" title="Latest Finance and Business News" content={<MessageBox />} />
        </div>
        <Aside />
      </div>
    </main>
  );
};

interface SectionProps {
  id: string;
  title: string;
  content: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, content }) => {
  return (
    <section id={id}>
      <div className="graph">{content}</div>
    </section>
  );
};

export default App;
