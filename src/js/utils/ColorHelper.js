var ColorHelper = {
    
    getBrightnessFromHex: function(hexColor) {
        function hexToRgb(hex) {
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        var rgbColor =  hexToRgb(hexColor);

        // http://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx
        return brightness = Math.round(0.299*rgbColor.r + 0.578*rgbColor.g + 0.144*rgbColor.b);
    }
}

module.exports = ColorHelper;