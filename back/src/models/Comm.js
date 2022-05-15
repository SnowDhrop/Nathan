const Sequelize = require('sequelize');

module.exports = sequelize.define('Comm', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
});