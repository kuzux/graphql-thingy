"use strict";
exports.__esModule = true;
var express = require("express");
var expressGraphQL = require("express-graphql");
var schema_1 = require("./schema");
var app = express();
app.use('/graphql', expressGraphQL({
    schema: schema_1.Schema,
    graphiql: true
}));
app.listen(4000);
