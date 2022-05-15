const bcrypt = require('bcrypt');
const { use } = require('bcrypt/promises');
const jwt = require('jsonwebtoken');

const User = require('../src/models/User');

exports.signup = (req, res, next) => {

    // Validator dans un autre fichier

    // Evite les doublons d'utilisateurs
    User.findOne({
        where: { email: req.body.email }
    })
        .then((userFound) => {

            if (userFound) {
                return res.status(401).json({ message: "User already registered" })
            };

            //   Hachage du mdp
            bcrypt.hash(req.body.password, 10)
                .then(hash => {

                    //          Création de l'utilisateur
                    User.create({
                        ...req.body,
                        password: hash
                        
                    })
                        .then(() => res.status(201).json({ message: "User added" }))
                        .catch(err => res.status(400).json({ err }));
                })

                .catch(err => res.status(500).json({ err }))
        })
        .catch(err => res.status(500).json({ err }))
};

exports.login = (req, res, next) => {
    //  Find user
    User.findOne({
        where: { email: req.body.email }
    })
        .then((user) => {

            //          If user not found
            if (!user) {
                return res.status(401).json({ message: "User not found" })
            };

            //          Compare passwords
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: "Wrong password" })
                    };

                    console.log(user);

                    //                  Token creation
                    res.status(200).json({
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign(
                            { userId: user.id },
                            'FIND_IT',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(err => res.status(500).json({ err }))

        })
        .catch(err => res.status(500).json({ err }))
};

exports.getOne = (req, res, next) => {
    User.findOne({
        where: { id: req.params.id},
        attributes: ['firstName', 'lastName', 'email', 'createdAt', 'updatedAt', 'isAdmin']
    })
    .then((user) => {
        
        if (user == null){
            console.log('yolo')
            throw "User doesn't found";
        };
        res.status(200).json({ user })
    } )
    .catch(err => res.status(400).json({ err }));
};


exports.update = (req, res, next) => {
    User.update({ 
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }, {
        where: { id: req.params.id }
    }) 
        .then((post) => res.status(201).json({ message: "User updated" }))
        .catch(err => res.status(400).json({ err }))
};

exports.delete = (req, res, next) => {
    User.destroy({
        where: { id: req.params.id }
    })
        .then(() => res.status(200).json({ message: "User deleted" }))
        .catch(err => res.status(400).json({ message: "User can't be delete "}))
};  