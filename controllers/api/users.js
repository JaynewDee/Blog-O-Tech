const user = require('express').Router();
const {
   User
} = require('../../models')


// Render login view at api/user/login
user.get('/login', async (req, res) => {
   res.render('login')
})

// Use User sequelize model to add new user object to database
user.post('/', async (req, res) => {
   try {
      const userData = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
      });
         req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
         })
   } catch (err) {
      console.log(err)
      res.status(500).json(err);
   }
})

// Verify hashed bcrypt password, login and begin new authenticated session
user.post('/login', async (req, res) => {
   try {
      const userData = await User.findOne({
         where: {
            email: req.body.email
         }
      });
      if (!userData) {
         res.status(400)
            .json({
               message: 'Incorrect email or password, please try again'
            });
         return;
      }
      const validPassword = userData.checkPassword(req.body.password);

      if (!validPassword) {
         res
            .status(400)
            .json({
               message: 'Incorrect email or password, please try again'
            });
         return;
      }
      req.session.save(() => {
         req.session.user_id = userData.id;
         req.session.logged_in = true;

         res.json({
            user: userData,
            message: 'You are now logged in!'
         })
      })
   } catch (err) {
      res.status(400).json(err);
   }
})

// Logout user, end authenticated session
user.post('/logout', (req, res) => {
   if (req.session.logged_in) {
      req.session.destroy(() => {
         res.status(204).end();
      });
   } else {
      res.status(404).end();
   }
})



module.exports = user;