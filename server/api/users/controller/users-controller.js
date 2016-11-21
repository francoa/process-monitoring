"use strict";

const UsersDAO = require('../dao/users-dao');
const secur = require('../../auth/auth.js');

module.exports = class UsersController {
  static logout(req, res) {
    UsersDAO
      .logout(req)
      .then(function(){
        try{
          secur.clearCookieData(res);
          res.sendStatus(200);
        }catch(err){
          throw({'code':500,'msg':err});
        }
      })
      .catch(function(err){
        console.log(err.msg);
        res.status(err.code).send(err.msg); 
      });
  }

  static login(req,res) {
    UsersDAO
      .login(req)
      .then(function(user){
        try{
          //secur.setCookieData(req,res,user.username);
          if (user.admin)
            res.status(200).send({'username': user.username, 'admin': true});
          else
            res.status(200).send({'username': user.username, 'admin': false});
        }catch(err){
          throw({'code':500,'msg':err});
        }
      })
      .catch(function(err){
        console.log(err.msg);
        res.status(err.code).send(err.msg);
      });
  }

  static register(req, res) {
    UsersDAO
      .register(req)
      .then(function(){
        res.sendStatus(200);
      })
      .catch(function(err){
        console.log(err.msg);
        res.status(err.code).send(err.msg);
      });
  }

  static changePass(req, res) {
    UsersDAO
      .changePass(req)
      .then(function(){res.sendStatus(200)})
      .catch(function(err){
        console.log(err.msg);
        res.status(err.code).send(err.msg);
      });
  }  

}
