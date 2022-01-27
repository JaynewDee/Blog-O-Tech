const router = require('express').Router();
const userRoutes = require('./users')
const postRoutes = require('./posts')
const userAuth = require('../../utilities/authorization');


// Re-route requests based on document.location, using auth middleware to check for active user session and redirect to login page if session not active.
router.use('/user', userRoutes);
router.use('/post', userAuth, postRoutes);
module.exports = router;