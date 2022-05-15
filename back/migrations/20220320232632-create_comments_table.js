'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('comms', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      postId: Sequelize.INTEGER(11),
      userId: Sequelize.INTEGER(11),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('comms');
  }
};
