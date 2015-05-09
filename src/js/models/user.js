var Backbone = require("backbone");

var User = Backbone.Model.extend({
    defaults: {
        login: "",
        url: "",
        type: "User"
    }
});

module.exports = User;