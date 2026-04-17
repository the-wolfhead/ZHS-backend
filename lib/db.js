const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin_01r',
  host: 'dpg-d3gp2oe3jp1c73eve48g-a',
  database: 'zhs_db',
  password: 'wJo3E5B6XrZAPmaxqT2xmMLa2sbhwLURL',
  port: 5432, // default PostgreSQL port
  multipleStatements: true,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

module.exports = pool;
