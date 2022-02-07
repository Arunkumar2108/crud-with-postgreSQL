const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "arun2108",
    database: "demo"
});


module.exports = client;