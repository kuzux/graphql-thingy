import * as GQL from 'graphql';

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
            resolve: (parent, args) => ({id: 'asd', name:'asd qwe', email:'asd@qwe.com', age:42})
        }
    }
});

export const Schema = new GQL.GraphQLSchema({
    query: RootQuery
});
