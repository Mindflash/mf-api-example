'use strict';

angular.module('mfApiExampleApp', ['ui.bootstrap', 'ui.utils']).config(function($routeProvider, $httpProvider) {
	$httpProvider.defaults.headers['delete'] = {'Content-Type': 'application/json'};
	$httpProvider.defaults.headers['post'] = {'Content-Type': 'application/json'};

	$routeProvider
		.when('/v2', {templateUrl: 'v2/sandbox.tpl.html',controller: 'V2Ctrl'})
		.when('/v3', {templateUrl: 'v3/sandbox.tpl.html',controller: 'V3Ctrl'})
		.otherwise({redirectTo: '/v3'});
});
