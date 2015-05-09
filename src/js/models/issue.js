var Backbone = require("backbone");

var Issue = Backbone.Model.extend({
    defaults: {
        url: "",
        number: "",
        title: "",
        user: "",
        state: "",
        created_at: "",
        updated_at: "",
    }
});

module.exports = Issue;