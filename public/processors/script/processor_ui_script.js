import _ from 'lodash';
import uiModules from 'ui/modules';
import template from './processor_ui_script.html';
import './processor_ui_script.less';
import './script_parameters';

const app = uiModules.get('pipelines');

//scope.processorShell is attached by the processorDetail directive.
app.directive('processorUiScript', function () {
  return {
    restrict: 'E',
    template: template,
    controller : function ($scope) {
      $scope.processor = $scope.processorShell.processor;
      const pipeline = $scope.processorShell.pipeline;

      $scope.advancedSection = {
        collapsed: true
      };

      $scope.scriptTypes = $scope.processor.scriptTypes;

      $scope.aceLoaded = (editor) => {
        this.editor = editor;
        editor.$blockScrolling = Infinity;
      };

      $scope.$watch('processor.language', () => { pipeline.setDirty(); });
      $scope.$watch('processor.filename', () => { pipeline.setDirty(); });
      $scope.$watch('processor.scriptId', () => { pipeline.setDirty(); });
      $scope.$watch('processor.inlineScript', () => { pipeline.setDirty(); });
      $scope.$watchCollection('processor.params', () => { pipeline.setDirty(); }, true);
    }
  };
});
