const express = require('express');
const dataCache = require('./tickers');

const app = express();
const port = 3000;

app.get('/price/:ticker', (req, res) => {
  const { ticker } = req.params;
  const price = dataCache[ticker];
  if (!price) {
    res.status(404).send('Ticker not found');
  }
  res.json(price);
});

app.get('/static/tickers', (req, res) => {
  res.json(Object.keys(dataCache));
});

app.listen(port, () => console.log(`Up: ${port}!`));
