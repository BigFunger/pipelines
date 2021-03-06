import { keys, set } from 'lodash';
import baseSchema from './processors/base/schema';
import baseConverterProvider from './processors/base/converter';

export function registerPipelinesManager(server) {
  const schemas = {};
  const converters = {};
  const processors = {};
  const baseConverter = baseConverterProvider(server);

  function registerProcessor(options) {
    //options will come in this format:
    //{
    //  typeid: {
    //    schemaProvider: func,
    //    converterProvider: func
    //  }
    //}
    const typeId = keys(options)[0];
    const processorOptions = options[typeId];

    if (!processorOptions) throw new Error('Invalid options argument');
    if (typeof processorOptions.schemaProvider !== 'function') {
      throw new Error('Missing schemaProvider in options argument');
    }
    if (typeof processorOptions.converterProvider !== 'function') {
      throw new Error('Missing converterProvider in options argument');
    }

    set(schemas, typeId, processorOptions.schemaProvider(server));
    set(converters, typeId, processorOptions.converterProvider(server));
  };

  server.expose('processors', {
    register: registerProcessor,
    schemas: schemas,
    converters: converters,
    baseSchema: baseSchema,
    baseConverter: baseConverter
  });
};
