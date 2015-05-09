var Backbone = require("backbone");

var Repository = Backbone.Model.extend({
    defaults: {
        name: "",
        full_name: "",
        html_url: "",
    }
});

module.exports = Repository;