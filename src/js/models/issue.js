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
        labels: [],
        state: "",
        created_at: "",
        comments: 0,
        body: "",
    }
});

module.exports = Issue;