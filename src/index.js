const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

// String! ! means the field cannot be null
// There are 3 root types: Query, Mutation, and Subscription
// This is the actual implementation of the GraphQL schema

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info);
    },
    // link: (root, args) => {
    //   const requestedLink = links.filter((link) => link.id === args.id)
    //   return requestedLink[0];
    // },
  },
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        },
      }, info);
    },
    // updateLink: (root, args) => {
    //   let linkToBeUpdated = links.filter((link) => link.id === args.id);
    //   if (!linkToBeUpdated[0]) {
    //     return `Link was not found with the given id: ${args.id}`;
    //   } else {
    //     const linkIndex = links.findIndex((link) => link.id === args.id);
    //     links[linkIndex].url = args.url || links[linkIndex].url;
    //     links[linkIndex].description = args.description || links[linkIndex].description;
    //     return `Link successfully updated.`;
    //   }
    // },
    // deleteLink: (root, args) => {
    //   let linkToBeDeleted = links.filter((link) => link.id === args.id);
    //   if (!linkToBeDeleted[0]) {
    //     return `Link was not found with the given id: ${args.id}`;
    //   } else {
    //     const linkIndex = links.findIndex((link) => link.id === args.id);
    //     links.splice(linkIndex, 1);
    //     return `Link successfully deleted.`;
    //   }
    // }
  }
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