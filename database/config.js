// The following was used in dev
const config = {
  user: 'administrator',
  host: 'localhost',
  database: 'event_hud',
  password: null,
  port: 5432,
  max: 10, // max number of connection can be open to database
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};

// Config for deployed app
// const config = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// };

module.exports = config;
