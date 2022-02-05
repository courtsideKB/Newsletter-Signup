import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import {
    fileURLToPath
} from 'url';
import {
    dirname
} from 'path';
import mailchimp from "@mailchimp/mailchimp_marketing";

const API_KEY = process.env.MY_API_KEY;
const SERVER_PREFIX = process.env.MY_SERVER_PREFIX;
const URL = process.env.MY_URL;

mailchimp.setConfig({
    apiKey: API_KEY,
    server: SERVER_PREFIX,
    url: URL,
});

/* ---- Debugging ---- */

// Async function is not executing

/* const run = async () => {
    const response = await mailchimp.ping.get();
    console.log(response);
};

run(); */

/* ---- 1st Solution ---- */

const run = async () => {
    try {
        const response = await mailchimp.ping.get();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
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
        try {
            const response = await mailchimp.lists.addListMember(listId, {
                email_address: subscribedUser.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: subscribedUser.firstName,
                    LNAME: subscribedUser.lastName,
                }
            });
            console.log(response);
            res.sendFile(__dirname + "/success.html");
        } catch (err) {
            console.error(err);
            res.sendFile(__dirname + "/failure.html");
        }
    };

    run();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});