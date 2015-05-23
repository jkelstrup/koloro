//
// Color Converter Module
//
// Contains converters for
// HSV to RGB
// RGB to HSV
// RGB to HEX
// HEX to RGB
//
// And a HEX validator (only 6-digit hex for now)
//
var ColorConverter = (function () {

  //
  // HSV to RGB
  //
  var hsv2rgb = function(hue, saturation, brightness) {
    var r, g, b,
        i, f, p, q, t;

    var h = hue;
    if (h === 360) h = 0;
    var s = saturation / 100;
    var v = brightness / 100;

    if (s === 0) {

      r = Math.round(v * 255);
      g = Math.round(v * 255);
      b = Math.round(v * 255);

      return {r: r, g: g, b: b};
    }

    h /= 60;
  	i = Math.floor( h );
  	f = h - i;
  	p = v * ( 1 - s );
  	q = v * ( 1 - s * f );
  	t = v * ( 1 - s * ( 1 - f ) );

    switch(i) {
      case 0:
  			r = v;
  			g = t;
  			b = p;
  			break;
  		case 1:
  			r = q;
  			g = v;
  			b = p;
  			break;
  		case 2:
  			r = p;
  			g = v;
  			b = t;
  			break;
  		case 3:
  			r = p;
  			g = q;
  			b = v;
  			break;
  		case 4:
  			r = t;
  			g = p;
  			b = v;
  			break;
  		default:		// case 5:
  			r = v;
  			g = p;
  			b = q;
  			break;
    }

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return {r: r, g: g, b: b};
  };

  //
  // RGB to HSV
  //
  var rgb2hsv = function(red, green, blue) {
    var h, s, v;
    var min, max, delta;

    var r = red / 255,
        g = green / 255,
        b = blue / 255;

    min = Math.min(r,g,b);
    max = Math.max(r,g,b);

    v = max;

    delta = max - min;

    if (max === 0) {
      // Everything is 0. Let's return black.
      h = 0;
      s = 0;
      v = 0;
      return {h: h, s: s, v: v};
    } else if (min === 1) {
      // Everything is 255. Let's return white.
      h = 0;
      s = 0;
      v = 100;
      return {h: h, s: s, v: v};
    } else {
      s = delta / max;
    }

    if ( r === max ) {
      h = ( g - b ) / delta;
    } else if ( g === max ) {
      h = 2 + ( b - r ) / delta;
    } else {
      h = 4 + ( r - g ) / delta;
    }

    h *= 60;

    if ( h < 0 ) {
      h += 360;
    }

    h = Math.round(h);
    s = Math.round(s * 100);
    v = Math.round(v * 100);

    return {h: h, s: s, v: v};
  };

  //
  // RGB to HEX
  //
  var rgb2hex = function(red, green, blue) {
    var r = red.toString(16),
        g = green.toString(16),
        b = blue.toString(16);

    function leadingZero(x) {
      if (x.length === 1) {
        return "0" + x;
      } else {
        return x;
      }
    }

    var hexCode = leadingZero(r) + leadingZero(g) + leadingZero(b);

    return hexCode;
  };

  //
  // HEX to RGB
  //
  var hex2rgb = function(hex) {
    var r = parseInt(hex.substring(0,2), 16),
        g = parseInt(hex.substring(2,4), 16),
        b = parseInt(hex.substring(4), 16);

    return {r: r, g: g, b: b};
  };

  //
  // Validate HEX
  //
  var validateHex = function(hex) {
    if (hex.length != 6) {
      return false;
    }
    return /[0-9A-F]{6}$/i.test(hex);
  };

  return {
    hsv2rgb: hsv2rgb,
    rgb2hsv: rgb2hsv,
    rgb2hex: rgb2hex,
    hex2rgb: hex2rgb,
    validateHex: validateHex
  };

})();
