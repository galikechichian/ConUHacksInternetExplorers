import FormField from "./FormField";
import "../Body.css";

function Body() {
    const updateBar = () => {
        const input = document.getElementById("password-input").value;
        const bar = document.getElementById("bar");
        const width = (input.length / 15) * 100;
        bar.style.width = (width <= 100 ? width : "100") + "%";
    };

    return (
        <div className="intro">
            <h1>Welcome to the Cyber Security Checklist!</h1>

            <p>
                This website is dedicated to ensure that every user is being
                cyber safe while on the Internet.
            </p>

            <FormField onChange={updateBar} />

            <label htmlFor="password">Password Strength:</label>

            <div id="strength-bar">
                <div style={{ width: "0%" }} id="bar"></div>
            </div>
        </div>
    );
}

export default Body;
