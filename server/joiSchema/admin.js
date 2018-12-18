import Joi from 'joi';

const Schema = {
  validate(value, schema) {
    const result = Joi.validate(value, schema);
    if (result.error == null) return false;
    return result.error.details[0].message;
  },
  signup: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
};

export default Schema;
