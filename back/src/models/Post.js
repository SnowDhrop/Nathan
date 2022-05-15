const Sequelize = require('sequelize');

module.exports = sequelize.define('Post', {
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
    image: {
        type: Sequelize.STRING(300),
        allowNull: true,  
    }
});