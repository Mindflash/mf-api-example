'use strict';

angular.module('mfApiExampleApp', ['ui.bootstrap', 'ui.utils']).config(function($routeProvider, $httpProvider) {
	$httpProvider.defaults.headers['delete'] = {'Content-Type': 'application/json'};
	$httpProvider.defaults.headers['post'] = {'Content-Type': 'application/json'};

	$routeProvider
		.when('/sandbox', {templateUrl: 'sandbox/sandbox.tpl.html',controller: 'SandboxCtrl'})
		.otherwise({redirectTo: '/sandbox'});
});
