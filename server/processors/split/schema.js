import Joi from 'joi';

export default function (server) {
  const baseSchema = server.plugins.pipelines.processors.baseSchema;

  return baseSchema.keys({
    type_id: Joi.string().only('split').required(),
    field: Joi.string().allow(''),
    separator: Joi.string().allow('')
  });
}
