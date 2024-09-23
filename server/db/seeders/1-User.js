"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "admin",
          email: "1@1",
          password: await bcrypt.hash("1", 10),
        },
        {
          name: "Jane Doe",
          email: "2@2",
          password: await bcrypt.hash("2", 10),
        },
        {
          name: "John Doe",
          email: "3@3",
          password: await bcrypt.hash("3", 10),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
