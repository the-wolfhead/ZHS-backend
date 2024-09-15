const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'dpg-cr07sgbv2p9s73a31fg0-a',
  database: 'zhs',
  password: 'JkO0wSB05xy3BSx8aHOarpKDRP63YVCy',
  port: 5432, // default PostgreSQL port
  multipleStatements: true,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

module.exports = pool;
