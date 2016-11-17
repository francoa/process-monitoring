"use strict";

const UsersDAO = require('../dao/users-dao');
const secur = require('../../auth/auth.js');

module.exports = class UsersController {
  static logout(req, res) {
    UsersDAO
      .logout(req)
      .then(function(){
        secur.clearCookieData(res);
        res.sendStatus(200);
      })
      .catch(err => res.status(err.code).send(err.msg));
  }

  static login(req,res) {
    UsersDAO
      .login(req)
      .then(function(username,admin){
        secur.setCookieData(req,res,username);
        if (admin)
          res.status(200).send({'username': username, 'admin': true});
        else
          res.status(200).send({'username': username, 'admin': false});
      })
      .catch(err => res.status(err.code).send(err.msg));
  }

  static register(req, res) {
    UsersDAO
      .register()
      .then()
      .catch();
  }

  static changePass(req, res) {
    UsersDAO
      .changePass()
      .then()
      .catch();
  }  

  /*static createBeer(req, res) {
      let _beer = req.body;

      BeerDAO
        .createBeer(_beer)
        .then(beer => res.status(201).json(beer))
        .catch(error => res.status(400).json(error));
  }*/

}
