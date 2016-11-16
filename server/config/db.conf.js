"use strict";

const sqlite3 = require('sqlite3').verbose();
const dbConst = require('../constants/db.json');
const auth = require('../auth/auth');
const fs = require ('fs');
const tbl = "Table_Users";
var exists = fs.existsSync(dbConst.dir);
var db = new sqlite3.Database(dbConst.dir);

var errorFn = function(err){
	if (err != null){
		throw err;
	}
};

module.exports = class DBConfig {
    static init() {
      	db.serialize(function(){
			if (!exists){
				console.log("Newly created database, adding default admin user.");
				db.run("CREATE TABLE ? (username TEXT NOT NULL UNIQUE, \
					password TEXT NOT NULL, salt TEXT NOT NULL, isAdmin \
					BOOLEAN NOT NULL);", tbl,errorFn);
				DBConfig.createUser("admin","admin");
	      	}
      	})
    }

    static createUser(username,password) {
    	if (DBConfig.verifyUsername(username)) {
	    	var pass = auth.hash(password);
	      	db.serialize(function(){
				db.run("INSERT INTO ? VALUES (?,?,?,TRUE);",
					[tbl,username,pass.pass,pass.salt],errorFn);
	      	})
      	}
      	//TODO SEND MSG TO USER
    }

    static deleteUser(username){
		db.serialize(function(){
			db.run("DELETE FROM ? WHERE username=?;",[tbl,username],errorFn);
		})
    }

    static changePassword(username,password){
    	var pass = auth.hash(password);
    	db.serialize(function(){
    		db.run("UPDATE ? SET password=?,salt=? WHERE username=?",
    			[tbl,pass.pass,pass.salt,username],errorFn);
    	})
    }

    static verifyUsername(username){
    	var ret = false;
    	db.serialize(function(){
    		db.get("SELECT username FROM ? WHERE username==?",[tbl,username],function(err,row){
    			errorFn(err);
    			if (row == undefined)
    				ret = true;
    		});
    		return ret;
    	})
    }
};
