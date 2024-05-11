const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'dpg-cn0g0i0l5elc73ejge5g-a',
  database: 'data_r8r4',
  password: 'rTXeiupKB1PimLj3O6wfinvK9Y2afbzq',
  port: 5432, // default PostgreSQL port
  multipleStatements: true,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

module.exports = pool;
