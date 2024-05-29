import React from 'react';
import './app.css';
import {   BrowserRouter,   Routes,    Route,   } from "react-router-dom";
import React, { useState } from "react";
import {Navbar} from './pages/navbar'
import { Home } from './pages/home'
import { Forum } from './pages/forum'
import { Scanner } from './pages/scanner'



function App() {
  return (
    <div className="App">
<BrowserRouter>
    <div className="navbar"><h2>Navbar</h2>
    <Navbar/>
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/Forum" element ={<Forum/>}/>
        <Route path="/Scanner" element ={<Scanner/>}/>
        <Route path="*" element ={<h1>Page Not Found</h1>}/>
      </Routes>
      </div> 
    </BrowserRouter> 


    </div>
  );
}

export default App;
