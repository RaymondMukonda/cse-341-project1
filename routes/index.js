const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    // swagger.tags=['Hello There!]
    res.send('Hello kindly switch on the url to /users to access my Database ');
});

router.use('/users', require('./users'))

module.exports = router;