
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';

import express from 'express';

import {apolloServer} from 'graphql-tools';

import {execute, subscribe} from 'graphql';
import {createServer} from 'http';

import schema from './graphql/schema';

import Resolvers from './graphql/resolvers';

const GRAPHQL_PORT = 8080;

const graphQLServer = express();



graphQLServer.use('/graphql', apolloServer({
    schema: schema,
    resolvers: Resolvers,
}));

graphQLServer.get('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:8080/subscriptions`
})); // if you want GraphiQL enabled


graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));

//
// // Wrap the Express server
// const ws = createServer(graphQLServer);
// ws.listen(GRAPHQL_PORT, () => {
//     console.log(`Apollo Server is now running on http://localhost:${GRAPHQL_PORT}`);
//     // Set up the WebSocket for handling GraphQL subscriptions
//     //schema hast to written in lower case. Schema instead of schema as argument don't work
//     new SubscriptionServer({
//         execute,
//         subscribe,
//         schema,
//         onConnect: (connectionParams, webSocket) => {
//             console.log("onConnect: ");
//             // console.log("connectionParams: ", connectionParams);
//             // console.log("webSocket: ", webSocket);
//         },
//         onDisconnect: (webSocket) => {
//             console.log("onDisconnect");
//         }
//
//     }, {
//         server: ws,
//         path: '/subscriptions',
//     });
// });