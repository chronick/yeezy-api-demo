INSERT INTO shoes (name)
    VALUES ('yeezy'), ('jordan-one');
INSERT INTO true_to_size_entries (shoe_id, tts_value) (
  SELECT
    shoes.id,
    floor(random() * 5 + 1)::int AS tts_value
  FROM
    shoes
  CROSS JOIN generate_series(1, 200) AS x)
