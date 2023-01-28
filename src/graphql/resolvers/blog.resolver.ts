import { combineResolvers } from "graphql-resolvers";
import {
  createBlog,
  getBlogs,
  getBlogsLength,
  removeBlog,
  updateBlog,
} from "../../brokers/blog.broker";
import { IResolvers } from "../../type";
import { isAuthenticated } from "../../utils";

const blogsRolver: IResolvers = {
  Query: {
    getBlogs: async (_, args) => await getBlogs(args),
    getBlogsLength: async (_, args) => await getBlogsLength(args),
  },
  Mutation: {
    createBlog: combineResolvers(
      isAuthenticated,
      async (_, { input }, { user }) =>
        await createBlog({ ...input, user_id: user.id })
    ),
    updateBlog: combineResolvers(
      isAuthenticated,
      async (_, { input }, { user }) =>
        await updateBlog({ ...input, user_id: user.id })
    ),
    removeBlog: combineResolvers(
      isAuthenticated,
      async (_, args) => await removeBlog(args)
    ),
  },
};

export default blogsRolver;
