'use strict';

const mochaPlugin = require('serverless-mocha-plugin');
const authorService = require("../services/author.service");
const expect = mochaPlugin.chai.expect;

describe('author.service', () => {
  it('findAll', () => {
    return expect(authorService.findAll()).to.not.be.empty;
  });
});
