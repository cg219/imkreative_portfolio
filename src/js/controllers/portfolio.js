function Portfolio(scope, state, location, params, http){
	console.log("Portfolio");
	var self = this;

	this.entries = "";
	this.assets;

	http.get("/api/entries")
		.then(function(results){
			self.entries = scope.entries = results.data.items;
			self.assets = scope.assets = results.data.includes.Asset;
			console.log(self.entries[0]);
		})

	scope.getAsset = this.GetAsset;
	scope.gotoLink = this.GotoLink;
	scope.console = console;
}

Portfolio.prototype.GetAsset = function(id) {
	var asset;
	var self = this;

	for (asset in self.assets){
		if(self.assets[asset].sys.id == id){
			return self.assets[asset].fields.file.url;
		}
	}
};

Portfolio.prototype.GotoLink = function(link) {
	console.log(link);
};

kreative.controller("Portfolio", ["$scope", "$state", "$location", "$stateParams", "$http", function(scope, state, loc, params, http){
	new Portfolio(scope, state, loc, params, http);
}])