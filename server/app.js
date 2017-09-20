/**
 * Title        :   Express Server
 * Created      :   12/09/2017
 * Updated      :   14/09/2017
 * Author       :   Julien Bongars
 * Description  :   Server Application for customers application
 */

'use strict';

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

//redefine console.log with datestamp
console.logCopy = console.log.bind(console);

console.log = function(data)
{
    var dateTimeStamp = "[" + new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString() + "] - ";
    this.logCopy(dateTimeStamp + data);
};

//start instance of express
var app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname , "/../client")));

//Services
var SQL_SERVICE = require('./services/sql');

//Routes
require('./routes/productSQL')(app, SQL_SERVICE);

//route not found
app.use(function(req, res){
    res.send("404 - Request not found!");
})

//Listen
const NODE_PORT = process.env.NODE_PORT || 3000;
app.listen(NODE_PORT, function () {
    console.log("Application started on port " + NODE_PORT);
})

module.exports = app;

