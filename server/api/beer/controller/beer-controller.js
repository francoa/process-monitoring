"use strict";

const BeerDAO = require('../dao/beer-dao');

module.exports = class BeerController {
  static getAll(req, res) {
      BeerDAO
        .getAll()
        .then(beers => res.status(200).json(beers))
        .catch(error => res.status(400).json(error));
  }

  static createBeer(req, res) {
      let _beer = req.body;

      BeerDAO
        .createBeer(_beer)
        .then(beer => res.status(201).json(beer))
        .catch(error => res.status(400).json(error));
  }

  static deleteBeer(req, res) {
    let _id = req.params.id;

    BeerDAO
      .deleteBeer(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
