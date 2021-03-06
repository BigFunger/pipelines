import uiModules from 'ui/modules';
import template from './processor_ui_rename.html';

const app = uiModules.get('pipelines');

//scope.processorShell is attached by the processorDetail directive.
app.directive('processorUiRename', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      $scope.processor = $scope.processorShell.processor;
      const pipeline = $scope.processorShell.pipeline;

      $scope.$watch('processor.field', () => { pipeline.setDirty(); });
      $scope.$watch('processor.targetField', () => { pipeline.setDirty(); });
      $scope.$watch('processor.ignoreMissing', () => { pipeline.setDirty(); });
    }
  };
});
