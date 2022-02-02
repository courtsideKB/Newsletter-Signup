import "dotenv/config";
import express, { response } from "express";
import bodyParser from "body-parser";
import https from "https";
import got from "got";
import {
    fileURLToPath
} from 'url';
import {
    dirname
} from 'path';
import mailchimp from "@mailchimp/mailchimp_marketing";

const API_KEY = process.env.MY_API_KEY;
const SERVER_PREFIX = process.env.MY_SERVER_PREFIX;
const USERNAME = process.env.MY_USERNAME;

mailchimp.setConfig({
    apiKey: API_KEY,
    server: SERVER_PREFIX,
});

const run = async () => {
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
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const listId = process.env.LIST_ID;
    const subscribedUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
    };

    const run = async () => {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribedUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribedUser.firstName,
                LNAME: subscribedUser.lastName,
            }
        });
        console.log(`Successfully subscribed an audience member. The contacts ID is ${response.id}.`);
    };

    run();
    
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});