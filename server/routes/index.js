"use strict";

//const BeerRoutes = require('../api/beer/routes/beer-routes');

const StaticDispatcher = require('../commons/static/index');


module.exports = class Routes {
	static init(app, router) {
		//BeerRoutes.init(router);
 
		router
			.route('*')
			.get(StaticDispatcher.sendIndex);
 
		app.use('/', router);

		app.post('/login',function(req,res){
			console.log(req.body);
			res.status(200).send({admin: false, username: req.body.username});
		})
	}
}
