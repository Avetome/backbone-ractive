window.jQuery = window.$ = jQuery = $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;

var IssueViewerRouter = Backbone.Router.extend({
    routes: {
    'issues':     'showIssuesList',
    'repos/:user/:repo/issues/:number': 'showIssue',
    '*path': 'showIssuesList',
    }
});

module.exports = IssueViewerRouter;