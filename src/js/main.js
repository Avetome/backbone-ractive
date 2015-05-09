window.jQuery = window.$ = jQuery = $ = require("jquery");

var Issue = require("./models/issue");
var Issues = require("./collections/issues");
var Repositories = require("./collections/repositories");
var Urls = require("./utils/urls");

var Backbone = require("backbone");
Backbone.$ = $;
var Ractive = require("ractive");
var BackboneAdaptor = require("ractive-adaptors-backbone");
BackboneAdaptor.Backbone = Backbone;

var issues = new Issues([
                new Issue({number: 800, title: "test issue"}), 
                new Issue({number: 900, title: "test issue 2"})
            ]);

var IssuesListView = Ractive.extend({
    oninit: function (options) {
        this.on({
            userChange: function(event) {
                console.debug(this.get("repositories").length, Urls.repos(this.get("user")));
                var repos = this.get("repositories");
                repos.url = Urls.repos(this.get("user"));

                repos.fetch().then(
                    function(data){
                        this.set("repositories", repos);
                        this.set("userHasNoRepos", !repos.length);
                        this.set("errorLoadingRepos", false);
                    }.bind(this), 
                    function(error){
                        this.set("userHasNoRepos", false);
                        this.set("errorLoadingRepos", true);
                    }.bind(this)
                );
            },

            repoChange: function(event) {
                console.debug(this.get("repositories").get(event.original.target.value));
            }
        });
    }  
});

window.onload = function() {

    var issuesListView = new IssuesListView({
        el: "#IssuesList",
        template: "#IssuesListTemplate",
        data: {
            issues: issues,
            user: "",
            repository: "",
            repositories: new Repositories(),
            userHasNoRepos: false,
            errorLoadingRepos: false
        },

        adapt: [ BackboneAdaptor ],
    });

    console.debug(issues);
}