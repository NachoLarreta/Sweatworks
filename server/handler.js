'use strict';
const serverless = require('serverless-http');
const app = require('./server');

module.exports.generic = serverless(app);