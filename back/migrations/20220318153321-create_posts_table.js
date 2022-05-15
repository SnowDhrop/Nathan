'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("posts", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      content: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      attachment: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      userId: Sequelize.INTEGER(11),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('posts');
  }
};
