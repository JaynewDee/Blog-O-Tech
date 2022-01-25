const userAuth = require('../utilities/authorization');
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home')

router.use('/api', apiRoutes);
router.use('/home', homeRoutes)

module.exports = router;

router.get('/', (req, res) => {
   document.location.replace('/home')
})