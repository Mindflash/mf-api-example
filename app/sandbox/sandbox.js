'use strict';

angular.module('mfApiExampleApp').controller('SandboxCtrl', function($scope, $http) {

	$scope.apiList = [
		{ name: 'authorizeUser', type: 'GET', url: '/api/:version/auth/loginUser', params: {}},
		{ name: 'addUsers', type: 'POST', url: '/api/:version/user', params: {} },
		{ name: 'archiveUser', type: 'POST', url: '/api/:version/user/:userId/archive', params: {} },
		{ name: 'inviteTraineeToCourse', type: 'POST', url: '/api/:version/user/:userId/course/:courseId/invite', params: {} },
		{ name: 'inviteTraineesToCourse', type: 'POST', url: '/api/:version/course/:courseId/invite', params: {} },
		{ name: 'courseTraineesAndStatuses', type: 'GET', url: '/api/:version/course/:courseId/user', params: {} },
		{ name: 'getCourses', type: 'GET', url: '/api/:version/course', params: {} },
		{ name: 'inviteTraineeToSeries', type: 'POST', url: '/api/:version/user/:userId/series/:seriesId/invite', params: {} },
		{ name: 'inviteTraineesToSeries', type: 'POST', url: '/api/:version/series/:seriesId/invite', params: {} },
		{ name: 'courseTraineesAndStatuses', type: 'GET', url: '/api/:version/series/:seriesId/user', params: {} }
	];

	$scope.currentDetail = $scope.apiList[6];

	$scope.viewModel = {
		showError: false
	};

	$scope.errorInfo = {};

	$scope.changeDetail = function(api) {
		$scope.errorInfo = {};
		$scope.currentDetail = api;
	};

	$scope.afterPartialLoaded = function() {
		console.log('partial loaded');
	};

	$scope.sendCall = function() {
		$http.defaults.headers.common['x-mindflash-apikey'] = '32bbb158dbd24c3f853aed577b415dc0';

		$http({method: 'GET', url: 'http://10.0.1.2:6500/api/v1/course'}).
			success(function(data, status, headers, config) {
				console.log(data);
			}).
			error(function(data, status, headers, config) {
				$scope.errorInfo.status = status;
				$scope.errorInfo.data = data;
			});

		//curl -G -H "Content-Type: application/json" -H "x-mindflash-apikey: 32bbb158dbd24c3f853aed577b415dc0" "http://iverson.mftdev.com/api/v1/course"
		//curl -G -H "Content-Type: application/json" -H "x-mindflash-apikey: 32bbb158dbd24c3f853aed577b415dc0" "http://10.0.1.2:6500/api/v1/course"
	};

	var errorInfoListener = $scope.$watch('errorInfo', function() {
		$scope.viewModel.showError = !_.isEmpty($scope.errorInfo);
	}, true);

	$scope.$on('$destroy', function() {
		errorInfoListener();
	});
});


//app.post('/api/:version/enable', notTrainee('apiUpdateApiAvailability'));
