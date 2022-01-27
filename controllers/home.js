const home = require('express').Router();
const { User, Post } = require('../models');


// If user is not logged in, redirect to login page. Else, populate all posts from all users on rendered 'home' view
home.get('/', async (req, res) => {
   if(!req.session.logged_in) {
      res.redirect('/api/user/login')
   }
   const postData = await Post.findAll({
      include: [
         {
            model: User,
            attributes: ['name', 'email']
         }
      ]
   })
   console.log(postData)

   const posts = postData.map((post) => post.get({ plain: true}))

   res.render('home', {
      posts,
      logged_in: req.session.logged_in
   })
     
     
})

home.get('/:id', async (req, res) => {
   const userData = await User.findOne({

   })
})
module.exports = home;