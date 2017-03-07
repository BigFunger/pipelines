import Joi from 'joi';

export default function (server) {
  const baseSchema = server.plugins.pipelines.processors.baseSchema;

  return baseSchema.keys({
    type_id: Joi.string().only('set').required(),
    field: Joi.string().allow(''),
    value: Joi.string().allow(''),
    override: Joi.bool().required()
  });
}
