window.jQuery = window.$ = jQuery = $ = require("jquery");

window._ = _ = require("underscore");

var Backbone = require("backbone");

var Greeter = function() {};

Greeter.prototype.sayHello = function(name) {
    console.debug("Hello, " + name);
}

window.onload = function() {
    var greeter = new Greeter();
    greeter.sayHello("World");

    console.debug(Backbone);

}