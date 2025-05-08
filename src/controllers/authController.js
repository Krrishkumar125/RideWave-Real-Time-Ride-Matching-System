const {StatusCodes} = require('http-status-codes')

const {AuthService} = require('../services/index');

const authService = new AuthService();

const register = async (req , res) =>{
       try {
          const {user , token} = await authService.register(req.body);
          return res.status(StatusCodes.CREATED).json({
            data : {user ,token},
            success : true,
            message : 'User created succesfully',
            error : null
          })
       } catch (error) {
           console.log('something went wrong in auth controller' , error);
           return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data : null ,
            success : false ,
            message : 'something went wrong while creating the user',
            err : error
           })
       }
}

const login = async (req , res) =>{
    try {
       const {email , password} = req.body;
       const {user , token} = await authService.login(email,password);
       return res.status(StatusCodes.OK).json({
         data : {user ,token},
         success : true,
         message : 'User logged in succesfully',
         error : null
       })
    } catch (error) {
        console.log('something went wrong in auth controller' , error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         data : null ,
         success : false ,
         message : 'Something went wrong',
         err : error
        })
    }
}

module.exports = {
    register,
    login
}