'use strict';

angular.module('mfApiExampleApp').controller('SandboxCtrl', function($scope) {

	$scope.apiList = [
		{ name: 'authorizeUser', type: 'GET', url: '/api/:version/auth/loginUser', params: {}},
		{ name: 'addUsers', type: 'POST', url: '/api/:version/user', params: {} },
		{ name: 'archiveUser', type: 'POST', url: '/api/:version/user/:userId/archive', params: {} },
		{ name: 'inviteTraineeToCourse', type: 'POST', url: '/api/:version/user/:userId/course/:courseId/invite', params: {} },
		{ name: 'inviteTraineesToCourse', type: 'POST', url: '/api/:version/course/:courseId/invite', params: {} },
		{ name: 'courseTraineesAndStatuses', type: 'GET', url: '/api/:version/course/:courseId/user', params: {} },
		{ name: 'getCourses', type: 'GET', url: '/api/:version/course/', params: {} },
		{ name: 'inviteTraineeToSeries', type: 'POST', url: '/api/:version/user/:userId/series/:seriesId/invite', params: {} },
		{ name: 'inviteTraineesToSeries', type: 'POST', url: '/api/:version/series/:seriesId/invite', params: {} },
		{ name: 'courseTraineesAndStatuses', type: 'GET', url: '/api/:version/series/:seriesId/user', params: {}}
	];

	$scope.currentDetail = $scope.apiList[0];

	$scope.changeDetail = function(api) {
		$scope.currentDetail = api;
	};

	$scope.afterPartialLoaded = function() {
		console.log('here');
		window.prettyPrint && prettyPrint();
//		var currentPageId = $location.path();
//		$scope.partialTitle = $scope.currentPage.shortName;
//		$window._gaq.push(['_trackPageview', currentPageId]);
//		loadDisqus(currentPageId);
	};
});


//app.post('/api/:version/enable', notTrainee('apiUpdateApiAvailability'));
