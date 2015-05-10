window.jQuery = window.$ = jQuery = $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;

var IssuesListView = require("./views/IssuesListView");
var IssueViewerRouter = require("./routers/IssueViewerRouter");

window.Moment = require("moment");

window.onload = function() {

    var issuesListView = new IssuesListView({
        el: "#IssuesList",
        template: "#IssuesListTemplate",
    });

    var router = new IssueViewerRouter();

    router.on("route:showIssue", function(issueId){
        console.debug(issuesListView.get("issues").get(issueId).get("title"));
    });

    Backbone.history.start();    
}