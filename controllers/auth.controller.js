const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JSONResponse } = require('../utilities/JSONResponse');

// exports.authUser = async (req, res) => {
//     try{
//         console.log('login attempted')
//         const user = await User.findOne({email:req.body.email});
//         if(!req.body.password){
//             JSONResponse.error(res, "Failed login attempt.", {error_msg: 'Password required'})
//         }
//         pass = await bcrypt.compare(req.body.password, user.password);
//         if(!pass){
//             JSONResponse.error(res, "Failed login attempt.", {error_msg: 'Password mismatch'})
//         }
//         if(user && await bcrypt.compare(req.body.password, user.password)){
//             const token = jwt.sign({email:user.email}, process.env.JWT_SECRET);
//             user.password = undefined
//             user.contactNum = undefined
//             user.contactNum = undefined
//             return JSONResponse.success(res, 'Success', {token, user}, 200)
//         }
//     }catch(error){
//         JSONResponse.error(res, 'Failure handling user model.', error, 400)
//     }
// }


exports.authUser = async (req, res) => {
    console.log('login attempted')
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!req.body.email || !req.body.password) {
            return JSONResponse.error(res, "Failed login attempt.", { error_msg: 'Please provide credentials' }, 400);
        }
        if (!user) {
            return JSONResponse.error(res, "Failed login attempt.", { error_msg: 'User not found' }, 400);
        }
        if (!req.body.password) {
            return JSONResponse.error(res, "Failed login attempt.", { error_msg: 'Password required' }, 400);
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return JSONResponse.error(res, "Failed login attempt.", { error_msg: 'Password mismatch' }, 400);
        }
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        const userResponse = { ...user.toObject(), password: undefined, contactNum: undefined };
        return JSONResponse.success(res, 'Success', { token, user: userResponse }, 200);
    } catch (error) {
        return JSONResponse.error(res, 'Failure handling user model.', error, 400);
    }
};

