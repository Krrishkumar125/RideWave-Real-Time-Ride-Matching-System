const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const User = require('../models/user');

const authMiddleware = async (req , res , next) =>{
        const token = req.header('Authorization')?.replace('Bearer','');

        if(!token) return res.status(StatusCodes.UNAUTHORIZED).send('Access Denied');

        try{
            const verified = jwt.verify(token ,process.env.JWT_SECRET);
            req.user = await User.findById(verified.id);
            next();
        }catch(error){
            res.status(StatusCodes.UNAUTHORIZED).send('Invalid Token');
        }
}

module.exports = authMiddleware;