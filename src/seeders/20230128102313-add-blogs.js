"use strict";

const { createRandomBlog } = require("../seedersdata/blogs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const BLOGS = [];
    Array.from({ length: 10 }).forEach(() => {
      BLOGS.push(createRandomBlog());
    });
    await queryInterface.bulkInsert("blogs", BLOGS, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("blogs", null, {});
  },
};
