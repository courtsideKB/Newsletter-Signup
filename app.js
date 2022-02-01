const express = require("express");
const bodyParser = require("body-parser");
const got = require("got");

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});