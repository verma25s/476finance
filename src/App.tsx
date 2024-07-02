import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './app.css';
import './pages/home.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Aside from './components/Aside';
import Login from './pages/Login/Login';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Market from './pages/market/Market';
import PersonalFinance from './pages/personalFinance/PersonalFinance';
import { Top_gainers } from './pages/top_gainers'
import { Top_losers } from './pages/Top_losers'
import { useCookies } from 'react-cookie';
import {MessageBoard} from './pages/messages'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userEmail']);
  return (
    <Router>
      <div className="App">
       
        <Header />
        {cookies.userEmail ? <p>Welcome {cookies.userEmail}</p> : <p>Not logged in</p>}
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/market/*" element={<Market />} />
          <Route path="/personalFinance/*" element={<PersonalFinance />} />
         
        </Routes>
        <div>
      
      </div>
        <Footer />
      </div>
    </Router>
  );
}

const Header = () => {
  return (
    <header>
      <div>
      <Link to="/" className="logo"><h1><strong>476 Finance</strong></h1></Link>
        
    
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
          
          <Section id="graphs" title="Graphical analysis" content=<Top_gainers/>/>
          <Section id="Top 3's" title="Top 3's" content= <Top_losers/> />
          <Section id="Latest Finance and Business News" title="Latest Finance and Business News" content=<MessageBoard/> />
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
      <div className="graph">{content}</div>
    </section>
  );
}



export default App;
