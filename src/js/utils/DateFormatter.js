var Moment = require("moment");

var DateFormatter = {
    format: function(date) {
        var md = Moment(date);
        var mn = Moment(); // now

        if(mn.diff(md, "days") < 10) {
            return md.fromNow();
        }
        else {
            return md.format("D MMM");
        }
    }
}

module.exports = DateFormatter;
