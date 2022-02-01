import express from "express";
import bodyParser from "body-parser";
import got from "got";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});