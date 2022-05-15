const Sequelize = require('sequelize');

module.exports = sequelize.define('User_Post_Comm', {
    likes: { 
        type: Sequelize.BOOLEAN
    },
},
{
    timestamps: false
})