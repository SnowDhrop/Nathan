'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('user_post_comms', {
      userId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      likes: { 
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      postId: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      commId: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('users_post_comms');
  }
};
