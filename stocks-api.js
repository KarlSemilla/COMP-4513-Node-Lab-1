const path = require("path");
const parser = require("body-parser");
const express = require("express");

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

const provider = require("./scripts/data-provider.js");
provider.retrieveCompanies(app);

app.use("/static", express.static(path.join(__dirname, "public")));

let port = 8080;
app.listen(port, () => {
  console.log("Server running at port= " + port);
});
