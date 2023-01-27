import { GraphQLError } from "graphql";
import { AuthPayload, LoginInput, RegisterInput } from "../graphql/generated";
import User from "../models/user";
import { QueryArgs } from "../type";
import { genSalt, hash } from "bcryptjs";
import { AUTHENTICATION_ERROR_MESSAGE } from "../constants";
/**
 *  create User
 *  @param {}
 *  @return boolean
 */
export const createUser = async ({
  email,
  first_name,
  last_name,
  password,
  phone,
}: RegisterInput): Promise<AuthPayload | GraphQLError> => {
  const userExists = await User.findOne({ where: { email } }); // check for duplicate users with same email
  if (userExists) return new GraphQLError("User already exists");
  const salt = await genSalt(12);
  const __password = await hash(password, salt);
  const _user = await User.create({
    email,
    hash: __password,
    phone: phone as string,
    first_name,
    last_name,
  });

  return {
    token: _user.getAuthToken(),
    user: _user as any,
  };
};

/**
 *  @param {}
 *  @return boolean
 */
export const userLogin = async ({
  email,
  password,
}: LoginInput): Promise<AuthPayload | GraphQLError> => {
  const userExists = await User.findOne({ where: { email } });
  if (!userExists) return new GraphQLError(AUTHENTICATION_ERROR_MESSAGE);
  const validPassword = await userExists.isPasswordRight(password);
  if (!validPassword) return new GraphQLError(AUTHENTICATION_ERROR_MESSAGE);
  return {
    token: userExists.getAuthToken(),
    user: userExists as any,
  };
};

/**
 *  update User
 *  @param {}
 *  @return boolean
 */
export const updateUser = async () => {};

/**
 *  remove User
 *  @param {}
 *  @return boolean
 */
export const removeUser = async () => {};

/**
 *  get a set of User
 *  @param {}
 *  @return boolean
 */
export const getUsers = async ({ filter, pagination }: QueryArgs) => {};

/**
 *  get a single User
 *  @param {}
 *  @return boolean
 */
export const getUser = async () => {};

/**
 *  get the count of  Users
 *  @param {}
 *  @return boolean
 */
export const getUsersLength = async () => {};
