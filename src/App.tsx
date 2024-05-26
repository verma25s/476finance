import React from 'react';
import './app.css';
import { Home } from './pages/home'
import { Forum } from './pages/forum'
import { Scanner } from './pages/scanner'

import { 
  BrowserRouter,
   Routes, 
   Route, 
   Link,
  } from "react-router-dom";



function App() {
  return (
    <div className="App">
<BrowserRouter>
<div className="navbar"><h2>Navbar</h2>
<Link to="/">Home</Link>
<Link to="/Forum">Forum</Link>
<Link to="/Scanner">Scanner</Link>
  <Routes>
    <Route path="/" element ={<Home/>}/>
    <Route path="/" element ={<Forum/>}/>
    <Route path="/" element ={<Scanner/>}/>
    <Route path="*" element ={<h1>Page Not Found</h1>}/>
  </Routes>
  </div> 
</BrowserRouter>    

    </div>
  );
}

export default App;
