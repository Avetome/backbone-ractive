var urls = {
    repos: function(user) {
        return "https://api.github.com/users/{user}/repos"
            .replace("{user}", user);
    },

    issues: function(user, repo) {
        return "https://api.github.com/repos/{user}/{repo}/issues"
            .replace("{user}", user)
            .replace("{repo}", repo);
    }
};

module.exports = urls;