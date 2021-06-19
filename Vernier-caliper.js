function getInputValue() {
  document.getElementById("measureReadout").innerHTML = "Measurements = ugh mm";
  
  let inputVal = document.getElementById("myInput").value;
  document.getElementById("top-img").style.left=inputVal+"px";
  //document.getElementById("measureReadout").innerHTML = "Measurement = " + pixToDist(inputVal) + "mm";
};

function pixToDist(px) {
  // returns mm
  return Math.round(Number(px) * (1500/899))/10;
}
