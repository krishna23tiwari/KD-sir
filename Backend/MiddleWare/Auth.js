const jwt = require('jsonwebtoken')
const userModel = require('../Model/UserModel')
const secret = process.env.SECRET

module.exports = async(req, res, next) => {
    const barrertoken = req.headers.authorization

    if(!barrertoken){
        return res.status(400).json("Error in barrertoken")
    }

    const token = barrertoken.split(" ")[1]

     if(!token){
        return res.status(400).json("Error in token")
    }

    const decode = jwt.verify(token, secret)

     if(!decode){
        return res.status(400).json("Error in decode")
    }

    const user = await userModel.findOne({email: decode.email})

     if(!user){
        return res.status(400).json("Error finding user")
    }

    req.user = user
    next()
}