'use strict';

const uuid = require('uuid');
const { instance, AUTHOR_TABLE } = require("./dynamodb.service");
const { AuthorService } = require("./author.service");
const { Publication } = require("../models/publication.model");

class PublicationService {

    constructor(){
        this.authorService = new AuthorService();
    }

    async findAllByAuthor (authorId) {
        try {
            const params = {
                TableName: AUTHOR_TABLE,
                KeyConditionExpression: "id = :authorId",
                ProjectionExpression: "#publications, #id, #name, #email",
                ExpressionAttributeNames: {
                    '#publications': 'publications',
                    '#id': 'id',
                    '#name': 'name',
                    '#email': 'email'
                },
                ExpressionAttributeValues: {
                    ":authorId": authorId
                },
                Limit: 1
            };
            let result = await instance.query(params).promise();
            const {Items} = result;
            let publications = this.mapPublications(Items);
            let response = {
                status: 200,
                publications
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

    async findAll () {
        try {
            const params = {
                TableName: AUTHOR_TABLE,
                ProjectionExpression: "#publications, #id, #name, #email",
                ExpressionAttributeNames: {
                    '#publications': 'publications',
                    '#id': 'id',
                    '#name': 'name',
                    '#email': 'email'
                },
                Limit: 1
            };
            let result = await instance.scan(params).promise();
            const {Items} = result;
            let publications = this.mapPublications(Items);
            let response = {
                status: 200,
                publications,
                exclusiveStartKey: result.LastEvaluatedKey
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
    async findOne (id, authorId) {
        try {
            const params = {
                TableName: AUTHOR_TABLE,
                KeyConditionExpression: "id = :authorId",
                FilterExpression: "publications[0].id = :id",
                ProjectionExpression: "#publications, #id, #name, #email",
                ExpressionAttributeValues: {
                    ":id": id,
                    ":authorId": authorId
                },
                ExpressionAttributeNames: {
                    '#publications': 'publications',
                    '#id': 'id',
                    '#name': 'name',
                    '#email': 'email'
                },
                Limit: 1
            };
            let result = await instance.query(params).promise();
            const {Items} = result;
            let publication;
            if (Items && Items.length > 0) {
                publication = this.mapPublication(Items[0]);
            }
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
                publication.id = uuid.v1();
                publication.date = new Date().getTime();
                const params = {
                    TableName: AUTHOR_TABLE,
                    Key: {id: authorResponse.author.id},
                    UpdateExpression: "SET #publications[1] = :publication",
                    ExpressionAttributeValues: { 
                        ":publication": publication.getValues()
                    },
                    ExpressionAttributeNames: {
                        '#publications': 'publications'
                    }
                };
                let result = await instance.update(params).promise();
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
    async update (publication, authorId) {
        try {
            const params = {
                TableName: AUTHOR_TABLE,
                Key: {id: authorId},
                ConditionExpression: "#publications[0].#id = :id",
                UpdateExpression: "SET #publications[0].#title = :title, #publications[0].#body = :body",
                ExpressionAttributeValues: { 
                    ":id": publication.id,
                    ":title": publication.title,
                    ":body": publication.body
                },
                ExpressionAttributeNames: {
                    '#publications': 'publications',
                    '#id': 'id',
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
    async delete (id, authorId) {
        try {
            const params = {
                TableName: AUTHOR_TABLE,
                Key: {id: authorId},
                FilterExpression: "publications[0].id = :id",
                UpdateExpression: "REMOVE publications[0]",
                ExpressionAttributeValues: { 
                    ":id": id
                }
            };
            let result = await instance.update(params).promise();
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

    mapPublications (items) {
        let publications = [];
        if (items && items.length > 0){
            for (let item of items){
                for (let publication of item.publications){
                    let publicationAux = new Publication(publication);
                    publicationAux.authorEmail = item.email;
                    publicationAux.authorId = item.id;
                    publicationAux.authorName = item.name;
                    publications.push(publicationAux);
                }
            }
        } 
        return publications;
    }

    mapPublication(item){
        let publicationAux;
        if (item && item.publications.length > 0){
            for (let publication of item.publications){
                publicationAux = new Publication(publication);
                publicationAux.authorEmail = item.email;
                publicationAux.authorId = item.id;
                publicationAux.authorName = item.name;
            }
        }
        return publicationAux;
    }
}

exports.PublicationService = PublicationService;