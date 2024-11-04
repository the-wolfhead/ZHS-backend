const { Pool } = require('pg');

const pool = new Pool({
  user: 'zhs_pys5_user',
  host: 'dpg-csk7d8aj1k6c73bveqj0-a',
  database: 'zhs_pys5',
  password: 'C1kNnsCMhKOxD55gyKSplKDgVhZiaWJf',
  port: 5432, // default PostgreSQL port
  multipleStatements: true,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

module.exports = pool;
