window.jQuery = window.$ = jQuery = $ = require("jquery");

var Greeter = function() {};

Greeter.prototype.sayHello = function(name) {
    console.debug("Hello, " + name);
}

window.onload = function() {
    var greeter = new Greeter();
    greeter.sayHello("World");
}