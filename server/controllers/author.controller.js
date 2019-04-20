'use strict';
const { body, validationResult } = require('express-validator/check');
const { AuthorService } = require('../services/author.service');
const { Author } = require("../models/author.model");

class AuthorController {
    
    constructor() {
        this.authorService = new AuthorService();
    }

    async findAll (req, res) {
        let exclusiveStartKey = req.query.exclusiveStartKey;
        let limit = req.query.limit;
        this.authorService.findAll(exclusiveStartKey, limit)
            .then(data => this.findAllOK(data, res))
            .catch(error => this.onError(error, res));
    }
    findAllOK(data, res){
        res.status(data.status).json(data);
    }
    async findOne (req, res) {
        let id = req.params.id;
        this.authorService.findOne(id)
            .then(data => this.findOneOK(data, res))
            .catch(error => this.onError(error, res));
    }
    findOneOK(data, res){
        if (data.status != 200){
            res.status(data.status).json({message: data.message});
        } else {
            res.status(data.status).json(data.author);
        }
    }
    async create (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let author = new Author(req.body);
        this.authorService.create(author)
            .then(data => this.createOK(data, res))
            .catch(error => this.onError(error, res));
    }
    createOK(data, res){
        res.status(data.status).json({message: "Create OK"});
    }
    async update (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let author = new Author(req.body);
        this.authorService.update(author)
            .then(data => this.updateOK(data, res))
            .catch(error => this.onError(error, res));
    }
    updateOK(data, res){
        res.status(data.status).json({message: "Update OK"});
    }
    async delete (req, res) {
        let id = req.params.id;
        this.authorService.delete(id)
            .then(data => this.deleteOK(data, res))
            .catch(error => this.onError(error, res));
    }
    deleteOK (data, res) {
        res.status(data.status).json({message: "Delete OK"});
    }
    validate (method) {
        switch (method) {
            case 'create': {
                return [ 
                    body('name', "Name doesn't exists").exists(),
                    body('name', 'Invalid name').isAlpha(),
                    body('email', "Email doesn't exists").exists(),
                    body('email', 'Invalid email').isEmail(),
                    body('dateOfBirth', 'Invalid date of birth').isInt(),
                    body('dateOfBirth', "Date doesn't exists").exists()
                ];   
            }
            case 'update': {
                return [ 
                    body('id', "Id doesn't exists").exists(),
                    body('name', 'Invalid name').isAlpha(),
                    body('email', 'Invalid email').isEmail(),
                    body('dateOfBirth', 'Invalid date of birth').isInt()
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

exports.AuthorController = AuthorController;