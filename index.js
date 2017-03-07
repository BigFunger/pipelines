import { registerPipelinesManager } from './server/pipelines_manager';
import { registerProcessors } from './server/processors';
import { registerRoutes } from './server/routes';

module.exports = function (kibana) {
  return new kibana.Plugin({
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      managementSections: [
        'plugins/pipelines',
      ]
    },
    init: (server) => {
      registerPipelinesManager(server);
      registerProcessors(server);
      registerRoutes(server);
    }
  });
};
