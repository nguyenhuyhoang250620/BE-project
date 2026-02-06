const jwt = require("jsonwebtoken");
exports.authGuard = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    req.user = jwt.verify(token, process.env.ACCESS_SECRET || "access_secret");
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};
