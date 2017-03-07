import { find, get, map, keys } from 'lodash';
import pipelineConverterProvider from '../pipeline/converter';
import simulateDocsConverterProvider from '../simulate_docs/converter';

export default function (server) {
  const pipelineConverter = pipelineConverterProvider(server);
  const simulateDocsConverter = simulateDocsConverterProvider(server);

  return {
    kibanaToEs: function (pipelineApiDocument) {
      return {
        pipeline: pipelineConverter.kibanaToEs(pipelineApiDocument),
        docs: simulateDocsConverter.kibanaToEs(pipelineApiDocument)
      };
    },
    esResponseToKibana: (simulateEsDocument) => {
      const docs = get(simulateEsDocument, 'docs');
      const results = map(docs, (doc) => {
        const processorResults = get(doc, 'processor_results');
        return map(processorResults, (processorResult) => {
          let processorError;
          const errorMessage =
            get(processorResult, 'error.root_cause[0].reason') ||
            get(processorResult, 'error.root_cause[0].type') ||
            get(processorResult, 'ignored_error.error.root_cause[0].reason') ||
            get(processorResult, 'ignored_error.error.root_cause[0].type');

          if (errorMessage) {
            processorError = {
              compile: false,
              message: errorMessage
            };
          }

          return {
            processor_id: get(processorResult, 'tag'),
            output: get(processorResult, 'doc._source'),
            ingest_meta: {
              '_index': get(processorResult, 'doc._index'),
              '_id': get(processorResult, 'doc._id'),
              '_type': get(processorResult, 'doc._type'),
              '_routing': get(processorResult, 'doc._routing'),
              '_parent': get(processorResult, 'doc._parent'),
              '_timestamp': get(processorResult, 'doc._timestamp'),
              '_ttl': get(processorResult, 'doc._ttl'),
              '_ingest': get(processorResult, 'doc._ingest')
            },
            error: processorError
          };
        });
      });

      return results;
    },
    esErrorToKibana: function (simulateEsDocument, request) {
      const errorMessage = get(simulateEsDocument, 'body.error.root_cause[0].reason');
      let processorId = get(simulateEsDocument, 'body.error.root_cause[0].header.processor_tag');

      if (errorMessage === 'No processor type exists with name [undefined]') {
        const processors = get(request, 'pipeline.processors');
        const processor = find(processors, (processor) => {
          return keys(processor)[0] === 'undefined';
        });
        processorId = get(processor, 'undefined.tag');
      }

      if (!processorId) throw simulateEsDocument;

      const processorError = {
        compile: true,
        message: errorMessage
      };

      const results = [
        [
          {
            processor_id: processorId,
            error: processorError
          }
        ]
      ];

      return results;
    }
  };
}
