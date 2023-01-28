import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import schema from "./graphql/schemasMap";
import http from "http";
import { GraphQLSchema } from "graphql";
import { __disolveContext } from "./utils";
require("./models");
const PORT = process.env.PORT || 4000;

async function startApolloServer(schema: GraphQLSchema) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
    context: __disolveContext,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  await new Promise<void>((resolve) => {
    httpServer.listen(PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
      resolve();
    });
  });
}

startApolloServer(schema);
