'use strict';

angular.module('mfApiExampleApp').controller('SandboxCtrl', function($scope, $http, $filter) {

    var baseUrl = 'http://localhost:6500';
    var formatFilter = $filter('format');
//    var tokenRegEx = /(\:\w+)(\/{0,1})/gi;
    var tokenRegEx = /(\:)(\w+)(\/{0,1})/gi;


	$scope.apiTemplates = [
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

	$scope.currentApi = null;
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
        _.each($scope.apiTemplates, function(item) {
            item.usageUrl = item.url;
            item.url = item.url.replace(':version', $scope.apiModel.version);
            item.tokens = getMatches(item.url, tokenRegEx, 2)
        });

        // for testing only uncomment out this section and add your api key -- don't commit
        $scope.apiModel.apiKey = '32bbb158dbd24c3f853aed577b415dc0';
        $scope.enterApiInfo();
        $scope.selectTemplate($scope.apiTemplates[6]);
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

	$scope.selectTemplate = function(api) {
		$scope.resultInfo = {};
		$scope.currentApi = api;

        $scope.currentApi.editable = {
            tokens: angular.copy($scope.currentApi.tokens),
            params: angular.copy($scope.currentApi.params),
            data: angular.copy($scope.currentApi.data) || {}
        };

        $scope.repeater = {
            tokens: angular.copy($scope.currentApi.tokens),
            params: angular.copy($scope.currentApi.params),
            data: angular.copy($scope.currentApi.data)
        };
	};

	$scope.sendCall = function() {
        var formattedUrl = formatFilter($scope.currentApi.url, $scope.currentApi.editable.tokens);
//        $http({method: $scope.currentApi.type, url: (baseUrl + formattedUrl), data:$scope.currentApi.editable.data}).
        $http({method: $scope.currentApi.type, url: (baseUrl + formattedUrl), params:$scope.currentApi.editable.params}).
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
            active: $scope.currentApi == api
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
