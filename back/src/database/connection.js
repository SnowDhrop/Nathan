const Sequelize = require('sequelize');

//  Connection to database
const sequelize = new Sequelize('groupomania', 'root', '', {
    host: '127.0.0.1', 
    dialect: "mysql", 
    operatorsAliases: false, 
    operatorsAliases: 0
});

module.exports = sequelize;
global.sequelize = sequelize;

// Associations
const Post = require('../models/Post');
const User = require('../models/User');
const User_Post_Comm = require('../models/User_Post_Comm');
const Comm = require('../models/Comm');

//  One-to-Many v.2
User.hasMany(User_Post_Comm, { as: "User_Post_Comm", foreignKey: "userId" });
User_Post_Comm.belongsTo(User, { as: "User", foreignKey: "userId" });

Post.hasMany(User_Post_Comm, { as: "User_Post_Comm", foreignKey: "postId" });
User_Post_Comm.belongsTo(Post, { as: "Post", foreignKey: "postId"});

Comm.hasMany(User_Post_Comm, { as: "User_Post_Comm", foreignKey: "commId" });
User_Post_Comm.belongsTo(Comm, { as: "Comm", foreignKey: "commId"});

Post.hasMany(Comm, { as: "Comm", foreignKey: "postId" });
Comm.belongsTo(Post, { as: "Post", foreignKey: "postId"});

User.hasMany(Post, { as: "Post", foreignKey: "userId"});
Post.belongsTo(User, { as: "User", foreignKey: "userId"});

User.hasMany(Comm, { as: "Comm", foreignKey: "userId"});
Comm.belongsTo(User, { as: "User", foreignKey: "userId"});