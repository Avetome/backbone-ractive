window.jQuery = window.$ = jQuery = $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;

var IssueViewerRouter = Backbone.Router.extend({
    routes: {
    '':     'showIssuesList',
    'issue/:id': 'showIssue'
    }
});

module.exports = IssueViewerRouter;