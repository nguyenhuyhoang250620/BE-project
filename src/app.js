require("dotenv").config();
require("./database");

const express = require("express");
const app = express();

app.use(express.json());
app.use("/auth", require("./modules/auth/auth.route"));
app.use("/menu",require('./modules/menu/menu.route'));
app.get(
  "/protected",
  require("./modules/auth/auth.middleware").authGuard,
  (req, res) => {
    res.json({ user: req.user });
  },
);

app.listen(3000, () => console.log("auth server running"));
