"use strict";

const sqlite3 = require('sqlite3').verbose();
const dbConst = require('../constants/db.json');
const secur = require('../api/auth/auth');
const fs = require ('fs');
var exists = fs.existsSync(dbConst.dir);
var db = new sqlite3.Database(dbConst.dir);

module.exports = class DBConfig {
    static init(errCbck,callback) {
    	var errorFn = function(err){
    		if (err!=null){
				errCbck({'code':500, 'msg':err.Error});
				return;
			};
    	}

      	db.serialize(function(){
			if (!exists){
				console.log("Newly created database, adding default admin user.");
				db.exec("CREATE TABLE Table_Users (username TEXT NOT NULL UNIQUE, \
					password TEXT NOT NULL, salt TEXT NOT NULL, admin \
					BOOLEAN NOT NULL);", errorFn);
				DBConfig.createUser("admin","admin",true,errCbck,callback);
	      	}
            else if (callback!=undefined)
                callback();
      	});
    };

    static createUser(username,password,isAdmin,errCbck,callback) {
		var errorFn = function(err){
    		if (err!=null){
				errCbck({'code':500, 'msg':err.Error});
				return;
			}
            else if (callback!=undefined)
                callback();
    	};

    	var create = function(ret){
			if (ret){
		    	var pass = secur.hash(password);
		    	var adm = isAdmin == true ? 1 : 0;
		      	db.serialize(function(){
					db.run("INSERT INTO Table_Users VALUES (?,?,?,?);",
						[username,pass.pass,pass.salt,adm], errorFn);
    			});
    		}
            else
                errCbck({'code':403,'msg':'Username already taken'})
    	};

    	DBConfig.usernameAvailable(username,errCbck,create);
  	}

    static deleteUser(username,errCbck,callback){
    	var errorFn = function(err){
    		if (err!=null){
				errCbck({'code':500, 'msg':err.Error});
				return;
			}
            else if (callback != undefined)
                callback();
    	};

		db.serialize(function(){
			db.run("DELETE FROM Table_Users WHERE username=?;",username,errorFn);
		})
    }

    static changePassword(username,password,errCbck,callback){
		var errorFn = function(err){
    		if (err!=null){
				errCbck({'code':500, 'msg':err.Error});
				return;
			}
            else if (callback != undefined)
                callback();
    	};

    	var pass = secur.hash(password);
    	db.serialize(function(){
    		db.run("UPDATE Table_Users SET password=?,salt=? WHERE username==?",
    			[pass.pass,pass.salt,username],errorFn);
    	})
    }

    static usernameAvailable(username,errCbck,callback){
    	var rowReturnFn = function(err,row){
	    	var ret = false;
    		if (err!=null){
    			errCbck({'code':500, 'msg':err.Error});
    		}
    		else if (row == undefined)
				callback(true);
			else
				callback(false);
    	};

    	db.serialize(function(){
    		db.get("SELECT username FROM Table_Users WHERE username==?",username,rowReturnFn);
    	})
    }

    static verifyUsernamePassword(username,password,errCbck,callback){
        var rowReturnFn = function(err,row){
            if (err!=null)
                errCbck({'code':500, 'msg':err.Error});
            else if (row == undefined)
                errCbck({'code':401, 'msg':"No such username"});
            else{
                var pass = row['password'];
                var salt = row['salt'];
                var secPass = secur.hash(password, salt);
                if (secPass['pass'] !== pass)
                    errCbck({'code':401, 'msg':"Wrong username or password"});
                else
                    callback(row['admin']);
            }
        };


        db.serialize(function(){
          db.get("SELECT password,salt,admin FROM Table_Users WHERE username==?",username,rowReturnFn);  
        })
    }

    static isAdmin(username,errCbck,callback){
        var rowReturnFn = function(err,row){
           if (err!=null)
                errCbck({'code':500, 'msg':err.Error});
            else if (row == undefined)
                errCbck({'code':401, 'msg':"No such username"});
            else
                callback(row['admin']);
        };

        db.serialize(function(){
            db.get("SELECT admin FROM Table_Users WHERE username==?",username,rowReturnFn);
        })
    }

    static getUsers(errCbck,callback){
        var rowReturnFn = function(err,rows){
           if (err!=null)
                errCbck({'code':500, 'msg':err.Error});
            else if (rows == undefined || rows == [])
                errCbck({'code':401, 'msg':"No such username"});
            else{
                rows.forEach(function(e){
                    if (e.admin == 1)
                        e.admin = true;
                    else
                        e.admin = false;
                });
                console.log(rows);
                callback(rows);
            }
        };

        db.serialize(function(){
            db.all("SELECT username,admin FROM Table_Users",rowReturnFn);
        })
    }

    static close(){
    	db.close();
    }
};
