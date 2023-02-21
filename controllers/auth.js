const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
    try{
        const user = await User.findOne({email:req.body.email});
        if(user){
            
        }
    }catch(error){

    }
}

