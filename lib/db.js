const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'dpg-crl79nbtq21c73e9d8i0-a',
  database: 'zhs_6vrd',
  password: '8uENmBiDtCsLWH8YxHc2SjunA1FvSxwX',
  port: 5432, // default PostgreSQL port
  multipleStatements: true,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

module.exports = pool;
