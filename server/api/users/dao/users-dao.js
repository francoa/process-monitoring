"use strict";

const DBConfig = require('../../../config/db.conf');
const _ = require('lodash');

module.exports = class UsersDAO {

  static logout(req){
    return new Promise((resolve, reject) => {
      if (!req.hasOwnProperty('user') || req['user'] === '')
        return reject({'code':401,'msg':'Cookies error'}); //400??
      return resolve()
    });
  };

  static login(req){
    return new Promise((resolve,reject) => {
      var loginData = req.body;
      if (!loginData.hasOwnProperty('password') || loginData['password'] === '')
        return reject({'code':400,'msg':'Missing password'})
      else if (!loginData.hasOwnProperty('username') || loginData['username'] === '')
        return reject({'code':400,'msg':'Missing username'})
      else{
        DBConfig.verifyUsernamePassword(loginData.username,loginData.password,
          function(err){reject(err)},
          function(admin){resolve({'username':loginData.username, 'admin':admin})});
      }
    });
  };

  static register(req){
    return new Promise((resolve,reject) => {
      var registerData = req.body;
      if (!req.hasOwnProperty('user') || req['user'] === '')
        return reject({'code':400,'msg':'Cookies error'}); 
      else if (!registerData.hasOwnProperty('password') || registerData['password'] === '')
        return reject({'code':400,'msg':'Missing password'});
      else if (!registerData.hasOwnProperty('username') || registerData['username'] === '')
        return reject({'code':400,'msg':'Missing username'});
      else if (!registerData.hasOwnProperty('admin') || registerData['admin'] === '')
        return reject({'code':400,'msg':'Missing admin status'});
      else{
        DBConfig.isAdmin(req.user.username,function(err){reject(err)},function(admin){
          if (admin){
            DBConfig.createUser(registerData.username,registerData.password,registerData.admin,
              function(err){reject(err)},function(){resolve()});
          }
          else
            return reject({'code':401,'msg':'Unauthorized'});
        });
      }
    });
  };

  static changePass(req){
    return new Promise((resolve,reject) => {
      var data = req.body;
      if (!req.hasOwnProperty('user') || req['user'] === '')
        return reject({'code':400,'msg':'Cookies error'});
      else if(!data.hasOwnProperty('username') || data['username'] === '')
        return reject({'code':400,'msg':'Missing username'});
      else if(!data.hasOwnProperty('password') || data['password'] === '')
        return reject({'code':400,'msg':'Missing password'});
      else if(!data.hasOwnProperty('new_password') || data['new_password'] === '')
        return reject({'code':400,'msg':'Missing new_password'});
      else{
        DBConfig.verifyUsernamePassword(req.user.username,data.password,function(err){reject(err);},
          function(admin){
            DBConfig.changePassword(req.user.username,data.new_password,function(err){reject(err);},
              function(){resolve();});
          });
      }
    });
  };

}
