const fs = require('fs');

const Post  = require('../src/models/Post');
const User = require('../src/models/User');
const User_Post_Comm = require('../src/models/User_Post_Comm');
const Comm = require('../src/models/Comm');

exports.createPost = (req, res, next) => {
//      A ACTIVER LORSQUE J'AURAIS FAIS LE FRONT
    // try{
        if (!req.body.title || 
            !req.body.content){
            return res.status(401).json({error: "Remplir champs"})
        };
    // }catch{
    //     res.status(404)
    // }
    

    let post = {}
    
    if (req.file){
        post = {
            ...req.body,
            userId: req.auth.userId,
            image: `${req.file.filename}`,
            User_Post_Comm: {
                userId: req.auth.userId, 
            },
        };
    } else {
        post = {
            ...req.body,
            userId: req.auth.userId,
            
            User_Post_Comm: {
                userId: req.auth.userId, 
            },
        };
    }
    
    Post.create(post, {
        include: [{ 
            model: User_Post_Comm,
            as: 'User_Post_Comm' 
        }]
    })
            .then(() => res.status(201).json({ message: "Post Added"}))
            .catch(err => res.status(401).json({ err }));
};

exports.createComm = (req, res, next) => {

    if (!req.body.content){
        return res.status(401).json({error: "Remplir champs"})
    }
    Comm.create({
        ...req.body,
        postId: req.params.id,
        userId: req.auth.userId
    })
        .then(() => res.status(201).json({ message: "Comment created"}))
        .catch(err => res.status(401).json({ message: "Can't create comment" }))
};

//  GET post (with his user, likes and comms (with their users and likes))
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id },
        include: [{
            model: User,
            as: 'User',
            attributes: ['firstName', 'lastName']
        },{
            model: User_Post_Comm, 
            as: 'User_Post_Comm',
            attributes: ['likes']           
        },  {
            model: Comm, 
            as: "Comm",
            attributes: ['content', 'createdAt', 'updatedAt'],
            include: [{
                model: User,
                as: 'User',
                attributes: ['firstName', 'lastName']
            }, {
                model: User_Post_Comm,
                as: "User_Post_Comm",
                attributes: ['likes']
            }]
        }],
    })
        .then((post) => {
            if (post == null){
                throw "Post doesn't found";
            };
            res.status(200).json({ post })
        } )
        .catch(err => res.status(400).json({ err }));
};

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: [['updatedAt', 'DESC']],
        include: [{
            model: User,
            as: 'User',
            attributes: ['firstName', 'lastName', 'isAdmin']
        },{
            model: User_Post_Comm, 
            as: 'User_Post_Comm',
            attributes: ['likes']           
        },  {
            model: Comm, 
            as: "Comm",
            attributes: ['id', 'content', 'createdAt', 'updatedAt', 'userId'],
            include: [{
                model: User,
                as: 'User',
                attributes: ['firstName', 'lastName']
            }, {
                model: User_Post_Comm,
                as: "User_Post_Comm",
                attributes: ['likes']
            }]
        }],
    })
    .then((posts) => {
        res.status(200).json({ posts })
    })
    .catch(err => res.status(400).json({ err }))
};

exports.getAllPostsUser = (req, res, next) => {
    Post.findAll({
        where: { userId: req.params.id }, 
       include: [{
            model: User,
            as: 'User',
            attributes: ['firstName', 'lastName']
        },{
            model: User_Post_Comm, 
            as: 'User_Post_Comm',
            attributes: ['likes']           
        },  {
            model: Comm, 
            as: "Comm",
            attributes: ['content', 'createdAt', 'updatedAt'],
            include: [{
                model: User,
                as: 'User',
                attributes: ['firstName', 'lastName']
            }, {
                model: User_Post_Comm,
                as: "User_Post_Comm",
                attributes: ['likes']
            }]
        }],
            
        
    })
    .then((posts) => {
        res.status(200).json({ posts })
    })
    .catch(err => res.status(400).json({ err }))
};

exports.updatePost = (req, res, next) => {

    let post = {}
    if (req.file){
        post = {
            title: req.body.title,
            content: req.body.content,
            image: `${req.file.filename}`
        };
    } else {
        post = {
            title: req.body.title,
            content: req.body.content
        };
    }

    Post.update(post, {
        where: { id: req.params.id }
    }) 
        .then((post) => res.status(201).json({ message: "Post updated" }))
        .catch(err => res.status(400).json({ err }))
};

exports.deletePost = (req, res, next) => {
    console.log(req.params.id)
    Post.findOne({
        where: {id: req.params.id}})
        .then(post => {
            const filename = post.image;
            console.log(post)
            fs.unlink(`../front/public/images/posts/${filename}`, () => {
                Post.destroy({
                    where: { id: req.params.id }
                })
                    .then(() => res.status(200).json({ message: "Post deleted" }))
                    .catch(err => res.status(400).json({ message: "Post can't be deleted "}))
            });
        })
        .catch(error => res.status(500).json({error}))
    
};  
    
exports.likePost = (req, res, next) => {
//  Si l'entrée n'est pas trouvée, il en crée une et attribue likes = true
    User_Post_Comm.findOrCreate({
        where: { 
            postId: req.params.id,
            userId: req.auth.userId
         },
        attributes: ['likes'],
        defaults: {
            postId: req.params.id,
            userId: req.auth.userId,
            likes: true
        }
    })
    .then((likes) => {

//          Si l'entrée est trouvée, qu'elle est égale à false, et que req.body.likes = true
        if (likes[1] === false){
            if (likes[0].dataValues.likes === false && req.body.likes === true){             
                User_Post_Comm.update({
                    likes: true 
                }, {
                    where: {
                        userId: req.auth.userId,
                        postId: req.params.id
                    }
                })
                    .then(() => res.status(200).json({ message: "Like added" }))
                    .catch(err => res.status(400).json({ message: "You can't like this post" }))

            }else if (likes[0].dataValues.likes === true && req.body.likes === false){
                User_Post_Comm.update({
                    likes: false 
                }, {
                    where: {
                        userId: req.auth.userId,
                        postId: req.params.id
                    }
                })
                    .then(() => res.status(200).json({ message: "Dislike added" }))
                    .catch(err => res.status(400).json({ message: "You can't dislike this post" }))

            }else{
                return res.status(400).json({ message: "You already liked/disliked this post" })
            }    
        }else{
            res.status(200).json({ message: "Like created"});
        }
    })
    .catch(err => res.status(500).json({ err }))
};

