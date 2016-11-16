'use strict';

var crypto = require('crypto');


var hash = function (pwd, salt) {
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
exports.hash = hash;