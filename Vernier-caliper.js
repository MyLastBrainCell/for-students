function getInputValue() {
  let inputVal = document.getElementById("myInput").value;
  body.getElementById("top-img").style.left=inputVal+"px";
  document.getElementById("measureReadout").innerHTML = "Measurement = " + pixToDist(inputVal) + "mm";
};

function pixToDist(px) {
  // returns mm
  return Math.round(Number(px) * (1500/899))/10;
}
