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

var DateFormatter = require("./../utils/DateFormatter");
var ColorHelper = require("./../utils/ColorHelper");

var IssuesListView = Ractive.extend({
    data: {
        issues: new Issues(),
        user: "",
        repository: "",
        repositories: new Repositories(),
        userHasNoRepos: false,
        errorLoadingRepos: false,
        reposLoading: false,
        repoHasNoIssues: false,
        errorLoadingIssues: false,
        issuesLoading: false,
        perPage: 30,
        pages: 0,
        page: 1,
        visible: true,

        formatDate: DateFormatter.format,

        isDimColor: function(hexColor) {
            var brightness = ColorHelper.getBrightnessFromHex(hexColor);

            return brightness > 150;
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

                this.updateIssues();
            },

            perPageChange: function(event) {
                var perPage = event.original.target.value;
                this.set("perPage", perPage);

                this.updateIssues();
            },           

            setUser(event, user) {
                this.set("user", user);
                this.fire("userChange");
                return false;
            },
        });
        
        this.updateIssues = function() {
            var repository = this.get("repository");
            var issues = this.get("issues");

            this.set("issuesLoading", true);
            this.set("errorLoadingIssues", false);
            this.set("repoHasNoIssues", false);                

            // also we can user repository.get("issues_url"), but in this case we need cut "{/number}" substring                
            issues.url = Urls.issues(this.get("user"), repository.get("name"), +this.get("page"), +this.get("perPage"));
            issues.fetch()
                .done(function(){
                    this.set("issues", issues);
                    this.set("repoHasNoIssues", !issues.length);
                    this.set("errorLoadingIssues", false);
                    this.set("issuesLoading", false);                        
                }.bind(this))
                .fail(function(error){
                    this.set("repoHasNoIssues", false);
                    this.set("errorLoadingIssues", true);
                    this.set("issuesLoading", false);
                }.bind(this)                    
            );            
        }
    }  
});

module.exports = IssuesListView;