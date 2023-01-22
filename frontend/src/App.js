import "./App.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Header from "./components/Header";
import Body from "./components/Body";

function App() {
    return (
        <Router>
            <>
                <Link to="/">Password Evaluation</Link>
                <br />
                <Link to="/about">About us</Link>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Body />} />
                    <Route exact path="/about" element={<About />} />
                </Routes>
            </>
        </Router>
        // <>
        //     <Header />
        //     <Body />
        // </>
    );
}

export default App;
