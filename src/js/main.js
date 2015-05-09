window.jQuery = window.$ = jQuery = $ = require("jquery");

var Issue = require("./models/issue");
var Issues = require("./collections/issues");

var Greeter = function() {};

Greeter.prototype.sayHello = function(name) {
    console.debug("Hello, " + name);
}

window.onload = function() {
    var greeter = new Greeter();
    greeter.sayHello("World");

    console.debug(new Issues([
            new Issue({number: 800, title: "test issue"}), 
            new Issue({number: 900, title: "test issue 2"})
    ]));
}