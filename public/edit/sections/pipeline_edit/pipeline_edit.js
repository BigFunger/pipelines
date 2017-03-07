import uiModules from 'ui/modules';
import template from './pipeline_edit.html';
import { PipelinesProvider } from 'plugins/pipelines/pipelines_service';
//import slugifyId from 'ui/utils/slugify_id';
import saveTemplate from './save_partial.html';
import './pipeline_edit.less';

const app = uiModules.get('pipelines');

app.directive('pipelineEdit', function () {
  return {
    restrict: 'E',
    template: template,
    controller: function ($scope, $rootScope, $route, kbnUrl, Private, Notifier) {
      const pipelines = Private(PipelinesProvider);
      const notify = new Notifier({ location: `Pipeline Setup` });
      $scope.pipeline = $route.current.locals.pipeline;

      $scope.topNavOpts = {
        pipeline: $scope.pipeline,
        doSave: () => {
          const pipeline = $scope.pipeline;
          //pipeline.pipelineId = slugifyId(pipeline.pipelineId);

          return pipelines.pipeline.save(pipeline.model)
          .then((result) => {
            notify.info(`Pipeline '${pipeline.pipelineId}' saved!`);
            $scope.kbnTopNav.close();
          })
          .catch(notify.error);
        }
      };

      $scope.topNavMenu = [{
        key: 'save',
        template: saveTemplate,
        description: 'Save Pipeline'
      }];

      $scope.primaryNavSections = {
        documents: {
          title: 'Documents'
        },
        processors: {
          title: 'Processors'
        }
      };

      if ($scope.pipeline.sampleCollection.samples.length > 0) {
        $scope.primaryNavSection = $scope.primaryNavSections.processors;
      } else {
        $scope.primaryNavSection = $scope.primaryNavSections.documents;
      }

      $scope.$watch('primaryNavSection', (newVal, oldVal) => {
        if (newVal !== oldVal && oldVal === $scope.primaryNavSections.documents) {
          $scope.pipelineProcessors.simulate();
        }
      });
    }
  };
});
