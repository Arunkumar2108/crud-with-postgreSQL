const express = require('express');
const bodyparser = require('body-parser');

const app = express();

const PORT = process.env.PORT | 4000;

const router = require('./routes/routes');

app.listen(PORT,() => {
    console.log('Server running at Port',PORT);
});

app.use(bodyparser.json());

app.use('/',router);

app.get('/',()=> {
    console.log('Hello');
});



