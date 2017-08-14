'use strict';

angular.module('mfApiExampleApp').controller('NavController', function ($scope, $location) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
});