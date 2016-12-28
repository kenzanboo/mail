import Joi from 'joi';

export default {
  email: {
    body: {
      to: Joi.string().regex(/^\S+@\S+$/).required(),
      to_name: Joi.string().required(),
      from: Joi.string().regex(/^\S+@\S+$/).required(),
      from_name: Joi.string().required(),
      subject: Joi.string().required(),
      body: Joi.string().required()
    }
  }
};
