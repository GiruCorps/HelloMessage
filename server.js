const app = require("./src/app.js");
const pino = require("pino");

const logger = pino();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});