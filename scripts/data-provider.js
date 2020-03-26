const fetch = require("node-fetch");
const stockRouter = require("./stock-router.js");
async function retrieveCompanies(app) {
  const url = `https://www.randyconnolly.com/funwebdev/3rd/api/stocks/companies.php`;
  // use fetch and await to get stocks data
  const response = await fetch(url);
  const stocks = await response.json();

  // handle other requests for stocks
  stockRouter.handleSingleSymbol(stocks, app);
  stockRouter.handleNameSearch(stocks, app);
  stockRouter.handlePriceData(stocks, app);
  // return all the stocks when a root request arrives
  app.get("/", (req, resp) => {
    resp.json(stocks);
  });
}
module.exports = { retrieveCompanies };
