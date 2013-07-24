'use strict';

angular.module('mfApiExampleApp').controller('SandboxCtrl', function ($scope, $http, $filter) {

	var baseUrl = 'http://api.mftqa.com';
	var formatFilter = $filter('format');
	var tokenRegEx = /(\:)(\w+)(\/{0,1})/gi;

	var today = $filter('date')(new Date(), 'yyyy-MM-dd');

	$scope.apiMethods = [
		// Users
		{ name: 'Authorize User', type: 'GET', url: '/api/:version/auth',
			qs: [ 'id', 'username', 'email', 'courses' ],
			doc: 'docs/auth-api.html', header: "users" },
		{ name: 'Get User Info', type: 'GET', url: '/api/:version/user/:userId',
			qs: [ '_type', '_status' ],
			doc: 'docs/get-user-api.html', header: "users" },
		{ name: 'Add Users', type: 'POST', url: '/api/:version/user',
			data: {'users': [
				{'firstName': '', lastName: '', 'email': ''}
			], 'requiredCourseIds': [], 'courseIds': [], 'seriesIds': [], 'groupIds': [], 'clientDatestamp': today, 'batchId': '1'},
			doc: 'docs/add-user-api.html', header: "users"},
		{ name: 'Edit User', type: 'POST', url: '/api/:version/user/:userId',
			data: {'firstName': '', lastName: '', 'email': ''},
			doc: 'docs/edit-user-api.html', header: "users"},
		{ name: 'Archive User', type: 'POST', url: '/api/:version/user/:userId/archive',
			doc: 'docs/archive-user-api.html', header: "users"},
		{ name: 'Archive Users', type: 'POST', url: '/api/:version/user/archive',
			data: {'userIds': []},
			doc: 'docs/archive-users-api.html', header: "users"},
		// Groups
		{ name: 'Get User Groups', type: 'GET', url: '/api/:version/group/:groupId',
			doc: 'docs/get-group-api.html', header: "groups"},
		{ name: 'Add User to Group', type: 'POST', url: '/api/:version/group/:groupId/user/:userId',
			doc: 'docs/add-user-group-api.html', header: "groups"},
		{ name: 'Add Users to Group', type: 'POST', url: '/api/:version/group/:groupId/user',
			data: {'userIds': []},
			doc: 'docs/add-users-group-api.html', header: "groups"},
		{ name: 'Remove User from Group', type: 'DELETE', url: '/api/:version/group/:groupId/user/:userId',
			doc: 'docs/remove-user-group-api.html', header: "groups"},
		{ name: 'Remove Users from Group', type: 'DELETE', url: '/api/:version/group/:groupId/user',
			data: {'userIds': []},
			doc: 'docs/remove-users-group-api.html', header: "groups"},
		// Courses
		{ name: 'Get Course Info', type: 'GET', url: '/api/:version/course/:courseId',
			qs: [ 'type' ],
			doc: 'docs/get-course-api.html', header: "courses" },
		{ name: 'Get Course Enrollment Info for User', type: 'GET', url: '/api/:version/course/:courseId/user/:userId',
			doc: 'docs/get-course-user-status-api.html', header: "courses" },
		{ name: 'Get All Users in a Course', type: 'GET', url: '/api/:version/course/:courseId/user',
			qs: [ 'status' ],
			doc: 'docs/get-course-users-status-api.html', header: "courses" },
		{ name: 'Invite User to Course', type: 'POST', url: '/api/:version/course/:courseId/user/:userId/invite',
			data: {'clientDatestamp': today, 'required': false},
			doc: 'docs/invite-user-course-api.html', header: "courses" },
		{ name: 'Invite Users to Course', type: 'POST', url: '/api/:version/course/:courseId/invite',
			data: {'userIds': [], 'clientDatestamp': today, 'required': false},
			doc: 'docs/invite-users-course-api.html', header: "courses" },
		// Series
		{ name: 'Get Series Info', type: 'GET', url: '/api/:version/series/:seriesId',
			doc: 'docs/get-series-api.html', header: "series" },
		{ name: 'Get Courses in a Series', type: 'GET', url: '/api/:version/series/:seriesId/course/:courseId',
			doc: 'docs/get-series-courses-api.html', header: "series" },
		{ name: 'Get Series Enrollment Info for User', type: 'GET', url: '/api/:version/series/:seriesId/user/:userId',
			doc: 'docs/get-series-user-status-api.html', header: "series" },
		{ name: 'Get All Users in a Series', type: 'GET', url: '/api/:version/series/:seriesId/user',
			qs: [ 'status' ],
			doc: 'docs/get-series-users-status-api.html', header: "series" },
		{ name: 'Invite User to Series', type: 'POST', url: '/api/:version/series/:seriesId/user/:userId/invite',
			data: {'clientDatestamp': today, 'required': false},
			doc: 'docs/invite-user-series-api.html', header: "series" },
		{ name: 'Invite Users to Series', type: 'POST', url: '/api/:version/series/:seriesId/invite',
			data: {'userIds': [], 'clientDatestamp': today, 'required': false},
			doc: 'docs/invite-users-series-api.html', header: "series" }
	];

	$scope.methodGroups = _.groupBy($scope.apiMethods, function (method) {
		return method.header;
	});

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

	$scope.queryString = "";

	function initialize() {
		_.each($scope.apiMethods, function (item) {
			item.usageUrl = item.url;
			item.url = item.url.replace(':version', $scope.apiModel.version);
			item.tokenNames = getMatches(item.url, tokenRegEx, 2)
		});

		// for testing only uncomment out this section and add your api key -- don't commit
		$scope.apiModel.apiKey = '';
		$scope.enterApiInfo();
		$scope.selectMethod($scope.apiMethods[1]);
	}

	$scope.enterApiInfo = function (type) {
		if (type == 'edit') {
			$scope.viewModel.keySaved = false;
			return;
		}
		if (!$scope.apiModel.apiKey) return;

		$scope.viewModel.keySaved = true;
		$http.defaults.headers.common['x-mindflash-Apikey'] = $scope.apiModel.apiKey;
	};

	$scope.updateQuery = function () {
		var p = getParams();
		if (p) {
			var parts = [];
			_.each(p, function (v, k) {
				parts.push(k + "=" + encodeURIComponent(v));
			});
			$scope.queryString = "?" + parts.join("&");
		} else {
			$scope.queryString = "";
		}
	}

	$scope.selectMethod = function (method) {
		$scope.resultInfo = {};
		$scope.currentMethod = method;

		var queryParams = {};
		_.each($scope.currentMethod.qs, function (p) {
			queryParams[p] = "";
		});

		var tokens = {};
		_.each($scope.currentMethod.tokenNames, function (p) {
			tokens[p] = "";
		});

		$scope.currentConfig = {
			tokens: tokens,
			params: queryParams,
			data: angular.toJson(angular.copy($scope.currentMethod.data), true) || {}
		};

		// use repeater so that there is no double binding in key,value
		$scope.repeater = {
			tokenNames: angular.copy($scope.currentMethod.tokenNames),
			qs: angular.copy($scope.currentMethod.qs),
			data: angular.copy($scope.currentMethod.data) || {}
		};
	};

	$scope.sendCall = function () {
		var formattedUrl = formatFilter($scope.currentMethod.url, $scope.currentConfig.tokens);
		var d = getData();
		var p = getParams();
		var httpConfig = {
			method: $scope.currentMethod.type,
			url: baseUrl + formattedUrl
		};

		if (d) httpConfig.data = d;
		if (p) httpConfig.params = p;

		$http(httpConfig).
			success(function (data, status, headers, config) {
				$scope.resultInfo.data = data;
				$scope.resultInfo.status = status;
			}).
			error(function (data, status, headers, config) {
				$scope.resultInfo.data = data;
				$scope.resultInfo.status = status;
			});
	};

	$scope.navClass = function (api) {
		return {
			last: this.$last,
			active: $scope.currentMethod == api
		};
	};

	function getMatches(string, regex, index) {
		index || (index = 1); // default to the first capturing group
		var matches = [];
		var match;
		while (match = regex.exec(string)) {
			matches.push(match[index]);
		}
		return matches;
	}

	function getData() {
		// TODO: fix post data
		var d = angular.fromJson($scope.currentConfig.data);
		return d;
	}

	function getParams() {
		var p = angular.copy($scope.currentConfig.params);
		_.each(p, function (v, k) {
			if (!v) delete p[k];
		});

		if (_.isEmpty(p))
			return null;

		return p;
	}

	$scope.$on('$destroy', function () {
		// clean up
	});

	initialize();
});
