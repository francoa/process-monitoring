"use strict";

const morgan = require('morgan'),
    bodyParser = require('body-parser'),
    multer = require('multer'), // v1.0.5
    upload = multer(), // for parsing multipart/form-data
    contentLength = require('express-content-length-validator'),
    helmet = require('helmet'),
    express = require('express');

module.exports = class RouteConfig {
    static init(application) {
        let _root = process.cwd();
        let _nodeModules = '/node_modules/';
        let _clientFiles = (process.env.NODE_ENV === 'production') ? '/client/dist/' : '/client/dev/';

        application.use(express.static(_root + _nodeModules));
        application.use(express.static(_root + _clientFiles));
        application.use(bodyParser.json());
        application.use(bodyParser.urlencoded({ extended: true }));
        application.use(morgan('dev'));
        application.use(contentLength.validateMax({max: 999}));
        application.use(helmet());
    }
}
