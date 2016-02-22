import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';
import DBClient from '../db';
let counter = 100;
let linkType = new GraphQLObjectType({
    name: 'Link',
    fields: () => ({
      _id: {type: GraphQLString },
      title: { type: GraphQLString },
      url: { type: GraphQLString }
    })
});

let nameObj = new GraphQLObjectType({
  name: 'names',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});
let counterType = new GraphQLObjectType({
  name: 'Counter',
  fields: () => ({
    counter: { type: GraphQLInt }
  })
})
let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      counter: {
        type: GraphQLInt,
        resolve: () => counter
      },
      name: {
        type: GraphQLString,
        resolve: () => {
          return 'doron';
        }
      },
      links: {
        type: new GraphQLList(linkType),
        resolve: () => DBClient.findAll('links')
      },
      names: {
        type: new GraphQLList(nameObj),
        resolve: () => {
          return [{id: 1, name: 'a'},{id: 2, name: 'b'}];
        }
      }

    })
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      incrementCounter: {
        type: GraphQLInt,
        resolve: () => {
          return ++counter;
        }
      }
    })
  })
});

export default schema;
