'use strict';

angular.module('mfApiExampleApp', []).config(function($routeProvider) {
	$routeProvider
		.when('/sandbox', {templateUrl: 'sandbox/sandbox.tpl.html',controller: 'SandboxCtrl'})
		.otherwise({redirectTo: '/sandbox'});
});
