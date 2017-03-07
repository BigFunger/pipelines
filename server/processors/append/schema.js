import Joi from 'joi';

export default function (server) {
  const baseSchema = server.plugins.pipelines.processors.baseSchema;

  return baseSchema.keys({
    type_id: Joi.string().only('append').required(),
    field: Joi.string().allow(''),
    values: Joi.array().items(Joi.string().allow(''))
  });
}
