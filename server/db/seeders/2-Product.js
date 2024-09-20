"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          image: "image",
          name: "Пшеница",
          description: "Пшеница",
          price: 100,
          article: "123",
          amount: 10,
          userId: 1,
        },
        {
          image: "image",
          name: "Молоко",
          description: "Молоко",
          price: 100,
          article: "123",
          amount: 10,
          userId: 2,
        },
        {
          image: "image",
          name: "Сыр",
          description: "Сыр",
          price: 100,
          article: "123",
          amount: 10,
          userId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
