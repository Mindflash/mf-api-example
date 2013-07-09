'use strict';

angular.module('mfApiExampleApp').controller('SandboxCtrl', function($scope, $http, $filter) {

    var baseUrl = 'http://localhost:6500';
    var formatFilter = $filter('format');
//    var tokenRegEx = /(\:\w+)(\/{0,1})/gi;
    var tokenRegEx = /(\:)(\w+)(\/{0,1})/gi;


	$scope.apiList = [
		{ name: 'Authorize user', type: 'GET', url: '/api/:version/auth/loginUser' },
		{ name: 'Add users', type: 'POST', url: '/api/:version/user',
            query: {'users': [{'firstName':'',lastName:'', 'email':''}], 'requiredCourseIds': [], 'courseIds': [], 'seriesIds': [], 'groupIds': [], 'clientDatestamp': ''} },
		{ name: 'Archive user', type: 'POST', url: '/api/:version/user/:userId/archive' },
		{ name: 'Invite a trainee to a course', type: 'POST', url: '/api/:version/user/:userId/course/:courseId/invite' },
		{ name: 'Invite trainees to a course', type: 'POST', url: '/api/:version/course/:courseId/invite' },
		{ name: 'courseTraineesAndStatuses', type: 'GET', url: '/api/:version/course/:courseId/user' },
		{ name: 'getCourses', type: 'GET', url: '/api/:version/course' },
		{ name: 'inviteTraineeToSeries', type: 'POST', url: '/api/:version/user/:userId/series/:seriesId/invite' },
		{ name: 'inviteTraineesToSeries', type: 'POST', url: '/api/:version/series/:seriesId/invite' },
		{ name: 'courseTraineesAndStatuses', type: 'GET', url: '/api/:version/series/:seriesId/user' }
	];


//    firstName: joi.types.String().max(35).required(),
//        lastName: joi.types.String().max(35).required(),
//        email: joi.types.String().nullOk().emptyOk().email().max(254).optional(),

//    req.assert('users').arrayNotEmpty();
//    req.assert('requiredCourseIds').isIntOrEmptyArray();
//    req.assert('courseIds').isIntOrEmptyArray();
//    req.assert('seriesIds').isIntOrEmptyArray();
//    req.assert('groupIds').isIntOrEmptyArray();
//    req.assert('clientDatestamp').notEmpty().regex(/\d{4}\-\d{1,2}\-\d{1,2}/g); // 2013-6-24 or 2013-12-24


	$scope.currentApi = null;

	$scope.viewModel = {
        keySaved: false
	};

    $scope.resultInfo = {};

    $scope.apiModel = {
        apiKey: '',
        version: 'v2'
    };

    function initialize() {
        _.each($scope.apiList, function(item) {
            item.usageUrl = item.url;
            item.url = item.url.replace(':version', $scope.apiModel.version);
            item.tokens = getMatches(item.url, tokenRegEx, 2);
        });

        // for testing only uncomment out this section and add your api key -- don't commit
//        $scope.currentApi = $scope.apiList[7];
//        $scope.currentRepeater = angular.copy($scope.currentApi.tokens);

//        $scope.apiModel.apiKey = '';
//        $http.defaults.headers.common['x-mindflash-apikey'] = $scope.apiModel.apiKey;
//        $scope.viewModel.keySaved = true;
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

	$scope.selectApi = function(api) {
		$scope.resultInfo = {};
		$scope.currentApi = api;
        $scope.currentRepeater = angular.copy($scope.currentApi.tokens);
	};

	$scope.sendCall = function() {
        console.log(angular.element('#dataMessage'));
        var formattedUrl = formatFilter($scope.currentApi.url, $scope.currentApi.tokens);
		$http({method: $scope.currentApi.type, url: (baseUrl + formattedUrl), data:$scope.currentApi.query}).
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

	});

    $scope.changeData = function($event) {
        console.log($event);
    };


//    function getMatches(string, regex, index) {
//        index || (index = 1); // default to the first capturing group
//        var matches = [];
//        var match;
//        while (match = regex.exec(string)) {
//            console.log(match);
//            matches.push(match[index]);
//        }
//        return matches;
//    }

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
