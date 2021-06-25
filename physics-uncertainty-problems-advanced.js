const advancedText = 
"Here is how you would do the challenge problem from the basic worked examples using the partial differential form. Where \\(x = \\{A,B,\\theta\\}\\) are variables accessed by the index \\(i\\).<br> \\[\\begin{align*}\\Delta(\\mathbf{\\vec{A}} \\cdot \\mathbf{\\vec{B}}) &= \\sqrt{\\sum_{i=1}^{3} \\left(\\frac{\\partial (\\mathbf{\\vec{A}} \\cdot \\mathbf{\\vec{B}})}{\\partial x_i} \\Delta x_i\\right)^2} \\\\&= \\sqrt{\\left[\\frac{\\partial}{\\partial A} (AB\\cos(\\theta))\\Delta A\\right]^2 + \\left[\\frac{\\partial}{\\partial B} (AB\\cos(\\theta))\\Delta B\\right]^2 + \\left[\\frac{\\partial}{\\partial \\theta} (AB\\cos(\\theta))\\Delta \\theta\\right]^2} \\\\&= \\sqrt{(B\\cos(\\theta)\\Delta A)^2 + (A\\cos(\\theta)\\Delta B)^2 + (AB\\sin(\\theta)\\Delta \\theta)^2} \\\\&= \\sqrt{[(B\\;\\Delta A)^2 + (A\\;\\Delta B)^2]\\cos^2(\\theta) + (AB\\sin(\\theta)\\Delta \\theta)^2}\\end{align*}\\]<br>Which will give you the same answer.";

const basicText = "<img src=\"https://hosting.photobucket.com/images/i/MyLastBrainCell/Jessie-star-banner.jpg\" class=\"wrapper\"></img>"

basicModeDisclaimer = "Howdy partner, are you looking for the advanced content? If so, <button class=\"prettyButton\" onclick=\"showAdvanced()\"> Click here</button>, otherwise here is a calming photo instead.";

advancedModeDisclaimer = "Howdy partner, are you looking for calming pictures? If so, <button class=\"prettyButton\" onclick=\"showBasic()\"> Click here</button>, otherwise enjoy the advanced content instead."

function showAdvanced() {
  document.getElementById("advanced").innerHTML = advancedText;
  document.getElementById("disclaimer").innerHTML = advancedModeDisclaimer;
  MathJax.typeset()
}

function showBasic() {
  document.getElementById("advanced").innerHTML = basicText;
  document.getElementById("disclaimer").innerHTML = basicModeDisclaimer;
  MathJax.typeset()
}
