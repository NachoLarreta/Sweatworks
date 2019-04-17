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
exports.AUTHOR_TABLE = process.env.AUTHOR_TABLE;