import React, { useState } from "react";
import "./home.css";

export const Home = () =>{

return (
<div className="container">

<div className="flex-child portfolio">
<h1> Watchlist</h1>
</div>
<div className="flex-child gainers">
<h1> Top Gainers</h1>

</div>

<div className="flex-child losers">
<h1>Top Losers</h1>
    
</div>

<div className="flex-child messages">
<h2> Messages</h2>
    
</div>



</div>

);
}