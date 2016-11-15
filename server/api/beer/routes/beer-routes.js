/*"use strict";

const BeerController = require('../controller/beer-controller');

module.exports = class BeerRoutes {
    static init(router) {
      router
        .route('/api/beers')
        .get(BeerController.getAll)
        .post(BeerController.createBeer);

      router
        .route('/api/beers/:id')
        .delete(BeerController.deleteBeer);
    }
}
