'use strict';

const uuid = require('uuid');
const { instance, AUTHOR_TABLE } = require("./dynamodb.service");
const { Author } = require("../models/author.model");

class AuthorService {
    async findAll () {
        try {
            const params = {
                TableName: AUTHOR_TABLE,
                ProjectionExpression: "#id, #name, #email, #dateOfBirth",
                ExpressionAttributeNames: {
                    '#id': 'id',
                    '#name': 'name',
                    '#email': 'email',
                    '#dateOfBirth': 'dateOfBirth'
                }
            };
            let result = await instance.scan(params).promise();
            const {Items} = result;
            let response = {
                status: 200,
                authors: Items
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
                TableName: AUTHOR_TABLE,
                Key: {id},
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
            let publications = [];
            let authorValues = author.getValues();
            authorValues = {...authorValues, publications}
            const params = {
                TableName: AUTHOR_TABLE,
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
                TableName: AUTHOR_TABLE,
                Key: {id: author.id},
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
                TableName: AUTHOR_TABLE,
                Key: { id }
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