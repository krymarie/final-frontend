import React from "react";

import "./Logo.css";
import Logo from "./cloutLogo.png";

// const logo = (props) => <h1 className="logo">Client Clout</h1>;
// const logo = (props) => <img src="https://themerkle.com/wp-content/uploads/CLOUTLOGO.png" />;
const logo = (props) => <img className="logo" src={Logo} alt="clout logo"/>;

export default logo;
