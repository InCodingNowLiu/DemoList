import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import logger from './util/logger';

export default function main(): ApolloServer {
  const server = new ApolloServer({
    schema,
  });
  return server;
}

(() => {
  const server = main();
  const port = process.env.PORT || 8000;
  server.listen(port, () => {
    logger.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
})();
