
import { createRequire } from "module"
import { v4 as uuidv4 } from "uuid";
const require = createRequire(import.meta.url)
require('dotenv').config()
import cookieParser from 'cookie-parser';
import path from 'path';
const __dirname = path.resolve();
const Web3 = require('web3')
const Contract = require('web3-eth-contract')
const express = require("express");

const port = 4888

const app = express();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/indexv3.html'))
})


app.get("/gpt", (req, res) => {
    const authToken = req.cookies.authToken;
    if (authToken) {
        res.sendFile(path.join(__dirname, "public/index.html"));
    } else {
        res.redirect("https://gpt-cleaner-bot.onrender.com");
    }
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


