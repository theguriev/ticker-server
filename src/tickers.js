const { stdout } = require('process');

const rnd = (multiplier) => (multiplier ? Math.random() * multiplier : Math.random());

const randomPrice = () => rnd() * rnd() * rnd(100);
const tickPrice = (price) => price + ((price / 100) * rnd() * (rnd() > 0.5 ? 1 : -1));

const symbols = [
  'PLUG.O',
  'FCEL.O',
  'CSCO.O',
  'MSFT.O',
  'AAPL.O',
  'BBBY.O',
  'NVDA.O',
  'SIRI.O',
  'CMCSA.O',
  'INTC.O',
  'BLDP.O',
  'AMAT.O',
  'GILD.O',
  'QCOM.O',
  'AGNC.O',
  'MRVL.O',
  'EBAY.O',
  'SGMS.O',
  'HBAN.O',
  'NFLX.O',
  'TIVO.O',
  'MYL.O',
  'NYMT.O',
  'ENDP.O',
  'ATVI.O',
  'SBUX.O',
  'AGEN.O',
  'IMGN.O',
  'GPOR.O',
  'INMD.O',
  'SONO.O',
  'PAAS.O',
  'DISH.O',
  'JBLU.O',
  'EXEL.O',
];
const cache = symbols.reduce((acc, cur) => {
  const price = randomPrice();
  acc[cur] = {
    bid: price,
    ask: price + 1,
    lastVol: 0,
  };
  return acc;
}, {});

const tick = () => {
  if (rnd() < 0.5) {
    setTimeout(tick, rnd(50));
    return;
  }

  const pos = Math.floor(rnd() * symbols.length);
  const cachedItem = cache[symbols[pos]];

  const number = rnd();
  if (number >= 0.5 && number < 0.75) {
    cachedItem.bid = tickPrice(cachedItem.bid);
  } else {
    cachedItem.ask = tickPrice(cachedItem.ask);
  }
  cachedItem.lastVol = Math.round(rnd(100000)) * 1000;
  stdout.write('.');

  setTimeout(tick, rnd(50));
};

tick();

module.exports = cache;
