'use strict';

const uuid = require('uuid');
const { instance, MAIN_TABLE, AUTHORS } = require("./dynamodb.service");
const { Author } = require("../models/author.model");

class AuthorService {
    async findAll (exclusiveStartKey, limit) {
        try {
            if (!limit) {
                limit = 10;
            }
            let params = {
                TableName: MAIN_TABLE,
                KeyConditionExpression: "#entity = :authors",
                ProjectionExpression: "#id, #name, #email, #dateOfBirth",
                ExpressionAttributeNames: {
                    '#id': 'id',
                    '#name': 'name',
                    '#email': 'email',
                    '#dateOfBirth': 'dateOfBirth',
                    '#entity': 'entity'
                },
                ExpressionAttributeValues: { 
                    ":authors": AUTHORS
                },
                Limit: limit
            };
            if (exclusiveStartKey){
                params = {...params, ExclusiveStartKey: { entity: AUTHORS, id: exclusiveStartKey }};
            }
            let result = await instance.query(params).promise();
            const {Items} = result;
            const {LastEvaluatedKey} = result;
            let response = {
                status: 200,
                authors: Items,
                exclusiveStartKey: LastEvaluatedKey
            };
            return Promise.resolve(response);
        } catch (error){
            console.log(error);
            let response = {
                status: 500,
                message: "Could not load authors."
            };
            return Promise.reject(response);
        }
    }
    async findOne (id) {
        try {
            const params = {
                TableName: MAIN_TABLE,
                Key: {id, entity: AUTHORS},
                ProjectionExpression: "#id, #name, #email, #dateOfBirth",
                ExpressionAttributeNames: {
                    '#id': 'id',
                    '#name': 'name',
                    '#email': 'email',
                    '#dateOfBirth': 'dateOfBirth'
                }
            };
            let result = await instance.get(params).promise();
            const {Item} = result;
            if (!Item) {
                return Promise.resolve({
                    status: 404,
                    message: "Author not found."
                });
            } else {
                let author = new Author(Item);
                return Promise.resolve({
                    status: 200,
                    author
                });
            }
        } catch (error){
            console.log(error);
            return Promise.reject({
                status: 500,
                message: "Could not load author."
            });
        }
    }
    async create (author) {
        try {
            author.id = uuid.v1();
            let entity = AUTHORS;
            let authorValues = author.getValues();
            authorValues = {...authorValues, entity}
            const params = {
                TableName: MAIN_TABLE,
                Item: authorValues
            };
            let result = await instance.put(params).promise();
            let response = {
                status: 200
            };
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            let response = {
                status: 500,
                message: "Could not create author."
            };
            return Promise.reject(response);
        }
    }
    async update (author) {
        try {
            const params = {
                TableName: MAIN_TABLE,
                Key: {id: author.id, entity: AUTHORS},
                UpdateExpression: "SET #name = :name, #email = :email, #dateOfBirth = :dateOfBirth",
                ExpressionAttributeValues: { 
                    ":name": author.name,
                    ":email": author.email,
                    ":dateOfBirth": author.dateOfBirth
                },
                ExpressionAttributeNames: {
                    '#name': 'name',
                    '#email': 'email',
                    '#dateOfBirth': 'dateOfBirth'
                }
            };
            let result = await instance.update(params).promise();
            return Promise.resolve({
                status: 200
            });
        } catch (error){
            console.log(error);
            return Promise.reject({
                status: 400,
                message: "Could not update author."
            });
        }
    }
    async delete (id) {
        try {
            const params = {
                TableName: MAIN_TABLE,
                Key: { id, entity: AUTHORS }
            }
            let result = await instance.delete(params).promise();
            return Promise.resolve({
                status: 200
            });
        } catch (error) {
            console.log(error);
            return Promise.reject({
                status: 400,
                message: "Could not delete author."
            });
        }
    }
}

exports.AuthorService = AuthorService;