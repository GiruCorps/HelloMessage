module.exports = (req, res, next) => {
  const apiKey = req.header("X-Parse-REST-API-Key");
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).send("ERROR");
  }
  next();
};