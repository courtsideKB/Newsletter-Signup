import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import got from "got";
import {
    fileURLToPath
} from 'url';
import {
    dirname
} from 'path';
import mailchimp from "@mailchimp/mailchimp_marketing";

const API_KEY = process.env.MY_API_KEY;
const SERVER_PREFIX = process.env.MY_SERVER_PREFIX

mailchimp.setConfig({
    apiKey: API_KEY,
    server: SERVER_PREFIX,
});

async function run() {
    const response = await mailchimp.ping.get();
    console.log(response);
};

run();

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

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