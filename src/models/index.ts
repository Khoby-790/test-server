import { Op, Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/database.js")[env];
import _User, { initUser } from "./user";
import _Blog, { initBlog } from "./blog";
const isDev = env === "development";

const operatorsAliases = {
  gt: Op.gt,
  lt: Op.lt,
  in: Op.in,
  notIn: Op.notIn,
  eq: Op.eq,
  between: Op.between,
  regex: Op.regexp,
  contains: Op.contains,
  notContains: Op.notBetween,
};

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    operatorsAliases,
    logging: false,
  }
);
//init models~
initUser(sequelize);
initBlog(sequelize);
// sequelize.sync({ alter: isDev });

const models = {
  User: _User,
  Blog: _Blog,
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
// Object.values(models)
//   .filter((model) => typeof model.associate === "function")
//   .forEach((model) => model.associate(models));

export const { User, Blog } = models;
