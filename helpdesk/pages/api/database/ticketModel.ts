const { Pool } = require('pg');

const PG_URI = process.env.NEXT_PUBLIC_PG_LINK;

const pool = new Pool({
  connectionString: PG_URI,
});

const query = (text: string, params: [], callback: () => void) => {
  return pool.query(text, params, callback);
};

export { pool, query };
