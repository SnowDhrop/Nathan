const Comm = require('../src/models/Comm');
const User = require('../src/models/User');

module.exports = (req, res, next) => {
    try{
        
//      Check if user is admin
        User.findOne({
            where: { id: req.auth.userId },
            attributes: ['isAdmin']
        })
            .then((user) => { 

                if (user.dataValues.isAdmin != true) {
                    
//                  If he's not admin, check if he can modify the post
                    Comm.findOne({
                        where: {id: req.params.id}
                    })
                        .then(comm => { 
                            if (comm.userId !== req.auth.userId){
                                return res.status(400).json({message: 'Unauthorized request'});
                            };
                            next();
                        })
                        .catch(err => res.status(404).json({ error: "Object don't found"}));
                }else{
                    next();
                }
                
            })
            .catch(err => res.status(400).json({ err }))
        
             
    }catch(error){
        res.status(500).json({error});
    }
}