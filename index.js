const express = require("express");
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {User, Song} =  require("./models/index");
const {sequelize} = require("sequelize");
const { setUser } = require("./middleware");
const {musicRouter, userRouter} = require('./routers')


const JWT_SECRET = process.env.JWT_SECRET;
const SALT_COUNT = 10;
const app = express();




//MIDDLEWEAR -----------------------------------------------------------


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setUser)




//ROUTES -------------------------------------------------------------

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to Selinas SongBook!</h1><p>Create songs with the /music endpoint!</p>"
  );
});

app.use('/user', userRouter)
app.use("/music", musicRouter)


module.exports = app;
