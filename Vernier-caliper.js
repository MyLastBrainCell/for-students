function getInputValue() {
  let inputVal = document.getElementById('myInput').value;
  document.getElementById('top-img').style.left=inputVal+'px';
  document.getElementById('measureReadout').innerHTML = 'Measurement = ' + pixToDist(inputVal) + 'mm';
};

function pixToDist(px) {
  // returns mm
  //return Math.round(Number(px) * (1600/822))/10;
  Math.round(Number(px) - 15.6;
}
