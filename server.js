const express = require('express');
const bodyParser = require('body-parser');


const mongodb = require('./data/database.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Arrow-Origin', '*');
    res.setHeader(
        'Access-Control-Arrow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));



mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(PORT, () => {
            console.log(`DataBase is Listenenig and node Running on port ${PORT}`);
        });
    }
});

