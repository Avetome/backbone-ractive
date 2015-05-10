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
var Moment = require("moment");

var IssuesListView = Ractive.extend({
    data: {
        issues: new Issues(),
        user: "",
        repository: "",
        repositories: new Repositories(),
        userHasNoRepos: false,
        errorLoadingRepos: false,
        reposLoading: false,

        formatDate: function(date) {
            var md = Moment(date);
            var mn = Moment(); // now

            if(mn.diff(md, "days") < 10) {                
                return md.fromNow();
            }
            else {
                return md.format("D MMM");
            }
        }
    },

    adapt: [ BackboneAdaptor ],

    oninit: function (options) {
        this.on({
            userChange: function(event) {
                this.set("reposLoading", true);
                this.set("errorLoadingRepos", false);
                this.set("userHasNoRepos", false);                    

                // clean issues list
                var issues = this.get("issues");
                issues.reset([]);
                this.set("issues", issues);

                var repos = this.get("repositories");
                repos.url = Urls.repos(this.get("user"));

                repos.fetch()
                    .done(function(){
                        this.set("repositories", repos);
                        this.set("userHasNoRepos", !repos.length);
                        this.set("errorLoadingRepos", false);
                        this.set("reposLoading", false);
                    }.bind(this))
                    .fail(function(error){
                        this.set("userHasNoRepos", false);
                        this.set("errorLoadingRepos", true);
                        this.set("reposLoading", false);
                    }.bind(this)
                );
            },

            repoChange: function(event) {
                var id = event.original.target.value;
                var repository = this.get("repositories").get(id);
                this.set("repository", repository);
                var issues = this.get("issues");

                // also we can user repository.get("issues_url"), but in this case we need cut "{/number}" substring                
                issues.url = Urls.issues(this.get("user"), repository.get("name"));
                issues.fetch()
                    .done(function(){
                        this.set("issues", issues);
                    }.bind(this))
                    .fail(function(error){
                        console.error(error);
                    }.bind(this)                    
                );
            }
        });
    }  
});

module.exports = IssuesListView;