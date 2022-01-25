const user = require('express').Router();
const { response } = require('express');
const { User } = require('../../models')

user.get('/login', async (req, res) => {
    res.render('login')
})

// Create User

user.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(dbUserData)
    if(response.ok) {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    })};
  } catch (err) {
    res.status(500).json(err);
  }
})

// Login User
user.post('/login', async (req, res) => {
     try {
       const userData = await User.findOne({ where: { email: req.body.email}});
       console.log(userData)

       if (!userData) {
         res.status(400)
         .json({ message: 'Incorrect email or password, please try again'});
         return;
       }
       const validPassword = userData.checkPassword(req.body.password);

       if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.json({ user: userData, message: 'You are now logged in!'})
      })
     } catch (err) {
       res.status(400).json(err);
     }
})



module.exports = user;
