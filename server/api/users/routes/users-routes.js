"use strict";

const secur = require('../../auth/auth.js');
const UsersController = require('../controller/users-controller');

module.exports = class UsersRoutes {
    static init(router) {
      router
        .route('/api/users/auth/logout')
        .post(secur.extractCookieData,UsersController.logout);

      router
        .route('/api/users/auth/login')
        .post(secur.extractCookieData,UsersController.login);

      router
        .route('/api/users/accounts')
        .post(secur.extractCookieData,UsersController.register)
        .put(secur.extractCookieData,UsersController.changePass);
    }
}
