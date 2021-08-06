const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());

require('dotenv').config();

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Models
const db = require("./models");

// sync database with sequalize
db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync database.");
}).catch(err => {
  console.log("error", err);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to esparkinfo application." });
});

// Route 
require("./route/auth.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});