import { createUser, getUsers, userLogin } from "../../brokers/user.broker";
import { IResolvers } from "../../type";

const usersRolver: IResolvers = {
  Query: {
    _: async () => true,
    getUsers: async (_, args) => await getUsers(args),
  },
  Mutation: {
    _: async () => true,
    userSignUp: async (_, { input }) => await createUser(input),
    userSignIn: async (_, { input }) => await userLogin(input),
  },
};

export default usersRolver;
