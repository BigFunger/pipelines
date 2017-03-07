import { assign, isEmpty } from 'lodash';

export default function (server) {
  const baseConverter = server.plugins.pipelines.processors.baseConverter;

  return {
    kibanaToEs: function (processorApiDocument) {
      const result = baseConverter.kibanaToEs(processorApiDocument, 'dot_expander');
      assign(result.dot_expander, {
        field: processorApiDocument.field
      });

      if (!isEmpty(processorApiDocument.path)) {
        assign(result.dot_expander, {
          path: processorApiDocument.path
        });
      }

      return result;
    },
    esToKibana: function (processorEsDocument) {
      const result = baseConverter.esToKibana(processorEsDocument, 'dot_expander');

      assign(result, {
        field: processorEsDocument.dot_expander.field
      });

      if (!isEmpty(processorEsDocument.dot_expander.path)) {
        assign(result, {
          path: processorEsDocument.dot_expander.path
        });
      }

      return result;
    }
  };
}
