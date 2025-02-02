const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const auth = require("./route/auth.route");
const expense = require("./route/expense.route");
auth(app);
expense(app);

app.listen(port, () => {
  console.log("listening on port " + port);
});
