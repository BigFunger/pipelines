import Joi from 'joi';

export default function (server) {
  const baseSchema = server.plugins.pipelines.processors.baseSchema;

  return baseSchema.keys({
    type_id: Joi.string().only('dot_expander').required(),
    field: Joi.string().allow(''),
    path: Joi.string().allow('')
  });
}
