import { merge } from "lodash";
import { IResolvers } from "../type";
import usersRolver from "./resolvers/users.resolver";

const resolverMap: IResolvers = merge(usersRolver);
export default resolverMap;
