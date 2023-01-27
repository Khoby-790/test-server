import { GraphQLError } from "graphql";
import { BlogInput, MutationRemoveBlogArgs } from "../graphql/generated";
import { Blog } from "../models";
import { AuthUser, QueryArgs } from "../type";
import { preprocessFilter, processPagination } from "../utils";

/**
 *  create Blog
 *  @param {}
 *  @return boolean
 */
export const createBlog = async ({
  title,
  body,
  banner,
  user_id,
}: BlogInput & AuthUser) => {
  await Blog.create({ title, body, banner, user_id });
  return true;
};

/**
 *  update Blog
 *  @param {}
 *  @return boolean
 */
export const updateBlog = async ({ id, title, banner, body }: BlogInput) => {
  if (!id) return new GraphQLError("Blog Id is required to update blog");
  const blog = await Blog.findByPk(id);
  if (!blog) return new GraphQLError("Blog doesn't exist");
  await blog.update({ banner, title, body });
  return true;
};

/**
 *  remove Blog
 *  @param {}
 *  @return boolean
 */
export const removeBlog = async ({ id }: MutationRemoveBlogArgs) => {
  const blog = await Blog.findByPk(id);
  if (!blog)
    return new GraphQLError("Blog doesn't exist and cannot be deleted");

  await blog.destroy();
  return true;
};

/**
 *  get a set of Blog
 *  @param {}
 *  @return boolean
 */
export const getBlogs = async ({ filter, pagination }: QueryArgs) => {
  const where = preprocessFilter(filter);
  const paging = processPagination(pagination);
  const result = await Blog.findAll({ where, ...paging });
  return result;
};

/**
 *  get a single Blog
 *  @param {}
 *  @return boolean
 */
export const getBlog = async ({ filter }: QueryArgs) => {
  const where = preprocessFilter(filter);
  const result = await Blog.findAll({ where });
  return result;
};

/**
 *  get the count of  Blogs
 *  @param {}
 *  @return boolean
 */
export const getBlogsLength = async () => {};
