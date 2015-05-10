var IssuesListView = require("./views/IssuesListView");
window.Moment = require("moment");

window.onload = function() {

    var issuesListView = new IssuesListView({
        el: "#IssuesList",
        template: "#IssuesListTemplate",
    });
}