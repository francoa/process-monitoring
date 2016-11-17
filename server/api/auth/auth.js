'use strict';

var cookies = require('cookies');
var crypto = require('crypto');
var keygrip = require('keygrip');
var keys = keygrip(["Franco", "Beer"]);
const cookieName = "BeerCookiesUserName";

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

/**
 * TODO : verificar esta función
 * Extracts the cookies from the HTTP request header
 * @param {Object} req: The HTTP request's headers
 * @param {Object} res: The HTTP request's response headers
 * @param {Function} next: Function that executes next
 * @returns {callback} Runs next function.
 */
exports.extractCookieData = function (req, res, next) {

    var cook = new cookies(req, res, {keys:keys});
    var user = cook.get(cookieName);

    if (user) {
        req.username = user;
    }
/*    else {
        var err
        throw ()
    }*/

    return next();
};

exports.setCookieData = function(req,res,username){
    var cook = new cookies(req, res, secur.cookKeys);
    cook.set(cookieName, username, {signed: true, maxAge: 9000000});
}

exports.clearCookieData = function(res){
    res.clearCookie(cookieName);
}