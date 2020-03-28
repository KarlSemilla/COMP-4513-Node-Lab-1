// node at this point doesn't support native JS fetch
const fetch = require("node-fetch");

// the lodash module has many powerful and helpful array functions
const _ = require("lodash");

// error messages need to be returned in JSON format
const jsonMessage = msg => {
  return { message: msg };
};

async function retrievePriceData(symbol, resp) {
  const url = `http://www.randyconnolly.com/funwebdev/3rd/api/stocks/history.php?symbol=${symbol}`;
  // retrieve the response then the json
  const response = await fetch(url);
  const prices = await response.json();
  // return the retrieved price data
  resp.json(prices);
}

const findSymbol = (stocks, req, resp) => {
  const symbolToFind = req.params.symbol.toUpperCase();
  // search the array of objects for a match
  const stock = stocks.filter(obj => symbolToFind === obj.symbol);
  // return the matching stock
  if (stock.length > 0) {
    resp.json(stock);
  } else {
    resp.json(jsonMessage(`Symbol ${symbolToFind} not found`));
  }
};
const updateSymbol = (stocks, req, resp) => {
  const symbolToUpd = req.params.symbol.toUpperCase();
  // use lodash module to find index for stock with this symbol
  let indx = _.findIndex(stocks, ["symbol", symbolToUpd]);
  // if didn't find it, then return message
  if (indx < 0) {
    resp.json(jsonMessage(`${symbolToUpd} not found`));
  } else {
    // symbol found in our stock array, so replace its value
    // with those from form
    stocks[indx] = req.body;
    // let requestor know it worked
    resp.json(jsonMessage(`${symbolToUpd} updated`));
  }
};

const insertSymbol = (stocks, req, resp) => {
  const symboltoIns = req.params.symbol.toUpperCase();
  let index = _.findIndex(stocks, ["symbol", symboltoIns]);
  if (index < 0) {
    resp.json(jsonMessage(`${symboltoIns} not found`));
  } else {
    stocks[index] = stocks.push(req.body);
    resp.json(jsonMessage(`${symboltoIns} has been added`));
  }
};

const deleteSymbol = (stocks, req, resp) => {
  const symbolToDel = req.params.symbol.toUpperCase();
  let index = _.findIndex(stocks, ["symbol", symbolToDel]);
  if (index < 0) {
    resp.json(jsonMessage(`${symbolToDel} not found`));
  } else {
    const remove = _.remove(stocks, ["symbol", symbolToDel]);
    resp.json(jsonMessage(`${symbolToDel} has been deleted`));
  }
};

const findName = (stocks, req, resp) => {
  const substring = req.params.substring.toLowerCase();
  // search the array of objects for a match
  const matches = stocks.filter(obj =>
    obj.name.toLowerCase().includes(substring)
  );
  if (matches.length > 0) {
    // return the matching stocks
    resp.json(matches);
  } else {
    resp.json(jsonMessage(`No symbol matches found for ${substring}`));
  }
};
const findPrices = (stocks, req, resp) => {
  const symbolToFind = req.params.symbol.toUpperCase();
  // search the array of objects for a match
  const stock = stocks.filter(obj => symbolToFind === obj.symbol);
  if (stock.length > 0) {
    // now get the hourly price data from IEX
    retrievePriceData(symbolToFind, resp);
  } else {
    resp.json(jsonMessage(`Symbol ${symbolToFind} not found`));
  }
};

module.exports = {
  findSymbol,
  updateSymbol,
  findName,
  findPrices,
  insertSymbol,
  deleteSymbol
};
