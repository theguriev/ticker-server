# ticker-server
A very, very simple tick data generator which can be accessed over REST.

Creates and ticks bid/ask/vol values.

To use:
1. `yarn`
2. `yarn run tick`
3. Point (browser, Postman, `fetch`, `XMLHttpRequest`, `axios`) to one of:
 - `http://localhost:3000/static/tickers` for symbol list.
 - `http://localhost:3000/price/[SYMBOL]` for a bid/ask/vol JSON blob.
 - `http://localhost:3000/prices/[SYMBOL],[SYMBOL]` for an array of bid/ask/vol JSON blobs.
 - `http://localhost:3000/fake-hit/[SYMBOL]?percentage=0.5` to create a fake market event which will multiply the symbol's bid and ask price by the supplied percentage. 
