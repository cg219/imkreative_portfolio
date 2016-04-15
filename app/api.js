var router = require("express").Router(),
	http = require("http"),
	https = require("https"),
	Redis = require("ioredis"),
	redis = new Redis();

router.get("/entries", function(req, res){
	redis
		.get("entries")
		.then(function(result){
			if(result){
				console.log("From Redis");
				res.send(JSON.parse(result));
				return;
			}

			console.log("Call to Contentful");

			https.get("https://cdn.contentful.com/spaces/" + process.env.CONTENTFUL_SPACE_ID + "/entries?access_token=" + process.env.CONTENTFUL_API_TOKEN + "&include=1&content_type=site&order=-fields.date", function(response){
				var body = "";

				response.on("data", function(data){
					body += data;
				})

				response.on("end", function(){
					redis.set("entries", body, "ex", (60 * 60));
					res.send(JSON.parse(body))
					return;
				})
			})
			
		})
})

router.get("/cats", function(req, res){
	redis
		.get("cats")
		.then(function(result){
			if(result){
				console.log("From Redis");
				res.send(JSON.parse(result));
				return;
			}

			console.log("Call to Contentful");

			https.get("https://cdn.contentful.com/spaces/" + process.env.CONTENTFUL_SPACE_ID + "/entries?access_token=" + process.env.CONTENTFUL_API_TOKEN + "&include=1&content_type=categories", function(response){
				var body = "";

				response.on("data", function(data){
					body += data;
				})

				response.on("end", function(){
					redis.set("cats", body, "ex", (60 * 60));
					res.send(JSON.parse(body))
					return;
				})
			})
			
		})
})

module.exports = router;