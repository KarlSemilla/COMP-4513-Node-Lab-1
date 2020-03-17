// first reference required modules
const fs = require('fs');
const path = require('path');
const parser = require('body-parser');
const express = require('express');

// for now, we will get our data by reading the provided json file
const jsonPath = path.join(__dirname, 'public',
    'stocks-simple.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');

// convert string data into JSON object
const stocks = JSON.parse(jsonData);

// create an express app
const app = express();

// tell node to use json and HTTP header features in body-parser
app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));

// return all the stocks when a root request arrives
app.get((req, resp) => {
    resp.json(stocks)
});

// Use express to listen to port
let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});