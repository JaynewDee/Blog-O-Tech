const home = require('express').Router();
const { User } = require('../models');
const userAuth = require('../utilities/authorization');

home.get('/', async (req, res) => {
     try {
          res.render('home')
     }
     catch (err){
          res.status(500).json(err)
     }
})

module.exports = home;