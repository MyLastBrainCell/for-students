
function clearBox() {
  document.getElementById('MathOutput').innerHTML = "[Scientific notation will come out here!]";
  };

function getInputValue() {
  // Selecting the input element and get its value
  let inputVal = document.getElementById('myInput').value;
  codeOut = '';
  UncPropSteps(inputVal);
  document.getElementById('MathOutput').innerHTML = codeOut;
  MathJax.typeset()
}


function ToSciNotation(num) {

  let FirstSigDigit = undefined;
  let DecimalPlace = undefined;

  num = Number(num.replace(' ',''));
  num = ('\\( ' + String(num.toExponential()).replace('e',' x 10^(') + ') \\)' ).replace('+','');
  
  document.getElementById('MathOutput').innerHTML = num;
  return num;
}
