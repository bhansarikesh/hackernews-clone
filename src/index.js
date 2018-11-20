const { GraphQLServer } = require('graphql-yoga');

// String! ! means the field cannot be null
// There are 3 root types: Query, Mutation, and Subscription

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}, {
  id: 'link-1',
  url: 'www.howtographql.com-1',
  description: 'Fullstack tutorial for GraphQL 1'
}];

let idCount = links.length;

// This is the actual implementation of the GraphQL schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => {
      const requestedLink = links.filter((link) => link.id === args.id)
      return requestedLink[0];
    }
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link);
      return link;
    },
    updateLink: (root, args) => {
      
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Server is running on http://localhost:4000'));