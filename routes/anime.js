const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Anime = require('../models/anime');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get Anime list //   http://localhost:8000/anime?page=1&limit=15
router.get('', paginatedResults(Anime), (req, res) => {
  res.json(res.paginatedResults)
})

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
    order: [
      ['rating', 'DESC'],
      ['episodes', 'DESC'],
    ],
    attributes: ['name', 'altName','nameLink'],
  }).then(Animes => res.send(Animes[0]))
  .catch(err => {
    console.log(err)
    res.send('plz write full name')
  });
});


// generalize the pagination so that it can be used with any model 

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if ( endIndex < await model.count()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if ( startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      results.results = await Anime.findAll({
        offset : startIndex ,
        limit : limit ,
        order: [
          ['rating', 'DESC'],
          ['episodes', 'DESC'],
        ]
      })
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = router;