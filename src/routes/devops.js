const express = require("express");
const router = express.Router();

const controller = require("../controllers/devopsController");
const apiKey = require("../middleware/apiKey");
const jwtMiddleware = require("../middleware/jwt");

router.use(apiKey);
router.use(jwtMiddleware);

router.post("/", controller.handleRequest);

router.all("/", (req, res) => {
  res.status(405).send("ERROR");
});

module.exports = router;