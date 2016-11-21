"use strict";

const UsersRoutes = require('../api/users/routes/users-routes');

const StaticDispatcher = require('../commons/static/index');


module.exports = class Routes {
	static init(app, router) {
		UsersRoutes.init(router);
 
		router
			.route('*')
			.get(StaticDispatcher.sendIndex);
 
		app.use('/', router);
	}
}
