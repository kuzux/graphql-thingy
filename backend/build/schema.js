"use strict";
exports.__esModule = true;
var GQL = require("graphql");
var CustomerType = new GQL.GraphQLObjectType({
    name: "Customer",
    fields: function () { return ({
        id: { type: GQL.GraphQLString },
        name: { type: GQL.GraphQLString },
        email: { type: GQL.GraphQLString },
        age: { type: GQL.GraphQLInt }
    }); }
});
var RootQuery = new GQL.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        customer: {
            type: CustomerType,
            args: { id: { type: GQL.GraphQLString } },
            resolve: function (parent, args) { return ({ id: 'asd', name: 'asd qwe', email: 'asd@qwe.com', age: 42 }); }
        }
    }
});
exports.Schema = new GQL.GraphQLSchema({
    query: RootQuery
});
