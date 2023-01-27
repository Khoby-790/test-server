import { getUsers } from "../../brokers/user.broker";
import { IResolvers } from "../../type";

const usersRolver: IResolvers = {
  Query: {
    _: async () => true,
    getUsers: async (_, args) => await getUsers(args),
  },
  Mutation: {
    _: async () => true,
  },
};

export default usersRolver;
