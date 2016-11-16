"use strict";

const UsersDAO = require('../dao/users-dao');

module.exports = class UsersController {
  static logout(req, res) {
    UsersDAO
      .logout()
      .then()
      .catch();
  }

  static login(req, res) {
    UsersDAO
      .login()
      .then()
      .catch();
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
