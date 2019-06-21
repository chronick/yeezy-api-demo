const { Pool } = require('pg');
const { DATABASE_URL } = process.env;
const pool = new Pool({
  connectionString: DATABASE_URL,
});

const SHOES_LIST_QUERY = `SELECT * FROM shoes`;

const SHOE_CREATE_QUERY = `INSERT INTO shoes (name) VALUES ($1)`

const SHOE_CREATE_TTS_ENTRY_QUERY = `
  INSERT INTO true_to_size_entries (shoe_id, tts_value) VALUES ($1, $2)
`;

const SHOE_DETAIL_QUERY = `
  SELECT shoes.id, shoes.name, avg(tts.tts_value) as trueToSize
  FROM shoes
  JOIN true_to_size_entries tts
    ON tts.shoe_id = shoes.id
  WHERE shoe_id = $1
  GROUP BY shoes.id, shoes.name
`;

async function getShoes() {
  const { rows } = await pool.query(SHOES_LIST_QUERY);
  return rows;
}

async function getShoe(id) {
  const { rows } = await pool.query(SHOE_DETAIL_QUERY, [id]);
  return rows[0];
}

function createShoe({ name }) {
  return pool.query(SHOE_CREATE_QUERY, [name]);
}

function createTTSEntry({ shoeId, value }) {
  return pool.query(SHOE_CREATE_TTS_ENTRY_QUERY, [shoeId, value]);
}

module.exports = {
  getShoe,
  getShoes,
  createShoe,
  createTTSEntry,
  SHOES_LIST_QUERY,
  SHOE_DETAIL_QUERY,
};
