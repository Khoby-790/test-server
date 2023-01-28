const { faker } = require("@faker-js/faker");

function createRandomBlog() {
  return {
    title: faker.lorem.text().substring(0, 10),
    body: faker.lorem.paragraph(),
    banner: faker.image.image(),
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

module.exports = {
  createRandomBlog,
};
