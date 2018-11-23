const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');

// String! ! means the field cannot be null
// There are 3 root types: Query, Mutation, and Subscription
// This is the actual implementation of the GraphQL schema

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/rikesh-bhansari/database/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
});

server.start(() => console.log('Server is running on http://localhost:4000'));