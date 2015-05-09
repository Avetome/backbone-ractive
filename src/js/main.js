window.jQuery = window.$ = jQuery = $ = require("jquery");

var Issue = require("./models/issue");
var Issues = require("./collections/issues");

var Backbone = require("backbone");
var Ractive = require("ractive");
var BackboneAdaptor = require("ractive-adaptors-backbone");
BackboneAdaptor.Backbone = Backbone;

var issues = new Issues([
                new Issue({number: 800, title: "test issue"}), 
                new Issue({number: 900, title: "test issue 2"})
            ]);

var IssuesListView = Ractive.extend({
    oninit: function (options) {
    }  
});

window.onload = function() {

    var issuesListView = new IssuesListView({
        el: "#IssuesList",
        template: "#IssuesListTemplate",
        data: {issues: issues},
        adapt: [ BackboneAdaptor ],
    });

    console.debug(issues);
}