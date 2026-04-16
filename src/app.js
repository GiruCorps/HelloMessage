const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const devopsRoutes = require("./routes/devops");

const app = express();

app.use(express.json());
app.use(helmet());

app.use(rateLimit({
  windowMs: 60000,
  max: 60
}));

app.use("/DevOps", devopsRoutes);

app.get("/health", (req, res) => {
  res.json({ 
    status: "ok"
  });
});

app.use((req, res) => {
  res.status(404).send("ERROR");
});

module.exports = app;