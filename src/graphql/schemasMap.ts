import "graphql-import-node";
// import * as userTypeDefs from "./schemas/users.graphql";
import * as emptyTypeDefs from "./schemas/empty.graphql";
import { GraphQLSchema } from "graphql";
// import { makeExecutableSchema } from "@graphql-tools/schema";
import resolverMap from "./resolversMap";
import { makeExecutableSchema } from "@graphql-tools/schema";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [emptyTypeDefs],
  resolvers: resolverMap,
});

export default schema;
