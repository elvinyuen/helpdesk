const { Pool } = require('pg');

const PG_URI = process.env.NEXT_PUBLIC_PG_LINK;

const pool = new Pool({
  connectionString: PG_URI,
});

const query = (text, params, callback) => {
  console.log('query executed', text);
  return pool.query(text, params, callback);
};

// module.exports = {
//   query: (text: string, params: string, callback: () => void) => {
//     console.log('query executed', text);
//     return pool.query(text, params, callback);
//   },
// };

export { pool, query };
