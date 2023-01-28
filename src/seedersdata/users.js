const { faker } = require("@faker-js/faker");
const { genSalt } = require("bcryptjs");
// import { faker } from '@faker-js/faker/locale/de';
const { hash } = require("bcryptjs");
const USERS = [];

async function createRandomUser() {
  const salt = await genSalt(12);
  const pass = await hash(faker.internet.password(), salt);
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.firstName(),
    email: faker.internet.email(),
    hash: pass,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

module.exports = {
  USERS,
  createRandomUser,
};
