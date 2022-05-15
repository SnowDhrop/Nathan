const Sequelize = require('sequelize');

module.exports = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    lastName: {   
        type: Sequelize.STRING(50),
        allowNull: false,    
    },
   email: {
        type: Sequelize.STRING(300),
        allowNull: false,  
        unique: true
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    },
    password: {
        type: Sequelize.STRING(),
        allowNull: false
    }
});