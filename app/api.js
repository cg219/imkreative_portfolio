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

			https.get("https://preview.contentful.com/spaces/" + process.env.CONTENTFUL_SPACE_ID + "/entries?access_token=" + process.env.CONTENTFUL_API_TOKEN, function(response){
				var body = "";

				response.on("data", function(data){
					body += data;
				})

				response.on("end", function(){
					redis.set("entries", body);
					res.send(JSON.parse(body))
					return;
				})
			})
			
		})
})

module.exports = router;