import { Op, Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
import _User, { initUser } from "./user";
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
// sequelize.sync({ alter: isDev });

const models = {
  User: _User,
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
// Object.values(models)
//   .filter((model) => typeof model.associate === "function")
//   .forEach((model) => model.associate(models));

export const {} = models;
