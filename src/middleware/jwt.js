const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("X-JWT-KWY");

  if (!token) return res.status(401).send("ERROR");

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).send("ERROR");
  }
};