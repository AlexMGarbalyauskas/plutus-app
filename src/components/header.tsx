import React from "react";
import Logo from "../logo.png";
import AVAX from "../avax.png";
import { Link } from "react-router-dom";

export const Header = () => {
const account = useAcc

    return (
        <header>
            <div className="leftH">
                <img src={Logo} alt="logo" className="logo" />
                <Link to="/" className="link">
                    <div className="headerItem">Swap</div>
                </Link>
                <Link to="/signup" className="link">
                    <div className="headerItem">signup</div>
                </Link>
            </div>
            <div className="rightH">
                <div className="headerItem">
                    <img src={AVAX} alt="avax" className="avax" />
                    AVAX
                </div>
                <div className="connectButton" onClick={connect}>
                    {isConnected ? (address.slice(0, 4) + "..." + address.slice(38)) : "Connect"}
                </div>
            </div>
        </header>
    );
}

