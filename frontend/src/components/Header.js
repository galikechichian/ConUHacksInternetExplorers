import logo from "../logo.png";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";


const headerStyles = {
    position: "absolute",
};

function Header() {
    return (
        <div>
            <Link to="/">Password Evaluation</Link>
            <br />
            <Link to="/about">About us</Link>
            <div className="header" style={headerStyles}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                            <div className="full">
                                <div className="center-desk">
                                    <div className="logo">
                                        <a href="/">
                                            <img src={logo} alt="#" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
