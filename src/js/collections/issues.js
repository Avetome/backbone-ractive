var Backbone = require("backbone");

var Issue = require("./../models/issue");

var Issues = Backbone.Collection.extend({
    model: Issue
});

module.exports = Issues;