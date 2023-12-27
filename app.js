// jshint es6 
const express = require('express');
require("dotenv").config();
const router = require('./router');
const bodyParser= require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({"extended":true})); 
console.log(process.env.APIKEY);
app.use(router);
app.use(express.static('public'));
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
