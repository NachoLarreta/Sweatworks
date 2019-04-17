const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const { AuthorController } = require('../controllers/author.controller');
const { PublicationController } = require('../controllers/publication.controller');

const authorController = new AuthorController();
const publicationController = new PublicationController();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());

app.get('/author', (req, res) => authorController.findAll(req, res));
app.get('/author/:id', (req, res) => authorController.findOne(req, res));
app.delete('/author/:id', (req, res) => authorController.delete(req, res));
app.post('/author', authorController.validate('create'), (req, res) => authorController.create(req, res));
app.put('/author', authorController.validate('update'), (req, res) => authorController.update(req, res));

app.get('/publication', (req, res) => publicationController.findAll(req, res));
app.get('/publication/:id', (req, res) => publicationController.findOne(req, res));
app.get('/publication/author/:authorId', (req, res) => publicationController.findAllByAuthor(req, res));
app.delete('/publication/:id', (req, res) => publicationController.delete(req, res));
app.post('/publication', publicationController.validate('create'), (req, res) => publicationController.create(req, res));
app.put('/publication', publicationController.validate('update'), (req, res) => publicationController.update(req, res));

module.exports = app;