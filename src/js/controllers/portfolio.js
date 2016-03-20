function Portfolio(scope, state, location, params, http, timeout){
	console.log("Portfolio");
	var self = this;

	this.entries = [];
	this.assets;
	this.categories = [];

	http.get("/api/cats")
		.then(function(results){
			self.categories = scope.categories = results.data.items;
			console.log(self.categories);
		})

	timeout(function(){
		http.get("/api/entries")
			.then(function(results){
				self.entries = scope.entries = results.data.items;
				self.assets = scope.assets = results.data.includes.Asset;
				console.log(self.entries[0]);
			})
	}, 50)
	
	scope.getAsset = this.GetAsset;
	scope.gotoLink = this.GotoLink;
	scope.showCategory = this.ShowCategory;
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
	window.open(link)
};

Portfolio.prototype.ShowCategory = function(cat) {
	console.log(cat);
};

kreative.controller("Portfolio", ["$scope", "$state", "$location", "$stateParams", "$http", "$timeout", function(scope, state, loc, params, http, timeout){
	new Portfolio(scope, state, loc, params, http, timeout);
}])