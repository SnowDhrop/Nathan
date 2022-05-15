// module.exports = async () => {

//     const Post = require('./models/Post');
//     const User = require('./models/User');

//     User.hasMany(Post, { as: "Posts", foreignKey: "userId"});
//     Post.belongsTo(User, { as: "User", foreignKey: "userId"});

//     const user = await User.create({
//         firstName: "Nathan",
//         lastName: "Ard",
//         email: "aze",
//         password: "aze"
//     })
//         .catch(err => console.log(err));

//     const post = await Post.create({
//         title: "test",
//         content: "Ceci est un test",
//         userId: user.id
//     })
//         .catch(err => console.log(err));

//     const users = await User.findAll({
//         where: { lastName: "ard"},
//         include: [ {model: Post, as: "Posts"} ]
//     })
//         .catch(err => console.log(err));

//     console.log('Nathan Posts: ', users);
// }