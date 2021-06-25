function getInputValue() {
  let inputVal = document.getElementById('myInput').value;
  document.getElementById('top-img').style.left= inputVal + 'px';
  document.getElementById('measureReadout').innerHTML = 'Measurement = \\( (' + pixToDist(inputVal) + '\\pm 0.5) \\)mm';
};

function pixToDist(px) {
  // returns mm
  px = Number(px) - 80;
  return Math.round( (Number(px)) * (1601/823))/10;
}
