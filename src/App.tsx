import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './app.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Aside from './components/Aside';
import Login from './pages/Login/Login';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Market from './pages/market/Market';
import PersonalFinance from './pages/personalFinance/PersonalFinance';

const App = () => {
  return (
    <Router>
      <div className="App">
       
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/market/*" element={<Market />} />
          <Route path="/personalFinance/*" element={<PersonalFinance />} />
         
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

const Header = () => {
  return (
    <header>
      <div>
        <h1><strong>476 Finance</strong></h1>
        <p><i>Welcome to the new financial world</i></p>
      </div>
      <Nav />
      <div className="search-auth">
        <input type="text" placeholder="Search..." className="search-box" />
        <button className="search-button">Search</button>
      </div>
    </header>
  );
}

const MainContent = () => {
  return (
    <main>
      <div className="main-content">
        <div className="tabs-content">
          <Section id="Current Market" title="Market" content={<Link to="/market">Market</Link>} />
          <Section id="graphs" title="Graphical analysis" content="[Analytical Graphs]" />
          <Section id="Top 3's" title="Top 3's" content="[Tabular representation]" />
          <Section id="Latest Finance and Business News" title="Latest Finance and Business News" content="[News Content]" />
        </div>
        <Aside />
      </div>
    </main>
  );
}

interface SectionProps {
  id: string;
  title: string;
  content: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, content }) => {
  return (
    <section id={id}>
      <h2>{title}</h2>
      <div className="graph">{content}</div>
    </section>
  );
}

export default App;
