import { assign } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'remove');
      assign(result.remove, {
        field: processorApiDocument.field
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'remove');

      assign(result, {
        field: processorEsDocument.remove.field
      });

      return result;
    }
  };
}
