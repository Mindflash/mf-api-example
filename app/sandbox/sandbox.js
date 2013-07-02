'use strict';

angular.module('mfApiExampleApp').controller('SandboxCtrl', function($scope, $http) {

    var apiVersion = 'v2';
    var baseUrl = 'http://10.0.1.2:6500';

	$scope.apiList = [
		{ name: 'authorizeUser', type: 'GET', url: '/api/:version/auth/loginUser', params: {}},
		{ name: 'addUsers', type: 'POST', url: '/api/:version/user', params: {} },
		{ name: 'archiveUser', type: 'POST', url: '/api/:version/user/:userId/archive', params: {} },
		{ name: 'inviteTraineeToCourse', type: 'POST', url: '/api/:version/user/:userId/course/:courseId/invite', params: {} },
		{ name: 'inviteTraineesToCourse', type: 'POST', url: '/api/:version/course/:courseId/invite', params: {} },
		{ name: 'courseTraineesAndStatuses', type: 'GET', url: '/api/:version/course/:courseId/user', params: {} },
		{ name: 'getCourses', type: 'GET', url: '/api/:version/course', params: [] },
		{ name: 'inviteTraineeToSeries', type: 'POST', url: '/api/:version/user/:userId/series/:seriesId/invite', params: {} },
		{ name: 'inviteTraineesToSeries', type: 'POST', url: '/api/:version/series/:seriesId/invite', params: {} },
		{ name: 'courseTraineesAndStatuses', type: 'GET', url: '/api/:version/series/:seriesId/user', params: {} }
	];

	$scope.currentDetail = $scope.apiList[0];

	$scope.viewModel = {
		showError: false,
        keySaved: false
	};

    $scope.resultInfo = {};
	$scope.errorInfo = {};
    $scope.apiKey = '';

    function initialize() {

        // for testing
        $scope.currentDetail = $scope.apiList[6];
        $scope.apiKey = '32bbb158dbd24c3f853aed577b415dc0';
        $http.defaults.headers.common['x-mindflash-apikey'] = $scope.apiKey;
        $scope.viewModel.keySaved = true;
    }

    $scope.saveAPIKey = function() {
        if(!$scope.apiKey)
            return;
        $scope.viewModel.keySaved = true;
        $http.defaults.headers.common['x-mindflash-apikey'] = $scope.apiKey;
    };

    $scope.editAPIKey = function() {
        $scope.viewModel.keySaved = false;
    };

	$scope.changeDetail = function(api) {

		$scope.errorInfo = {};
		$scope.currentDetail = api;
	};

	$scope.sendCall = function() {
        var url = baseUrl + $scope.currentDetail.url;
		$http({method: 'GET', url: url.replace(':version', apiVersion)}).
			success(function(data, status, headers, config) {
                $scope.resultInfo.data = data;
                $scope.resultInfo.status = status;
			}).
			error(function(data, status, headers, config) {
				$scope.errorInfo.data = data;
				$scope.errorInfo.status = status;
			});

		//curl -G -H "Content-Type: application/json" -H "x-mindflash-apikey: 32bbb158dbd24c3f853aed577b415dc0" "http://iverson.mftdev.com/api/v1/course"
		//curl -G -H "Content-Type: application/json" -H "x-mindflash-apikey: 32bbb158dbd24c3f853aed577b415dc0" "http://10.0.1.2:6500/api/v1/course"
	};

    $scope.navClass = function(api) {
        return {
            last: this.$last,
            active: $scope.currentDetail == api
        };
    };

    var errorInfoListener = $scope.$watch('errorInfo', function() {
		$scope.viewModel.showError = !_.isEmpty($scope.errorInfo);
	}, true);

	$scope.$on('$destroy', function() {
		errorInfoListener();
	});

    initialize();
});


//app.post('/api/:version/enable', notTrainee('apiUpdateApiAvailability'));
