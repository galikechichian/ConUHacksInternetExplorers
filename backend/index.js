const express = require("express");
const path = require("path");
const functions = require("./dep");
const app = express();

const PORT = 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get("/api/pwds", (req, res) => {
    const password = req.headers.value;
    res.send("OK");
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});
