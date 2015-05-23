function keyboardControl(event, element) {

  var mod = 1;
  if (event.shiftKey) { // Shift key is down
    mod = 10;
  }

  // UP KEY
  if (event.which == 38) {
    KoloroManager.update(element.id, mod);
    event.preventDefault();
  }

  // DOWN KEY
  else if (event.which == 40) {
    KoloroManager.update(element.id, -mod);
    event.preventDefault();
  }

}
