import { merge } from "lodash";
import { IResolvers } from "../type";
import blogsRolver from "./resolvers/blog.resolver";
import usersRolver from "./resolvers/users.resolver";

const resolverMap: IResolvers = merge(usersRolver, blogsRolver);
export default resolverMap;
