import React from 'react';
import './app.css';
import {   BrowserRouter,   Routes,    Route,   } from "react-router-dom";
import { useState, useEffect } from "react";
import {Navbar} from './pages/navbar'
import { Home } from './pages/home'
import { Forum } from './pages/forum'
import { Scanner } from './pages/scanner'



function App() {
  return (
    <div className="App">
<BrowserRouter>
    <Navbar/>
      <main className="nav-content">
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/Forum" element ={<Forum/>}/>
        <Route path="/Scanner" element ={<Scanner/>}/>
        <Route path="*" element ={<h1>Page Not Found</h1>}/>
      </Routes>
     </main>
</BrowserRouter> 



    </div>


  );
}

export default App;
