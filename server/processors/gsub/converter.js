import { assign } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'gsub');
      assign(result.gsub, {
        field: processorApiDocument.field,
        pattern: processorApiDocument.pattern,
        replacement: processorApiDocument.replacement
      });

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'gsub');

      assign(result, {
        field: processorEsDocument.gsub.field,
        pattern: processorEsDocument.gsub.pattern,
        replacement: processorEsDocument.gsub.replacement
      });

      return result;
    }
  };
}
