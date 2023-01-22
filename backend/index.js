const express = require("express");
const cors = require("cors");
const path = require("path");

const functions = require("./dep");

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.post("/api/pwds", (req, res) => {
    const password = req.body.value;
    const data = {
        time: functions.get_time(password),
        pwnd: functions.getCompromised(password),
        valid: functions.validPassword(password),
    };
    res.send(data);
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});
