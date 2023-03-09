const express = require("express");
require('dotenv').config();

const { setUser } = require("./middleware");
const {musicRouter, userRouter} = require('./routers')


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
