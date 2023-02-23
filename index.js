const express = require("express");
const bcrypt = require("bcrypt");

const SALT_COUNT = 10;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { User, Song } = require("./models");

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
