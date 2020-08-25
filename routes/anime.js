const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Anime = require('../models/anime');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get Anime list
router.get('/all', (req, res) => 
  Anime.findAll()
    .then(animes => res.send(animes))
    .catch(err => console.log(err) ));

// Search for Animes
router.get('/GeneralSearch/:name', (req, res) => {
  let term = req.params.name;
  term = term.toLowerCase();
  Anime.findAll({
    where: {
      [Op.or]: [
        {name: { [Op.like]: '%' + term + '%' }}, 
        {altName: { [Op.like]: '%' + term + '%' }}
      ]
    },
    order: [
      ['rating', 'DESC'],
      ['episodes', 'DESC'],
    ]
  }).then(Animes => res.send(Animes))
  .catch(err => {
    console.log(err)
    res.send('plz write name in better method')
  });
  // Anime.findAll({ where: { name : { [Op.like]: '%' + term + '%' } } })
});

router.get('/SpecificSearch/:name', (req, res) => {
  let term = req.params.name;
  term = term.toLowerCase();
  Anime.findAll({
    where: {
      [Op.or]: [
        {name: term}, 
        {altName: term}
      ]
    },
    attributes: ['name', 'altName','nameLink'],
  }).then(Animes => res.send(Animes[0]))
  .catch(err => {
    console.log(err)
    res.send('plz write full name')
  });
  // Anime.findAll({ where: { name : { [Op.like]: '%' + term + '%' } } })
});

module.exports = router;