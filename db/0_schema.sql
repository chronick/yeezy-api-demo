CREATE TABLE IF NOT EXISTS shoes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS true_to_size_entries (
    id SERIAL PRIMARY KEY,
    shoe_id INTEGER REFERENCES shoes (id),
    tts_value BIGINT NOT NULL
);
