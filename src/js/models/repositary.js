var Backbone = require("backbone");

var Repositary = Backbone.Model.extend({
    defaults: {
        name: "",
        full_name: "",
        html_url: "",
    }
});

module.exports = Repositary;