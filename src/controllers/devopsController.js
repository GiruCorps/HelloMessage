const jwt = require("jsonwebtoken");
const Joi = require("joi");

const schema = Joi.object({
  message: Joi.string().required(),
  to: Joi.string().required(),
  from: Joi.string().required(),
  timeToLifeSec: Joi.number().integer().positive().required()
});

exports.handleRequest = (req, res) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).send("ERROR");
  }

  const { to } = value;

  return res.json({
    message: `Hello ${to} your message will be sent`
  });
};
