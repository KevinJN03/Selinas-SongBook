const express = require('express')
const router = express.Router()
const {Song, User} = require('../models')
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const SALT_COUNT = 10;
const JWT_SECRET = process.env.JWT_SECRET;

router.get(":id", async (req, res) => {
    const { id } = req.params;
  
    try {
     const user = await User.findByPk(id);
     res.send(user);
    } catch (error) {
      console.log(error);
      res.send(error).sendStatus(403)
    }
   
  });
  
  
router.post("/register", async (req, res, next) => {
    try {
      const { name,username, password, isStaff, isSelena } = req.body;
      const hashed = await bcrypt.hash(password, SALT_COUNT);
      const {id, Name} = await User.create({ 
        name: name,
        username: username,
        password: hashed,
        isStaff: isStaff,
        isSelena: isSelena
      });
      const token = jwt.sign({id, Name, isStaff, isSelena}, JWT_SECRET)
      res.send({message: "You are logged in!", token})
    } catch (error) {
      console.error(error); 
      next(error);
    }
  });
  
router.post("/login", async (req, res, next) => {
    try {
      const {username, password} = req.body
      const foundUser = await User.findOne({where: {username}});
      console.log("Found User", foundUser)
          if(!foundUser) {
            console.log('yup')
              res.sendStatus(401);
          }
          console.log(foundUser.password)
          const isMatch = await bcrypt.compare(password, foundUser.password);
          if(isMatch) {
              const {id, name, isStaff, isSelena} = foundUser
              const token = jwt.sign({id, name, isStaff, isSelena}, JWT_SECRET);
              res.send({message: "Welcome back! Here is your token", token})
          } else {
            console.log('yuppp')
              res.sendStatus(401)
          }
    } catch (error) {
      console.error(error);
      next(error);
    }
  });


router.delete('/delete', async (req,res) => {
  console.log("User Object in /User/delete", req.user)
  if (req.user.isSelena == true){
    const {id} = req.body;
    const deletedUser = await User.findByPk(id)
    User.destroy({
      where: {
        id: id
      }
    })
    res.send({message: "User Deleted", deletedUser})
    return
  }
  res.sendStatus(401)

})

  module.exports = router 