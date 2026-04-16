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

  const { message, to, from, timeToLifeSec } = value;

  const token = jwt.sign(
    {
      message, 
      to, 
      from, 
      nonce: Math.random()
    },
    process.env.JWT_SECRET,
    {
      expiresIn: timeToLifeSec
    }
  );

  return res.json({
    message: `Hello ${to} your message will be sent`
  });
};
