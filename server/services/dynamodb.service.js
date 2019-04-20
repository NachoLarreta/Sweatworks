'use strict';
const AWS = require('aws-sdk');
const IS_OFFLINE = process.env.IS_OFFLINE;

let dynamoDB;

if (IS_OFFLINE === 'true') {
   dynamoDB = new AWS.DynamoDB.DocumentClient({
     region: 'localhost',
     endpoint: 'http://localhost:15002'
   });
} else {
  dynamoDB = new AWS.DynamoDB.DocumentClient();
}

exports.instance = dynamoDB;
exports.MAIN_TABLE = process.env.MAIN_TABLE;
exports.AUTHORS = "AUTHORS";
exports.PUBLICATIONS = "PUBLICATIONS";