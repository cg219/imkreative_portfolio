function Portfolio(scope, state, location, params){
	console.log("Portfolio");
}

kreative.controller("Portfolio", ["$scope", "$state", "$location", "$stateParams", function(scope, state, loc, params){
	new Portfolio(scope, state, loc, params);
}])