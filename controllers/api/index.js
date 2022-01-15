const router = require('express').Router();
const userRoutes = require('./users')
const postRoutes = require('./posts')

router.use('/user', userRoutes);
router.use('/post', postRoutes);
module.exports = router;