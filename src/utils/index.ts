import { ForbiddenError } from "apollo-server-express";
import { skip } from "graphql-resolvers";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { Request } from "express";
import { IResolver } from "../type";
import _ from "lodash";
import { Pagination } from "../graphql/generated";
import { JWT_SECRET } from "../constants";

export const __disolveContext = async ({ req }: any) => {
  const token = req.headers["token"];
  if (!token) return null;
  // console.log("TOKEN", token);
  const user = jwt.verify(token, JWT_SECRET);
  if (!user)
    return {
      user: null,
    };
  return {
    user,
  };
};

export const isAuthenticated: IResolver = (root, args, { user }) =>
  user ? skip : new ForbiddenError("Not authenticated as user.");

export const hasCountry: IResolver = (parent, args, { country }) => {
  return country
    ? skip
    : new ForbiddenError("You are not authorized to access this resource");
};

const filterDictionary = {
  gt: Op.gt,
  lt: Op.lt,
  in: Op.in,
  notIn: Op.notIn,
  eq: Op.eq,
  between: Op.between,
  regex: Op.regexp,
  contains: Op.contains,
  iLike: Op.iLike,
  like: Op.like,
  notLike: Op.notLike,
  and: Op.and,
  or: Op.or,
};

export const preprocessFilter = (filter: any, condition: string = "or") => {
  const newFilter: Record<string, any> = {};
  if (!filter) return newFilter;
  _.map(_.keys(filter), (key) => {
    const value = _.property(key)(filterDictionary) as string;
    if (value) {
      newFilter[value] = filter[key];
      if (_.isArray(filter[key])) {
        newFilter[value] = filter[key];
      } else if (_.isObject(filter[key])) {
        newFilter[value] = preprocessFilter(filter[key]);
      } else if (_.isString(filter[key]) && key === "like") {
        newFilter[value] = `%${filter[key]}%`;
      }
    } else {
      newFilter[key] = filter[key];
      if (_.isArray(filter[key])) {
        newFilter[key] = filter[key];
      } else if (_.isObject(filter[key])) {
        newFilter[key] = preprocessFilter(filter[key]);
      }
    }
  });
  return Object.keys(newFilter).length > 1
    ? joinFilterWithCondition(newFilter, condition)
    : newFilter;
};

const joinFilterWithCondition = (
  filter: Record<string, any>,
  condition: string
) => {
  return {
    [condition === "or" ? Op.or : Op.and]: Object.keys(filter).map((key) => ({
      [key]: filter[key],
    })),
  };
};

export const processPagination = (pagination?: Pagination) => {
  return {
    limit: pagination?.limit ?? 10,
    offset: pagination?.offset ?? 0,
  };
};
