var KoloroManager = (function() {

  var rgb = {
    r: 0,
    g: 0,
    b: 0
  };

  var hsv = {
    h: 0,
    s: 0,
    v: 0
  };

  var hex = "000000";

  function initialColor() {
    var hash = window.location.hash.substring(1);
    if (ColorConverter.validateHex(hash)) {
      rgb = ColorConverter.hex2rgb(hash);
      hsv = ColorConverter.rgb2hsv(rgb.r, rgb.g, rgb.b);
      render();
    } else {
      // Generate random color
      rgb.r = Math.floor((Math.random() * 256));
      rgb.g = Math.floor((Math.random() * 256));
      rgb.b = Math.floor((Math.random() * 256));
      hsv = ColorConverter.rgb2hsv(rgb.r, rgb.g, rgb.b);
      render();
    }
  }

  function render() {
    document.getElementById("r").value = rgb.r;
    document.getElementById("g").value = rgb.g;
    document.getElementById("b").value = rgb.b;

    document.getElementById("h").value = hsv.h;
    document.getElementById("s").value = hsv.s;
    document.getElementById("v").value = hsv.v;

    hex = ColorConverter.rgb2hex(rgb.r, rgb.g, rgb.b);

    document.getElementById("hex").innerHTML = hex;

    document.body.style.backgroundColor = "#" + hex;
    window.location.hash = hex;
  }

  function input(val, amount) {
    amount = (isNaN(parseInt(amount))) ? 0 : parseInt(amount);

    if (val == "r" || val == "g" || val == "b") {
      rgb[val] = amount;
      if (rgb[val] < 0) {
        rgb[val] = 0;
      } else if (rgb[val] > 255) {
        rgb[val] = 255;
      }
      hsv = ColorConverter.rgb2hsv(rgb.r, rgb.g, rgb.b);
    }

    if (val == "h") {
      hsv.h = amount;
      if (hsv.h < 0) {
        hsv.h = 0;
      } else if (hsv.h > 360) {
        hsv.h = 360;
      }
      rgb = ColorConverter.hsv2rgb(hsv.h, hsv.s, hsv.v);
    }

    if (val == "s" || val == "v") {
      hsv[val] = amount;
      if (hsv[val] < 0) {
        hsv[val] = 0;
      } else if (hsv[val] > 100) {
        hsv[val] = 100;
      }
      rgb = ColorConverter.hsv2rgb(hsv.h, hsv.s, hsv.v);
    }

    render();
  }

  function update(val, amount) {

    if (val == "r" || val == "g" || val == "b") {
      rgb[val] += amount;
      if (rgb[val] < 0) {
        rgb[val] = 0;
      } else if (rgb[val] > 255) {
        rgb[val] = 255;
      }
      hsv = ColorConverter.rgb2hsv(rgb.r,rgb.g,rgb.b);
    }

    if (val == "h") {
      hsv.h += amount;
      if (hsv.h < 0) {
        hsv.h = 360 + hsv.h; // Plus because the mod is already negative
      } else if (hsv.h > 360) {
        hsv.h %= 360;
      }
      rgb = ColorConverter.hsv2rgb(hsv.h, hsv.s, hsv.v);
    }

    if (val == "s" || val == "v") {
      hsv[val] += amount;
      if (hsv[val] < 0) {
        hsv[val] = 0;
      } else if (hsv[val] > 100) {
        hsv[val] = 100;
      }
      rgb = ColorConverter.hsv2rgb(hsv.h, hsv.s, hsv.v);
    }

    render();
  }

  return {
    initialColor: initialColor,
    input: input,
    update: update
  };

})();
