"use strict";
exports.__esModule = true;
var GQL = require("graphql");
var SQL = require("sqlite3");
var data = [
    { id: '1', name: 'John Doe', email: 'john@doe.com', age: 42 },
    { id: '2', name: 'Jane Doe', email: 'jane.doe@gmail.com', age: 35 },
    { id: '3', name: 'Hulusi Bey', email: 'hulusi.bey@turkishmusic.org', age: 31 },
    { id: '4', name: 'Mahmut Bey', email: 'mahmut.ibnesi@turkishmusic.org', age: 32 }
];
var db = new SQL.Database("data.db");
var sqlToPromise = function (f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        var cb = function (err, res) { return err ? reject(err) : resolve(res); };
        args.push(cb);
        f.apply(args);
    });
};
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
            resolve: function (parent, args) {
                sqlToPromise(db.get, "select * from customers where id=?", args['id']);
            }
        },
        customers: {
            type: new GQL.GraphQLList(CustomerType),
            resolve: function (parent, args) {
                sqlToPromise(db.all, "select * from customers");
            }
        }
    }
});
exports.Schema = new GQL.GraphQLSchema({
    query: RootQuery
});
