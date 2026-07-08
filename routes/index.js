const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello kindly switch on the url to /users to access my Database ');
});

router.use('/users', require('./users'))

module.exports = router;