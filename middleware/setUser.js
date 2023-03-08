const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET

const setUser  = (req, res, next) => {
    try {
      const auth = req.header('Authorization');
      console.log("authorization:", auth)
      if (!auth){
        next();
        return
      }
      const [, token] = auth.split(" ")
      const user = jwt.verify(token, JWT_SECRET);
      req.user = user;
      console.log(user)
      next();
    } catch (error) {
      console.log(error);
      next();
    }
  };


  module.exports = setUser