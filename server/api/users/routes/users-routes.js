"use strict";

const UsersController = require('../controller/users-controller');

module.exports = class UsersRoutes {
    static init(router) {
      router
        .route('/api/users/auth/logout')
        .post(UsersController.logout);

      router
        .route('/api/users/auth/login')
        .post(UsersController.login);

      router
        .route('/api/users/accounts')
        .post(UsersController.register)
        .put(UsersController.changePass);
    }
}
