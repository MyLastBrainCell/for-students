function resetCaliper() {
    document.getElementById("top-img").style.left = "0px";
  };

function getInputValue() {
  let inputVal = document.getElementById("myInput").value;
  document.getElementById("top-img").style.left=cmToPixels(inputVal)+"px";
};

function cmToPixels(cm) {
  //return Math.round(Number(cm) * (899/15));
  return cm;
}
