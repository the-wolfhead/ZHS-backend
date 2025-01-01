const { Pool } = require('pg');

const pool = new Pool({
  user: 'zhs_ribo_user',
  host: 'dpg-ctqhsfpopnds73f75udg-a',
  database: 'zhs_ribo',
  password: '93mYa05sz6COnkYrsMD8ZnKFpRbHefzL',
  port: 5432, // default PostgreSQL port
  multipleStatements: true,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

module.exports = pool;
