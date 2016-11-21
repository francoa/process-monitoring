'use strict';

var cookies = require('cookies');
var crypto = require('crypto');
var keygrip = require('keygrip');
var keys = keygrip(["Franco", "Beer"]);
const cookieName = "BeerCookies";

exports.cookKeys = keys;

exports.hash = function (pwd, salt) {
    if (!salt) {
        try {
            var buf = crypto.randomBytes(64);
            salt = buf.toString('base64');
        }
        catch (ex) {
            throw ex;
        }
    }
    var pass = salt + pwd;

    var passHash = crypto.createHash('sha256').update(pass).digest('base64');
    var temp = {'pass': passHash, 'salt': salt};
    return temp;
};


exports.extractCookieData = function (req, res, next) {

    var cook = new cookies(req, res, {keys:keys});
    try{
        var user = JSON.parse(decodeURIComponent(cook.get(cookieName)));
        if (user) {
            req.user = user;
        }
    }
    catch(err){}

/*    else {
        var err
        throw ()
    }*/

    return next();
};

/*exports.setCookieData = function(req,res,username,admin){
    var cook = new cookies(req, res, {keys:keys});
    var obj = {'username':username, 'admin':admin}
    cook.set(cookieName, JSON.stringify(obj), {signed: true, maxAge: 9000000});
}*/

exports.clearCookieData = function(res){
    res.clearCookie(cookieName);
}