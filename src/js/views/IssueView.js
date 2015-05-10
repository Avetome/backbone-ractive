window.jQuery = window.$ = jQuery = $ = require("jquery");

var Issue = require("./../models/issue");
var Issues = require("./../collections/issues");
var Repositories = require("./../collections/repositories");
var Urls = require("./../utils/urls");

var Backbone = require("backbone");
Backbone.$ = $;
var Ractive = require("ractive");
//Ractive.DEBUG = false;
var BackboneAdaptor = require("ractive-adaptors-backbone");
BackboneAdaptor.Backbone = Backbone;

var IssueView = Ractive.extend({
    data: {
        visible: false,
        issue: null,        
    },

    adapt: [ BackboneAdaptor ],

    oninit: function (options) {
        this.on({

        });
    }    
});

module.exports = IssueView;