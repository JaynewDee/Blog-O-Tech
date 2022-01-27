const post = require('express').Router();
const {Post, User} = require('../../models')


// Render new post view with form
post.get('/new', async (req, res) => {
   res.render('post', {
      logged_in: req.session.logged_in
   })
})

// Post request to add post to database upon form submission
post.post('/new', async (req, res) => {
//   Handle logic of request for post submission following "Submit Post" button click
   try {
      const newPost = await Post.create({
         ...req.body,
         user_id: req.session.user_id,
      });
   
      res.status(200).json(newPost)
         
   } catch (err) {
      console.log(err)
      res.status(500).json(err);
   }
})

module.exports = post;