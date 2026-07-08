const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello kindly switch on the url to /contacts ');
});

router.use('/users', require('./users'))

module.exports = router;