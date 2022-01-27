// Authentication middleware ensures that certain routes can only be accessed if the user's session is active and secure

const userAuth = (req, res, next) => {
     if (!req.session.logged_in) {
          res.redirect('/api/user/login');
     } else {
          next();
     }
};

module.exports = userAuth;