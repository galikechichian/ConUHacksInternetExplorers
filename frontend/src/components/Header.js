import logo from "./logo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Header({ style }) {
    return (
        <div style={style}>
            <Link to="/">Password Evaluation</Link>
            <br />
            <Link to="/about">About us</Link>
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                            <div className="full">
                                <div className="center-desk">
                                    <div className="logo">
                                        <a href="/">
                                            <img
                                                style={{ width: "10vw" }}
                                                src={logo}
                                                alt="#"
                                            />
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
