"use strict";

const BeerRoutes = require('../api/beer/routes/beer-routes');

const StaticDispatcher = require('../commons/static/index');


module.exports = class Routes {
   static init(app, router) {
     BeerRoutes.init(router);
     
     router
       .route('*')
       .get(StaticDispatcher.sendIndex);
     

     app.use('/', router);
   }
}
