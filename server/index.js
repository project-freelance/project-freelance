require("dotenv").config();
const express = require("express");
const axios = require("axios");
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const PORT = process.env.PORT || 3001;

const app = express();

// massive(process.env.CONNECTION_STRING).then(dbInstance => {
//   return app.set("db", dbInstance);
// });

app.use(json());
app.use(cors());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
