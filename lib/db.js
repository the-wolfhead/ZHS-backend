const { Pool } = require('pg');

const pool = new Pool({
  user: 'myapp_qskd_user',
  host: 'dpg-cn0g0i0l5elc73ejge5g-a',
  database: 'myapp_qskd',
  password: 'i06MCdq5BS3j1CneWNsRRJt5rFGIqtaS',
  port: 5432, // default PostgreSQL port
  multipleStatements: true,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

module.exports = pool;