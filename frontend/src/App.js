import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Header from "./components/Header";
import Body from "./components/Body";

function App() {
    return (
        <Router>
            <>
                <div
                    className="intro"
                    style={{
                        backgroundImage: "url('banner.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%",
                    }}
                >
                    <Header
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            margin: 20,
                        }}
                    />
                    <Routes>
                        <Route exact path="/" element={<Body />} />
                        <Route exact path="/about" element={<About />} />
                    </Routes>
                </div>
            </>
        </Router>
    );
}

export default App;
