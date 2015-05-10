var IssuesListView = require("./views/IssuesListView");

window.onload = function() {

    var issuesListView = new IssuesListView({
        el: "#IssuesList",
        template: "#IssuesListTemplate",
    });
}