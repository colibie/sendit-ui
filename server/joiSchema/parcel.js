import Joi from 'joi';

const Schema = {
  validate(value, schema) {
    const result = Joi.validate(value, schema);
    if (result.error == null) return false;
    return result.error.details[0].message;
  },
  create: Joi.object().keys({
    placedby: Joi.string().required(),
    weight: Joi.number().required(),
    weightmetric: Joi.string().allow(''),
    sentfrom: Joi.string().required(),
    sentto: Joi.string().required(),
    description: Joi.string().allow('')
  }),
};

export default Schema;
