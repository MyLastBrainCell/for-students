function getInputValue() {
  let inputVal = document.getElementById("myInput").value;
  document.getElementById("top-img").style.left=inputVal+"px";
  document.getElementByID("measureReadout").innerHTML = pixToDist(inputVal) + "mm";
};

function pixToDist(px) {
  // returns mm
  return Math.round(Number(px) * (150/899));
}
