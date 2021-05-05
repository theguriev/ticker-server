const { env } = require('process');
const express = require('express');
const cors = require('cors');

const dataCache = require('./tickers');

const app = express();
app.use(cors());

const port = env.PORT || 3000;

app.get('/price/:ticker', (req, res) => {
  const { ticker } = req.params;
  const price = dataCache[ticker];
  if (!price) {
    res.status(404).send('Ticker not found');
    return;
  }
  res.json({ symbol: ticker, ...price });
});

app.get('/prices/:tickers', (req, res) => {
  const { tickers } = req.params;
  const prices = tickers.split(',').map((ticker) => ({
    symbol: ticker,
    ...(dataCache[ticker] || { error: 'Ticker not found' }),
  }));
  if (prices.length === 0) {
    res.status(404).send('Ticker not found');
    return;
  }
  res.json(prices);
});

app.get('/fake-hit/:tickers', (req, res) => {
  const { tickers } = req.params;
  const { percentage = 0.75 } = req.query;
  tickers.split(',').forEach((ticker) => {
    const c = dataCache[ticker];
    c.bid *= percentage;
    c.ask *= percentage;
  });
  res.json({
    ok: true,
  });
});

app.get('/static/tickers', (req, res) => {
  res.json(Object.keys(dataCache));
});

app.listen(port, () => console.log(`Up: ${port}!`));
