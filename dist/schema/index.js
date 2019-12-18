"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const user = require("./user");
const rootDefs = apollo_server_1.gql `
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
const schema = apollo_server_1.makeExecutableSchema({
    logger: console,
    typeDefs: typeDefs,
    resolvers: user.resolvers,
});
exports.schema = schema;
//# sourceMappingURL=index.js.map