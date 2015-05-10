var urls = {
    repos: function(user) {
        return "https://api.github.com/users/{user}/repos"
            .replace("{user}", user);
    },

    issues: function(user, repo, page, per_page) {
        page = page % 1 === 0 && page > 0 ? page : 1; // isInt?
        per_page = per_page % 1 === 0 && per_page > 0 ? per_page: 30;

        return "https://api.github.com/repos/{user}/{repo}/issues?page={page}&per_page={per_page}"
            .replace("{user}", user)
            .replace("{repo}", repo)
            .replace("{page}", page)
            .replace("{per_page}", per_page);
    }
};

module.exports = urls;