import "graphql-import-node";
import * as userTypeDefs from "./schemas/user.graphql";
import * as blogTypeDefs from "./schemas/blog.graphql";
import * as emptyTypeDefs from "./schemas/empty.graphql";
import { GraphQLSchema } from "graphql";
// import { makeExecutableSchema } from "@graphql-tools/schema";
import resolverMap from "./resolversMap";
import { makeExecutableSchema } from "@graphql-tools/schema";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [emptyTypeDefs, userTypeDefs, blogTypeDefs],
  resolvers: resolverMap,
});

export default schema;
