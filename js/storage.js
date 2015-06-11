var Storage = (function() {

  var colors = [];

  if (localStorage.savedColors) {
    colors = JSON.parse(localStorage.savedColors);
  }

  function save(hex) {
    if (colors.indexOf(hex) === -1) { // Color is not already saved
      colors.push(hex);
      localStorage.savedColors = JSON.stringify(colors);
      insertSavedColor(hex);
    }
  }

  return {
    colors: colors,
    save: save
  };

})();
