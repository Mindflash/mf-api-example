'use strict';

angular.module('mfApiExampleApp').controller('SandboxCtrl', function($scope, $http, $filter) {

    var apiVersion = 'v2';
    var baseUrl = 'http://10.0.1.2:6500';
    var formatFilter = $filter('format');

	$scope.apiList = [
		{ name: 'authorizeUser', type: 'GET', url: '/api/:version/auth/loginUser',
            tokens: {'version': ''} },
		{ name: 'addUsers', type: 'POST', url: '/api/:version/user',
            tokens: {'version': ''} },
		{ name: 'archiveUser', type: 'POST', url: '/api/:version/user/:userId/archive',
            tokens: {'version': '','userId':''} },
		{ name: 'inviteTraineeToCourse', type: 'POST', url: '/api/:version/user/:userId/course/:courseId/invite',
            tokens: {'version':'','userId':'','courseId':''} },
		{ name: 'inviteTraineesToCourse', type: 'POST', url: '/api/:version/course/:courseId/invite',
            tokens: {'version': '','courseId':''} },
		{ name: 'courseTraineesAndStatuses', type: 'GET', url: '/api/:version/course/:courseId/user',
            tokens: {'version': '','courseId':''} },
		{ name: 'getCourses', type: 'GET', url: '/api/:version/course',
            tokens: {'version': ''} },
		{ name: 'inviteTraineeToSeries', type: 'POST', url: '/api/:version/user/:userId/series/:seriesId/invite',
            tokens: {'version': '','userId':'','seriesId':''} },
		{ name: 'inviteTraineesToSeries', type: 'POST', url: '/api/:version/series/:seriesId/invite',
            tokens: {'version': '','seriesId':''} },
		{ name: 'courseTraineesAndStatuses', type: 'GET', url: '/api/:version/series/:seriesId/user',
            tokens: {'version': '','seriesId':''} }
	];

	$scope.currentDetail = null;

	$scope.viewModel = {
		showError: false,
        keySaved: false
	};

    $scope.resultInfo = {};
    $scope.apiKey = '';

    function initialize() {
//        $scope.currentDetail = $scope.apiList[0];
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
		$scope.resultInfo = {};
		$scope.currentDetail = api;
        $scope.currentRepeater = angular.copy($scope.currentDetail.tokens);
	};

	$scope.sendCall = function() {
        var formattedUrl = formatFilter($scope.currentDetail.url, $scope.currentDetail.tokens);
		$http({method: 'GET', url: (baseUrl + formattedUrl)}).
			success(function(data, status, headers, config) {
                $scope.resultInfo.data = data;
                $scope.resultInfo.status = status;
			}).
			error(function(data, status, headers, config) {
                $scope.resultInfo.data = data;
                $scope.resultInfo.status = status;
			});
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
