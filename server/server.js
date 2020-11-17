const { GraphQLServer } = require('graphql-yoga');

const messages = [];
const users = [];

// Type defs are the GraphQL schema
// Usage of "!" tells GraphQL that it is a required field
const typeDefs = `
type Message {
    id: ID! 
    user: String!
    content: String!
}

type User {
    id: ID!
    name: String!
    age: Int!
}

type Query {
    messages: [Message!]
    users: [User!]

}

type Mutation {
    postMessages(user: String!, content: String!) : ID!
    postUser(name: String!, age: Int!) : ID!
}
`;
const resolvers = {
  Query: {
    messages: () => messages,
    users: () => users,
  },
  Mutation: {
    postMessages: (parent, { user, content }) => {
      const id = messages.length;
      messages.push({ id, user, content });
      return id;
    },
    postUser: (parent, { name, age }) => {
      const id = users.length;
      const user = { id, name, age };
      users.push(user);
      return id;
    },
  },
};
const server = new GraphQLServer({ typeDefs, resolvers });
server.start(({ port }) =>
  console.log(`Server started on http://localhost:${port}/ ${users}`)
);
