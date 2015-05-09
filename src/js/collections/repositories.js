var Backbone = require("backbone");

var Repository = require("./../models/repository");

var Repositories = Backbone.Collection.extend({
    model: Repository
});

module.exports = Repositories;