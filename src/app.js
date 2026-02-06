require("dotenv").config();
require("./database");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000
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

app.listen(PORT, () => console.log("auth server running"));
