import express = require("express");
import expressGraphQL = require("express-graphql")
import { Schema } from './schema';

const app = express();


app.use('/graphql', expressGraphQL({
    schema: Schema,
    graphiql: true
}));

app.listen(4000);

