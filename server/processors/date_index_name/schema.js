import Joi from 'joi';

export default function (server) {
  const baseSchema = server.plugins.pipelines.processors.baseSchema;

  return baseSchema.keys({
    type_id: Joi.string().only('date_index_name').required(),
    field: Joi.string().allow(''),
    date_rounding: Joi.string().allow(''),
    index_name_prefix: Joi.string().allow(''),
    formats: Joi.array().items(Joi.string().allow('')),
    timezone: Joi.string().allow(''),
    locale: Joi.string().allow(''),
    index_name_format: Joi.string().allow('')
  });
}
