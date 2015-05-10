window.jQuery = window.$ = jQuery = $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;

var IssuesListView = require("./views/IssuesListView");
var IssuesView = require("./views/IssueView");
var IssueViewerRouter = require("./routers/IssueViewerRouter");

window.Moment = require("moment");

window.onload = function() {

    var issuesListView = new IssuesListView({
        el: "#IssuesList",
        template: "#IssuesListTemplate",
    });

    var issueView = new IssuesView({
        el: "#Issue",
        template: "#IssueTemplate"
    });

    var router = new IssueViewerRouter();

    router.on("route:showIssuesList", function(){
        issuesListView.set("visible", true);
        issueView.set("issue", null);
        //TODO: load state (user, repo, page, perpage)
    });

    router.on("route:showIssue", function(user, repository, issueNumber){
        if (issuesListView.get("user") == user &&
            issuesListView.get("repository").get("name") == repository) {
            var issue = issuesListView.get("issues").findWhere({number: +issueNumber});
            issueView.set("issue", issue);
        }
        else {
            //TODO: load issue
        }

        issuesListView.set("visible", false);
    });

    Backbone.history.start();    
}