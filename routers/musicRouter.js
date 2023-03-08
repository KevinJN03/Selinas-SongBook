const express = require('express')
const router = express.Router()
const {Song, User} = require('../models')

router.get("/:id", async (req, res) => {
    if (req.user.isSelena != true) {
      res.send(401)
      return
    }
    const { id } = req.params; 
    const song = await Song.findByPk(id); 
    res.send(song);
  });
  
router.put("/:id", async (req, res) => {
    if (req.user.isSelena != true) {
      res.send(401)
      return
    }
    const { id } = req.params;
    const song = await Song.findByPk(id);
    const song1 = await song.update(req.body, { where: { id: id } });
    res.send(song1);
  });
  
router.delete("/:id", async (req, res) => {
    if (req.user.isSelena != true) {
      res.send(401)
      return
    }
    const { id } = req.params;
    await Song.destroy({
      where: { id },
    });
    res.send(`Deleted song ${id}`);
  });


router.get("/", async (req, res) => {
    const songs = await Song.findAll();
    res.send(songs);
  });
  
  
router.post("/", async (req, res) => { 
    const song = await Song.create(req.body, {});
    res.send(song);
  });

module.exports = router 