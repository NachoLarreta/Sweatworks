'use strict';

const uuid = require('uuid');
const { instance, MAIN_TABLE, PUBLICATIONS, AUTHORS } = require("./dynamodb.service");
const { AuthorService } = require("./author.service");
const { Publication } = require("../models/publication.model");

class PublicationService {

    constructor(){
        this.authorService = new AuthorService();
    }

    async findAllByAuthor (authorId, exclusiveStartKey, limit, orderType) {
        try {
            if (!limit) {
                limit = 10;
            }
            if (!orderType) {
                orderType = "asc";
            }
            let filterExpression;
            let dateFilter;
            if (orderType == "asc") {
                filterExpression = "#date < :date AND #authorId = :authorId";
                dateFilter = new Date().getTime();
            } else {
                filterExpression = "#date > :date AND #authorId = :authorId";
                dateFilter = new Date(new Date().setFullYear(new Date().getFullYear() - 10)).getTime();
            }
            let params = {
                TableName: MAIN_TABLE,
                KeyConditionExpression: "#entity = :publications",
                FilterExpression: filterExpression,
                ExpressionAttributeNames: {
                    '#authorId': 'authorId',
                    '#date': 'date',
                    '#entity': 'entity'
                },
                ExpressionAttributeValues: {
                    ":authorId": authorId,
                    ":date": dateFilter,
                    ":entity": PUBLICATIONS
                },
                ScanIndexForward: (orderType == "asc"),
                Limit: limit
            };
            if (exclusiveStartKey){
                params = {...params, ExclusiveStartKey: exclusiveStartKey};
            }
            let result = await instance.query(params).promise();
            const {Items} = result;
            const {LastEvaluatedKey} = result;
            let publications = await this.loadAuthors(Items);
            let response = {
                status: 200,
                publications,
                exclusiveStartKey: LastEvaluatedKey
            };
            return Promise.resolve(response);
        } catch (error){
            console.log(error);
            let response = {
                status: 500,
                message: "Could not load publications."
            };
            return Promise.reject(response);
        }
    }

    async loadAuthors(publications){
        if (publications && publications.length > 0){
            let authorsId = [];
            let authors = [];
            for (let publication of publications) {
                authorsId.push(publication.authorId);
            }
            authorsId = new Set(authorsId);
            for (let authorId of authorsId){
                const params = {
                    TableName: MAIN_TABLE,
                    Key: {id: authorId, entity: AUTHORS},
                    ProjectionExpression: "#id, #name, #email",
                    ExpressionAttributeNames: {
                        '#name': 'name',
                        '#email': 'email',
                        '#id': 'id'
                    }
                };
                let result = await instance.get(params).promise();
                const {Item} = result;
                if (Item){
                    authors.push(Item);
                }
            }
            for (let publication of publications){
                let author = authors.filter(author => author.id == publication.authorId)[0];
                if (author){
                    publication.authorName = author.name;
                    publication.authorEmail = author.email;
                }
            }
            return Promise.resolve(publications);
        } else {
            return Promise.resolve([]);
        }
    }

    async findAll (exclusiveStartKey, limit, orderType) {
        try {
            if (!limit) {
                limit = 10;
            }
            if (!orderType) {
                orderType = "asc";
            }
            let filterExpression;
            let dateFilter;
            if (orderType == "asc") {
                filterExpression = "#date < :date";
                dateFilter = new Date().getTime();
            } else {
                filterExpression = "#date > :date";
                dateFilter = new Date(new Date().setFullYear(new Date().getFullYear() - 10)).getTime();
            }
            let params = {
                TableName: MAIN_TABLE,
                KeyConditionExpression: "#entity = :publications",
                FilterExpression: filterExpression,
                ExpressionAttributeNames: {
                    '#date': 'date',
                    '#entity': 'entity'
                },
                ExpressionAttributeValues: {
                    ":date": dateFilter,
                    ":publications": PUBLICATIONS
                },
                ScanIndexForward: (orderType == "asc"),
                Limit: limit
            };
            if (exclusiveStartKey){
                params = {...params, ExclusiveStartKey: { id: exclusiveStartKey }};
            }
            let result = await instance.query(params).promise();
            const {Items} = result;
            const {LastEvaluatedKey} = result;
            let publications = await this.loadAuthors(Items);
            let response = {
                status: 200,
                publications,
                exclusiveStartKey: LastEvaluatedKey
            };
            return Promise.resolve(response);
        } catch (error){
            console.log(error);
            let response = {
                status: 500,
                message: "Could not load publications."
            };
            return Promise.reject(response);
        }
        
    }
    async findOne (id) {
        try {
            let params = {
                TableName: MAIN_TABLE,
                KeyConditionExpression: "#id = :id",
                IndexName: "publications",
                ExpressionAttributeNames: {
                    '#id': 'id'
                },
                ExpressionAttributeValues: { 
                    ":id": id
                },
                Limit: 1
            };
            let result = await instance.query(params).promise();
            let {Items} = result;
            let publication;
            if (Items && Items.length > 0) {
                Items = await this.loadAuthors(Items);
            }
            publication = Items[0];
            if (!publication) {
                return Promise.resolve({
                    status: 404,
                    message: "Publication not found."
                });
            } else {
                return Promise.resolve({
                    status: 200,
                    publication
                });
            }
        } catch (error){
            console.log(error);
            return Promise.reject({
                status: 500,
                message: "Could not load publication."
            });
        }
    }
    async create (publication, authorId) {
        try {
            let authorResponse = await this.authorService.findOne(authorId);
            if (authorResponse.status == 200){
                let entity = PUBLICATIONS;
                publication.id = uuid.v1();
                publication.date = new Date().getTime();
                publication.authorId = authorId;
                let publicationValues = publication.getValues();
                publicationValues = {...publicationValues, entity};
                const params = {
                    TableName: MAIN_TABLE,
                    Item: publicationValues
                };
                let result = await instance.put(params).promise();
                let response = {
                    status: 200
                };
                return Promise.resolve(response);
            } else {
                return Promise.reject(authorResponse);
            }
        } catch (error) {
            console.log(error);
            let response = {
                status: 500,
                message: "Could not create publication."
            };
            return Promise.reject(response);
        }
    }
    async update (publication) {
        try {
            const params = {
                TableName: MAIN_TABLE,
                Key: {id, entity: PUBLICATIONS},
                UpdateExpression: "SET #title = :title, #body = :body",
                ExpressionAttributeValues: { 
                    ":title": publication.title,
                    ":body": publication.body
                },
                ExpressionAttributeNames: {
                    '#title': 'title',
                    '#body': 'body'
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
                message: "Could not update publication."
            });
        }
    }
    async delete (id) {
        try {
            const params = {
                TableName: MAIN_TABLE,
                Key: {id, entity: PUBLICATIONS}
            }
            let result = await instance.delete(params).promise();
            return Promise.resolve({
                status: 200
            });
        } catch (error) {
            console.log(error);
            return Promise.reject({
                status: 400,
                message: "Could not delete publication."
            });
        }
    }
}

exports.PublicationService = PublicationService;