var $ = function (el) {
  return document.querySelector(el);
};

var $$ = function (el) {
  return document.querySelectorAll(el);
};

function selectText(element) {
  saveColor(KoloroManager.getHex());

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

  var successful = document.execCommand('copy');

  if (successful) {
    // $("flash-msg").classList.add("show");
    var flashMsg = $("#flash-msg");
    flashMsg.classList.add("show");

    setTimeout(function () {
      flashMsg.classList.remove("show");
    }, 2000);
  }
}

function saveColor(hex) {
  var newItem = document.createElement("LI");
  var link = document.createElement("A");
  link.href = "#" + hex;
  link.style.backgroundColor = "#" + hex;
  newItem.appendChild(link);
  var list = $("#saved-colors");
  list.insertBefore(newItem, list.childNodes[2]);
  // list.appendChild(newItem);
}

window.addEventListener("hashchange", function(event) {
  KoloroManager.initialColor();
}, false);

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
