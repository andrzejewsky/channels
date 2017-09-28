/* eslint-disable no-console, no-new */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from 'http';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import typeDefs from '../schema';
import resolvers from './resolvers';

const PORT = 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = express();
const ws = createServer(server);

server.use('*', cors({ origin: 'http://localhost:3000' }));

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
  })
);

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: 'ws://localhost:4000/subscriptions',
  })
);

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: ws,
      path: '/subscriptions',
    }
  );
});
