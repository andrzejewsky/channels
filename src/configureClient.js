import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { addGraphQLSubscriptions } from 'add-graphql-subscriptions';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql',
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      setInterval(next, 500);
    },
  },
]);

const wsClient = new SubscriptionClient('ws://localhost:4000/subscriptions', {
  reconnect: true,
});
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const Client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});

export default Client;
