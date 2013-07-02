'use strict';

angular.module('mfApiExampleApp', ['ui.bootstrap']).config(function($routeProvider) {
	$routeProvider
		.when('/sandbox', {templateUrl: 'sandbox/sandbox.tpl.html',controller: 'SandboxCtrl'})
		.otherwise({redirectTo: '/sandbox'});
});
