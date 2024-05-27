import {  Link, } from "react-router-dom";

export const Navbar = () =>{

return (
    <div>
    <Link to="/">Home</Link>
    <Link to="./Forum">Forum</Link>
    <Link to="/Scanner">Scanner</Link>
</div>);



}