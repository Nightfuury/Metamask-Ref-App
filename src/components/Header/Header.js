import React from "react";
import { NavLink } from "react-router-dom";

import { shortAddress } from "../../utils/format/address.format";
import { MetamaskContext } from "../../contexts/metamask/metamask.context";

const Header = () => {
  const { handleMetamaskConnection, connectedAccount, connectedNetwork } =
    React.useContext(MetamaskContext);

  return (
    <div className="row">
      <header id="home">
        <nav className="navbar navbar-inverse navbar-custom navbar-fixed-top">
          <div className="container">
            <div className="navbar navbar-header">
              <a className="navbar-brand navbar-logo flex-class" href="#">
                <img
                  className="logo-nav"
                  src="assets/img/logo.jpeg"
                  alt="logo"
                  style={{ height: "3rem", borderRadius: "50%" }}
                />
                <h3 className="logo-nav-text">Arbieggs.care</h3>
              </a>
              <button
                type="button"
                className="navbar-toggle custom-toggle-btn"
                data-toggle="collapse"
                data-target="#main-nav"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse flex-class" id="main-nav">
              <ul className="nav navbar-nav navbar-right">
                <li className="plain-link">
                  <a href="#home">Home</a>
                </li>
                <li className="plain-link">
                  <a href="#about">About</a>
                </li>
                {/* <li className="plain-link">
                  <a href="#stats">TVL Stats</a>
                </li> */}
                <li className="plain-link mr-35">
                  <a href="#funds">Funds</a>
                </li>
                <div className="text-center flex-class1">
                  <a href="#" className="button-game" style={{ width: "auto" }}>
                    <span className="button-game-bg-left"></span>
                    <span className="button-game-bg-mid">
                      {!connectedAccount && (
                        <span className="button-game-bg-mid"
                          onClick={() => handleMetamaskConnection()}
                        >
                          {" "}
                          <span>Connect Wallet&nbsp;&nbsp;</span>
                        </span>
                      )}

                      {connectedAccount != null && (
                        <span>
                          {shortAddress(connectedAccount, 10)}&nbsp;&nbsp;
                        </span>
                      )}
                    </span>
                    <span className="button-game-bg-right"></span>
                  </a>
                </div>
              </ul>
            </div>
          </div>
        </nav>
        {/* <h1>
          <img
            className="big-logo"
            src="assets/img/logo.png"
            alt="logo"
            id="home"
            style={{ opacity: "1", height: "3rem" }}
          />
        </h1> */}
      </header>
    </div>
  );
};

export default Header;
