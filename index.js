const express = require("express");
const bcrypt = require("bcrypt");

require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, Song } = require("./models");

const db = require("./db/db");

// Get the secret from the .env file
const JWT_SECRET = process.env.JWT_SECRET;

const username = "Selena";
const plainTextPW = "password";

// Function to hash the paswords
const hashPassword = async (password, saltCount) => {
    const hash = await bcrypt.hash(password, saltCount);
    return hash;
}

const register = async (user, password) => {
    // This creates the table, dropping it first if it already existed
    await db.sync();
    try {
        const hashedPw = await hashPassword(password, 9);
        let {id, username} = await User.create({username: user, password: hashedPw});
        // Create JWT token here
const token = jwt.sign({id, username}, JWT_SECRET);
        return {message: "Thanks for registering! Here is your token", token};
    } catch(err) {
        console.error(err);
    }
}

const login = async (username, password) => {
    try {
        const [foundUser] = await User.findAll({where: {username}});
        if(!foundUser) {
            return 'Failed';
        }
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if(isMatch) {
            // Create JWT token here
        const token = jwt.sign(username, JWT_SECRET);
            return {message: "Welcome back! Here is your token", token};
        } else {
            return 'Failed';
        }
    } catch(err) {
        console.error(err);
    }
}

register(username, plainTextPW)
.then((result) => {
    console.log(result);
});

login(username, plainTextPW)
.then((result) => {
    console.log(result)
});


const SALT_COUNT = 10;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to Selinas SongBook!</h1><p>Create songs with the /music endpoint!</p>"
  );
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  if (id != req.user.id) {
    res.sendStatus(403);
  }
  const user = await User.findByPk(id);
  res.send(user);
});

app.get("/music", async (req, res) => {
  const songs = await Song.findAll();
  res.send(songs);
});

app.get("/music/:id", async (req, res) => {
  const { id } = req.params;
  if (id != req.user.id) {
    res.sendStatus(403);
  }
  const song = await Song.findByPk(id);
  res.send(song);
});

app.post("/music", async (req, res) => {
  const song = await Song.create(req.body, {});
  res.send(song);
});

app.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, SALT_COUNT);
    await User.create({ username, password: hashed });

    console.log(req.body);
    res.send(`User "${username}" was successfully created.`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const [foundUser] = await User.findOne({ where: { username } });
    // hash compare
    if (!foundUser) {
      res.send("User not found");
      return;
    }
    // hash compare#
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      res.status(401).send("Username or password is incorrect.");
      return;
    }
    res.send(`successfully logged in user: ${username}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.put("/music/:id", async (req, res) => {
  const { id } = req.params;
  const song = await Song.findByPk(id);
  const song1 = await song.update(req.body, { where: { id: id } });
  res.send(song1);
});

app.delete("/music/:id", async (req, res) => {
  const { id } = req.params;
  await Song.destroy({
    where: { id },
  });
  res.send(`Deleted song ${id}`);
});

module.exports = app;
