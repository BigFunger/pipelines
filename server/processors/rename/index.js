import schemaProvider from './schema';
import converterProvider from './converter';

export default function (server) {
  const pipelines = server.plugins.pipelines;

  pipelines.processors.register({
    rename: {
      converterProvider: converterProvider,
      schemaProvider: schemaProvider
    }
  });
}
