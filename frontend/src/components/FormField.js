import axios from "axios";
import {pwnedPassword} from "hibp";
import { useEffect, useState } from "react";

function FormField({ onChange }) {
    const [data, setData] = useState();
    const [numPwns, setNumPwns] = useState(0);
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState("");

    useEffect(() => {
        setLoading(true);
        axios
        .post("http://localhost:5000/api/pwds", { value: password })
        .then((res) => {
            setData(res.data);
            setLoading(false);
        });
    }, [password]);

    const handleChange = (e) => {
        setPassword(e.target.value);
        pwnedPassword(password).then((numPwns) => {
            setNumPwns(numPwns);
        });
        onChange();
    };

    const handleChecked = (e) =>
        e.target.checked
            ? (document.querySelector("#password-input").type = "text")
            : (document.querySelector("#password-input").type = "password");

    return (
        <div style={{ marginTop: "30px" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "30vw",
                }}
            >
                <input
                    style={{ width: "100%" }}
                    id="password-input"
                    name="password"
                    type="password"
                    placeholder="Enter your password here"
                    onChange={handleChange}
                />
                <input
                    style={{ marginLeft: "50px" }}
                    type="checkbox"
                    onChange={handleChecked}
                />
            </div>
            <br />
            {loading ? (
                <>Loading...</>
            ) : (
                <>
                    <label id="result-label">{data.time}</label>
                    <h2 id="pwn" > Number of times your password has been leaked: {password ? numPwns : 0} </h2>
                </>
            )}
        </div>
    );
}

export default FormField;
