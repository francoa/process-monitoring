"use strict";

const sqlite3 = require('sqlite3').verbose();
const dbConst = require('../constants/db.json');
const secur = require('../api/auth/auth');
const fs = require ('fs');
var exists = fs.existsSync(dbConst.dir);
var db = new sqlite3.Database(dbConst.dir);

module.exports = class DBConfig {
    static init(errCbck) {
    	var errorFn = function(err){
    		if (err!=null){
				errCbck(err);
				return;
			};
    	}

      	db.serialize(function(){
			if (!exists){
				console.log("Newly created database, adding default admin user.");
				db.exec("CREATE TABLE Table_Users (username TEXT NOT NULL UNIQUE, \
					password TEXT NOT NULL, salt TEXT NOT NULL, isAdmin \
					BOOLEAN NOT NULL);", errorFn);
				DBConfig.createUser("admin","admin",true,errCbck);
	      	};
      	});
    }

    static createUser(username,password,isAdmin,errCbck) {
		var errorFn = function(err){
    		if (err!=null){
				errCbck(err);
				return;
			};
    	};

    	var create = function(ret){
			if (ret){
		    	var pass = secur.hash(password);
		    	var adm = isAdmin == true ? 1 : 0;
		      	db.serialize(function(){
					db.run("INSERT INTO Table_Users VALUES (?,?,?,?);",
						[username,pass.pass,pass.salt,adm], errorFn);
    			});
    		};
    	};

    	DBConfig.verifyUsername(username,create,errCbck);
  	}

    static deleteUser(username,errCbck){
    	var errorFn = function(err){
    		if (err!=null){
				errCbck(err);
				return;
			};
    	};

		db.serialize(function(){
			db.run("DELETE FROM Table_Users WHERE username=?;",username,errorFn);
		})
    }

    static changePassword(username,password,errCbck){
		var errorFn = function(err){
    		if (err!=null){
				errCbck(err);
				return;
			};
    	};

    	var pass = secur.hash(password);
    	db.serialize(function(){
    		db.run("UPDATE Table_Users SET password=?,salt=? WHERE username=?",
    			[pass.pass,pass.salt,username],errorFn);
    	})
    }

    static verifyUsername(username,callback,errCbck){
    	var rowReturnFn = function(err,row){
	    	var ret = false;
    		if (err!=null){
    			errCbck(err);
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

    static verifyUsernamePassword(username,password,callback,errCbck){
        var rowReturnFn = function(err,row){
            console.log(err);
            console.log(row);
            if (err!=null){
                console.log("Here's error! (joke)")
                errCbck({'code':500, 'msg':err.Error});
            }
            else if (row == undefined)
                errCbck({'code':401, 'msg':"No such username"});
            else{
                var pass = row['password'];
                var salt = row['salt'];
                var secPass = secur.hash(password, salt);
                if (secPass['pass'] !== pass)
                    errCbck({'code':401, 'msg':"Wrong email or password"});
                else{
                    console.log(row['isAdmin']);
                    callback(row['isAdmin']);
                }
            }
        };


        db.serialize(function(){
          db.get("SELECT password,salt,isAdmin FROM Table_Users WHERE username==?",username,rowReturnFn);  
        })
    }

    static close(){
    	db.close();
    }
};
