'use strict';
const { body, validationResult } = require('express-validator/check');
const { PublicationService } = require('../services/publication.service');
const { Publication } = require("../models/publication.model");

class PublicationController {
    
    constructor() {
        this.publicationService = new PublicationService();
    }

    async findAllByAuthor (req, res) {
        let authorId = req.params.authorId;
        let search = req.query.search;
        let exclusiveStartKey = req.query.exclusiveStartKey;
        let limit = req.query.limit;
        let orderType = req.query.orderType;
        this.publicationService.findAllByAuthor(authorId, exclusiveStartKey, limit, orderType, search)
            .then(data => this.findAllByAuthorOK(data, res))
            .catch(error => this.onError(error, res));
    }
    findAllByAuthorOK(data, res){
        res.status(data.status).json(data);
    }
    async findAll (req, res) {
        let exclusiveStartKey = req.query.exclusiveStartKey;
        let search = req.query.search;
        let limit = req.query.limit;
        let orderType = req.query.orderType;
        this.publicationService.findAll(exclusiveStartKey, limit, orderType, search)
            .then(data => this.findAllOK(data, res))
            .catch(error => this.onError(error, res));
    }
    findAllOK(data, res){
        res.status(data.status).json(data);
    }
    async findOne (req, res) {
        let id = req.params.id;
        if (id) {
            this.publicationService.findOne(id)
                .then(data => this.findOneOK(data, res))
                .catch(error => this.onError(error, res));
        } else {
            return res.status(422).json({ errors: ["id or authorId doesn't exists."] });
        }
    }
    findOneOK(data, res){
        if (data.status != 200){
            res.status(data.status).json({message: data.message});
        } else {
            res.status(data.status).json(data.publication);
        }
    }
    async create (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let publication = new Publication(req.body);
        this.publicationService.create(publication, req.body.authorId)
            .then(data => this.createOK(data, res))
            .catch(error => this.onError(error, res));
    }
    createOK(data, res){
        res.status(data.status).json({message: "OK"});
    }
    async update (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let publication = new Publication(req.body);
        this.publicationService.update(publication)
            .then(data => this.updateOK(data, res))
            .catch(error => this.onError(error, res));
    }
    updateOK(data, res){
        res.status(data.status).json({message: "OK"});
    }
    async delete (req, res) {
        let id = req.params.id;
        if (id) {
            this.publicationService.delete(id)
                .then(data => this.deleteOK(data, res))
                .catch(error => this.onError(error, res));
        } else {
            return res.status(422).json({ errors: ["id or authorId doesn't exists."] });
        }
    }
    deleteOK (data, res) {
        res.status(data.status).json({message: "Delete OK"});
    }
    validate (method) {
        switch (method) {
            case 'create': {
                return [ 
                    body('body', "body doesn't exists").exists(),
                    body('title', "Title doesn't exists").exists(),
                    body('authorId', "AuthorId doesn't exists").exists()
                ];   
            }
            case 'update': {
                return [ 
                    body('id', "id doesn't exists").exists(),
                    body('body', "body doesn't exists").exists(),
                    body('title', "Title doesn't exists").exists()
                ];   
            }
            default: 
                return [];
        }
    }
    onError(error, res){
        console.error(error.message);
        let response = {
            statusCode: error.status,
            body: JSON.stringify({
                message: "Error: " + error.message
            })
        };
        if (error && error.status) {
            res.status(error.status).json(response);
        } else {
            res.status(500).json({message: "Internal server error"});
        }
    }
}

exports.PublicationController = PublicationController;