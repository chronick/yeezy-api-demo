const express = require('express');
const { getShoe, getShoes, createShoe, createTTSEntry } = require('./db');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { PORT = 8080 } = process.env;

const app = express();

const asyncMiddleware = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    next(e);
  }
};

app.use(morgan('combined'));
app.use(bodyParser.json());

app.get(
  '/shoes',
  asyncMiddleware(async (req, res) => {
    const result = await getShoes();
    res.status(200).json(result);
  })
);

app.get(
  '/shoes/:id',
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const result = await getShoe(id);
    if (!result) return res.status(404).send();
    res.status(200).json(result);
  })
);

app.post(
  '/shoes',
  asyncMiddleware(async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).send('Must provide name');

    const result = await createShoe({ name });
    res.status(201).json(result);
  })
);

app.post(
  `/tts`,
  asyncMiddleware(async (req, res) => {
    const { shoeId, value } = req.body;
    if (!shoeId || !value) return res.status(400).send('Invalid arguments')

    const result = await createTTSEntry({ shoeId, value });
    res.status(201).json(result);
  })
);

app.use(function(error, req, res) {
  res.status(500).json({ message: error.message });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
