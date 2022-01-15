const user = require('express').Router();
const {User} = require('../../models')

// Create User
user.get('/login', async (req, res) => {
    res.render('login')
})

// Login User
user.post('/login', async (req, res) => {
     try {
       const userData = await User.findOne({ where: { email: req.body.email}});
       console.log(userData)
        console.log(req)
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
