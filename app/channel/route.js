//channel路由功能模块
(function(angular){
	var app = angular.module('channel.route',['ngRoute','channel.controller']);
	app.config(function($routeProvider){
		$routeProvider.when('/:typeChannel',{
			templateUrl : './channel/view.html',
			controller : 'channelController'
		}).otherwise({
			redirectTo :'/all'
		});

	});
})(angular);