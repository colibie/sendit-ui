import Joi from 'joi';

const schema = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  othernames: Joi.string(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const validate = (value) => {
  const result = Joi.validate(value, schema);
  if (result === null) return false;
  return result.error.details[0].message;
};

export default validate;
