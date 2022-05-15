const Post  = require('../src/models/Post');
const User = require('../src/models/User');
const User_Post_Comm = require('../src/models/User_Post_Comm');
const Comm = require('../src/models/Comm');


exports.updateComm = (req, res, next) => {
    Comm.update({ 
        content: req.body.content
    }, {
        where: { id: req.params.id }
    }) 
        .then(() => res.status(201).json({ message: "Comment updated" }))
        .catch(err => res.status(400).json({ err }))
};

exports.likeComm = (req, res, next) => {
    User_Post_Comm.findOrCreate({
        where: { 
            commId: req.params.id,
            userId: req.auth.userId,
         },
        attributes: ['likes'],
        defaults: {
            commId: req.params.id,
            userId: req.auth.userId,
            likes: true
        }
    })

    .then((likes) => {
        if(likes[1] === false){
            if (likes[0].dataValues.likes === false && req.body.likes === true){             
                User_Post_Comm.update({
                    likes: true 
                }, {
                    where: {
                        userId: req.auth.userId,
                        commId: req.params.id
                    }
                })
                    .then(() => res.status(200).json({ message: "Like added" }))
                    .catch(err => res.status(400).json({ message: "You can't like this comment" }))

            }else if (likes[0].dataValues.likes === true && req.body.likes === false){
                User_Post_Comm.update({
                    likes: false 
                }, {
                    where: {
                        userId: req.auth.userId,
                        commId: req.params.id
                    }
                })
                    .then(() => res.status(200).json({ message: "Dislike added" }))
                    .catch(err => res.status(400).json({ message: "You can't dislike this comment" }))

            }else{
                return res.status(201).json({ message: "You already liked/disliked this comment" })
            }  
        }else{
            res.status(200).json({ message: "Like created" })
        }            
    })
    .catch(err => res.status(500).json({ err }))
};

exports.deleteComm = (req, res, next) => {
    Comm.destroy({
        where: { id: req.params.id }
    })
        .then(() => res.status(200).json({ message: "Comment deleted" }))
        .catch(err => res.status(400).json({ message: "Comment can't be deleted "}))
};  