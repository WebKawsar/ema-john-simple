import React from 'react';
import logo from "../../images/logo.png";
import "./Header.css";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt="Ema John Logo"/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {
                    loggedInUser.email ? <span style={{color: "goldenrod"}}>Welcome {loggedInUser.name} <button onClick={() => setLoggedInUser({})}> Log Out</button></span> : <Link to="/login">Login</Link>
                }
            </nav>
        </div>
    );
};

export default Header;