'use strict';

angular.module('mfApiExampleApp').controller('SandboxCtrl', function($scope, $http, $filter) {

    var baseUrl = 'http://localhost:6500';
    var formatFilter = $filter('format');
//    var tokenRegEx = /(\:\w+)(\/{0,1})/gi;
    var tokenRegEx = /(\:)(\w+)(\/{0,1})/gi;


	$scope.apiMethods = [
		{ name: 'Authorize user', type: 'GET', url: '/api/:version/auth',
            params: {'id':'', 'courses':'', 'email':'', 'username':''} },
		{ name: 'Add users', type: 'POST', url: '/api/:version/user',
            data: {'users': [{'firstName':'',lastName:'', 'email':''}], 'requiredCourseIds': [], 'courseIds': [], 'seriesIds': [], 'groupIds': [], 'clientDatestamp': ''} },
		{ name: 'Archive user', type: 'POST', url: '/api/:version/user/:userId/archive' },
		{ name: 'Invite a trainee to a course', type: 'POST', url: '/api/:version/user/:userId/course/:courseId/invite' },
		{ name: 'Invite trainees to a course', type: 'POST', url: '/api/:version/course/:courseId/invite' },
		{ name: 'courseTraineesAndStatuses', type: 'GET', url: '/api/:version/course/:courseId/user' },
		{ name: 'getCourses', type: 'GET', url: '/api/:version/course' },
		{ name: 'inviteTraineeToSeries', type: 'POST', url: '/api/:version/user/:userId/series/:seriesId/invite' },
		{ name: 'inviteTraineesToSeries', type: 'POST', url: '/api/:version/series/:seriesId/invite' },
		{ name: 'courseTraineesAndStatuses', type: 'GET', url: '/api/:version/series/:seriesId/user' }
	];

	$scope.currentMethod = null;
    $scope.repeater = {};

	$scope.viewModel = {
        keySaved: false
	};

    $scope.resultInfo = {};

    $scope.apiModel = {
        apiKey: '',
        version: 'v2'
    };

    function initialize() {
        _.each($scope.apiMethods, function(item) {
            item.usageUrl = item.url;
            item.url = item.url.replace(':version', $scope.apiModel.version);
            item.tokens = getMatches(item.url, tokenRegEx, 2)
        });

        // for testing only uncomment out this section and add your api key -- don't commit
        $scope.apiModel.apiKey = '32bbb158dbd24c3f853aed577b415dc0';
        $scope.enterApiInfo();
        $scope.selectMethod($scope.apiMethods[6]);
    }

    $scope.enterApiInfo = function(type) {
        if(type == 'edit') {
            $scope.viewModel.keySaved = false;
            return;
        }
        if(!$scope.apiModel.apiKey) return;

        $scope.viewModel.keySaved = true;
        $http.defaults.headers.common['x-mindflash-Apikey'] = $scope.apiModel.apiKey;
    };

	$scope.selectMethod = function(method) {
		$scope.resultInfo = {};
		$scope.currentMethod = method;

        $scope.currentConfig = {
            tokens: angular.copy($scope.currentMethod.tokens),
            params: angular.copy($scope.currentMethod.params),
            data: angular.copy($scope.currentMethod.data) || {}
        };

        // use repeater so that there is no double binding in key,value
        $scope.repeater = {
            tokens: angular.copy($scope.currentMethod.tokens),
            params: angular.copy($scope.currentMethod.params),
            data: angular.copy($scope.currentMethod.data) || {}
        };
	};

	$scope.sendCall = function() {
        var formattedUrl = formatFilter($scope.currentMethod.url, $scope.currentConfig.tokens);
//        $http({method: $scope.currentMethod.type, url: (baseUrl + formattedUrl), data:$scope.currentMethod.editable.data}).
        $http({method: $scope.currentMethod.type, url: (baseUrl + formattedUrl), params:$scope.currentConfig.params}).
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
            active: $scope.currentMethod == api
        };
    };

    $scope.$on('$destroy', function() {
        // clean up
	});

    function getMatches(string, regex, index) {
        index || (index = 1); // default to the first capturing group
        var matches = {};
        var match;
        while (match = regex.exec(string)) {
            matches[match[index]] = '';
        }
        return matches;
    }

    initialize();
});
