function typeWriter() {
  var i=0
  var txt = "hello hbcsd";
  var speed = 50;
  if (i < txt.length) {
    document.getElementById(id).innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
