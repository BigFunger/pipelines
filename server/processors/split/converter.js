import { assign } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'split');
      assign(result.split, {
        field: processorApiDocument.field,
        separator: processorApiDocument.separator
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'split');

      assign(result, {
        field: processorEsDocument.split.field,
        separator: processorEsDocument.split.separator
      });

      return result;
    }
  };
}
