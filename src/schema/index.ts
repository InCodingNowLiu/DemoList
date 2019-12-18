import { gql, makeExecutableSchema } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import * as user from './user';

const rootDefs = gql`
  type Query {
    dummy: String
  }

  type Mutation {
    dummy: String
  }

  type Subscription {
    dummy: String
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

const typeDefs = [rootDefs].concat(user.typeDef);
const schema: GraphQLSchema = makeExecutableSchema({
  logger: console,
  typeDefs: typeDefs,
  resolvers: user.resolvers,
});

export { schema };
