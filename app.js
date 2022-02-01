import express from "express";
import bodyParser from "body-parser";
import got from "got";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    var firstName = req.body.fName;
    var lastName = req.body.lName; 
    var email = req.body.email;

    console.log(firstName, lastName, email);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});