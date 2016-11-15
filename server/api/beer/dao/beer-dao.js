/*"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const beerSchema = require('../model/beer-model');
const _ = require('lodash');

beerSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Beer
          .find(_query)
          .exec((err, beers) => {
              err ? reject(err)
                  : resolve(beers);
          });
      });
}

beerSchema.statics.createBeer = (beer) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(beer))
          return reject(new TypeError('Beer is not a valid object.'));

      let _beer = new Beer(beer);

      _beer.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

beerSchema.statics.deleteBeer = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Beer
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Beer  = mongoose.model('Beer', beerSchema);

module.exports = Beer;
