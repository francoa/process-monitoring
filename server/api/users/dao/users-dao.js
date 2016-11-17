"use strict";

const DBConfig = require('../../../config/db.conf');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = class UsersDAO {

  static logout(req){
    return new Promise((resolve, reject) => {
      if (req.username)
        return resolve()
      return reject({'code':400,'msg':'Cookies error'}); //400??
    });
  };

  static login(req){
    return new Promise((resolve,reject) => {
      var loginData = req.body;
      if (!loginData.hasOwnProperty('password') || loginData['password'] === '')
        return reject({'code':400,'msg':'Missing password'});
      if (!loginData.hasOwnProperty('username') || loginData['username'] === '') 
        return reject({'code':400,'msg':'Missing username'});

      DBConfig.verifyUsernamePassword(loginData.username,loginData.password,
        function(admin){return resolve(loginData.username,admin)},function(err){return reject(err)});

    });
  };

  static register(){};

  static changePass(){};

  /*beerSchema.statics.createBeer = (beer) => {
      return new Promise((resolve, reject) => {
        if (!_.isObject(beer))
            return reject(new TypeError('Beer is not a valid object.'));

        let _beer = new Beer(beer);

        _beer.save((err, saved) => {
          err ? reject(err)
              : resolve(saved);
        });
      });
  }*/

}
