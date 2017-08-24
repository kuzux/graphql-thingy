import * as GQL from 'graphql';
import * as SQL from 'sqlite3';

const data = [
    { id: '1', name: 'John Doe', email: 'john@doe.com', age: 42 },
    { id: '2', name: 'Jane Doe', email: 'jane.doe@gmail.com', age: 35 },
    { id: '3', name: 'Hulusi Bey', email: 'hulusi.bey@turkishmusic.org', age: 31 },
    { id: '4', name: 'Mahmut Bey', email: 'mahmut.ibnesi@turkishmusic.org', age: 32 }
];


const db = new SQL.Database("data.db");

let sqlToPromise = (f, ...args) => {
    return new Promise<any>((resolve, reject) => {
        const cb = (err, res) => err ? reject(err) : resolve (res);
        args.push(cb);
        f.apply(args);
    });
}

const CustomerType = new GQL.GraphQLObjectType({
    name: "Customer",
    fields: () => ({
        id: { type: GQL.GraphQLString },
        name: { type: GQL.GraphQLString },
        email: { type: GQL.GraphQLString },
        age: { type: GQL.GraphQLInt }
    })
});

const RootQuery = new GQL.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        customer: { 
            type: CustomerType,
            args: { id: { type: GQL.GraphQLString } },
            resolve(parent: any, args: Object){
                sqlToPromise(db.get,"select * from customers where id=?", args['id']);
            }
        },
        customers: {
            type: new GQL.GraphQLList(CustomerType),
            resolve(parent: any, args: Object){
                sqlToPromise(db.all,"select * from customers");
            }
        }
    }
});

export const Schema = new GQL.GraphQLSchema({
    query: RootQuery
});
