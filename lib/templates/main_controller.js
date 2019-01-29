module.exports = () => `const User = require('../models/user');

exports.home = (req,res) => {
    res.send(200,{message:'Welcome to semplice - A micro framework for NodeJS'});
}

exports.private = (req,res) => {
    res.send(200,{page:"registered user page"});
}

exports.login = (req,res,utils) => {

    User.findOne({email: req.body.email},(err, user) => {
        
        if (err) throw err;

        if (!user) {

            res.send(403,{ success: false, message: 'Authentication failed. User not found.' });

        } else if (user) {

            if (user.password != req.body.password) {

                res.send(403,{ success: false, message: 'Authentication failed. Wrong password.' });

            } else {

                res.send(200,{
                    success: true,
                    token: utils.generateToken(user),
                    user: user
                });

            }

        }

    });

}

exports.user = (req,res) => {
    let user = new User({
        email:req.body.email,
        password: req.body.password
    })

    user.save((err,result) => {
        if(err){
            res.send(500,{error:err})
        } else {
            res.send(200,result,result);
        }
    })
}`;