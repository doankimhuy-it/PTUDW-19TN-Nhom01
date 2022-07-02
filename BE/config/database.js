const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const config = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: config,
    /* ssl: { rejectUnauthorized: false } */
});

pool.on('connect', () => {
    console.log("Connect sucessfully");
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};