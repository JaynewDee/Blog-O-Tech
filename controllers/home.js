const home = require('express').Router();
const { User, Post } = require('../models');


home.get('/', async (req, res) => {
   const postData = await Post.findAll({
      include: [
         {
            model: User,
            attributes: ['name', 'email']
         }
      ]
   })

   const posts = postData.map((post) => post.get({ plain: true}))

   res.render('home', {
      posts,
      logged_in: req.session.logged_in
   })
     
     
})

home.get('/:id', (req, res) => {
   const userData = await User.findOne({
      
   })
})
module.exports = home;