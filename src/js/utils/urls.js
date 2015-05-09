var urls = {
    repos: function(user) {
        return "https://api.github.com/users/{user}/repos".replace("{user}", user);
    }
};

module.exports = urls;