import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <VideoBackground />
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

const VideoBackground: React.FC = () => {
  return (
    <div className="video-background">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/921VbEMAwwY?autoplay=1&mute=1&loop=1&playlist=921VbEMAwwY&controls=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}

const Header: React.FC = () => {
  return (
    <header>
      <div className="logo">
        <h1><strong>476 Finance</strong></h1>
        <p><i>Welcome to the new financial World</i></p>
      </div>
      <Nav />
      <div className="search-auth">
        <input type="text" placeholder="Search..." className="search-box" />
        <button className="search-button">Search</button>
        <div className="auth-buttons"></div>
      </div>
    </header>
  );
}

const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><a href="#market">Market</a>
          <ul className="dropdown">
            <li><a href="#stock-market">Stock Market</a></li>
            <li><a href="#crypto-currency">Cryptocurrency</a></li>
            <li><a href="#trending">Trending</a></li>
            <li><a href="#losers">Losers</a></li>
            <li><a href="#mutual-funds">Mutual Funds</a></li>
            <li><a href="#future">Future</a></li>
          </ul>
        </li>
        <li><a href="#personal-finance">Personal Finance</a>
          <ul className="dropdown">
            <li><a href="#credit-cards">Credit Cards</a></li>
            <li><a href="#student-loans">Student Loans</a></li>
            <li><a href="#personal-loans">Personal Loans</a></li>
            <li><a href="#insurance">Insurance</a></li>
            <li><a href="#mortgages">Mortgages</a></li>
            <li><a href="#mortgage-calculator">Mortgage Calculator</a></li>
            <li><a href="#taxes">Taxes</a></li>
          </ul>
        </li>
        <li><a href="#research">Research</a>
          <ul className="dropdown">
            <li><a href="#screeners">Screeners</a></li>
            <li><a href="#watchlist">Watchlist</a></li>
            <li><a href="#calendar">Calendar</a></li>
            <li><a href="#stock-comparison">Stock Comparison</a></li>
            <li><a href="#advice-charts">Advice Charts</a></li>
            <li><a href="#currency-converter">Currency Converter</a></li>
            <li><a href="#investment-ideas">Investment Ideas</a></li>
            <li><a href="#research-report">Research Report</a></li>
          </ul>
        </li>
        <li><a href="#news">News</a>
          <ul className="dropdown">
            <li><a href="#latest-news">Latest News</a></li>
            <li><a href="#stock-market-news">Stock Market</a></li>
            <li><a href="#originals">Originals</a></li>
            <li><a href="#economics">Economics</a></li>
            <li><a href="#housing">Housing</a></li>
            <li><a href="#earnings">Earnings</a></li>
            <li><a href="#tech">Tech</a></li>
            <li><a href="#crypto-news">Crypto</a></li>
          </ul>
        </li>
        <li><a href="#newcomers">Newcomers</a>
          <ul className="dropdown">
            <li><a href="#student">Student</a></li>
            <li><a href="#non-student">Non-Student</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

const MainContent: React.FC = () => {
  return (
    <main>
      <div className="main-content">
        <div className="tabs-content">
          <Section id="Current Market" title="Market" content="[Market Graphs]" />
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
  content: string;
}

const Section: React.FC<SectionProps> = ({ id, title, content }) => {
  return (
    <section id={id}>
      <h2>{title}</h2>
      <div className="graph">{content}</div>
    </section>
  );
}

const Aside: React.FC = () => {
  return (
    <aside className="auth-sidebar">
      <div className="auth-buttons-sidebar">
        <button className="signup-button">Sign Up</button>
        <button className="login-button">Login</button>
        <button className="create-account-button">Create New Account</button>
      </div>
    </aside>
  );
}

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-disclaimer">
        <p>Disclaimer: All content provided is for informational purposes only and does not constitute financial advice.</p>
      </div>
      <div className="contact-us">
        <h3>Contact Us</h3>
        <p>Email: contact@476finance.com</p>
        <p>Phone: +123-456-7890</p>
      </div>
      <div className="get-in-touch">
        <h3>Get in Touch</h3>
        {/* Social Media Links */}
      </div>
    </footer>
  );
}

export default App;
