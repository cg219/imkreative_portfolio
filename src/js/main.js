var kreative = angular.module("imkreative", ["ngSanitize", "ngResource", "ui.router"]);

kreative.config(["$locationProvider", "$stateProvider", "$urlRouterProvider", function(loc, state, url){
	loc.html5Mode(true);

	state
		.state("home", {
			url: "/",
			controller: "Portfolio",
			params: {},
			templateUrl: "portfolio.html"
		})
}])