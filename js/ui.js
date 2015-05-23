var $ = function (el) {
  return document.querySelector(el);
};

var $$ = function (el) {
  return document.querySelectorAll(el);
};

function selectText(element) {
  var doc = document,
      text = doc.getElementById(element),
      range,
      selection;

  if (doc.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(text);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

document.addEventListener("DOMContentLoaded", function(event) {

  KoloroManager.initialColor();

  [].forEach.call($$('input'), function (el) {
    el.addEventListener('focus', function(event) {
      this.parentNode.classList.add('focus');
    }, false);

    el.addEventListener('blur', function(event) {
      this.parentNode.classList.remove('focus');
      KoloroManager.input(this.id, this.value);
    }, false);

    el.addEventListener('keydown', function(event) {
      keyboardControl(event, this);
    }, false);
  });

});
