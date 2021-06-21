
const advancedText = 
"    Here we introduce the general form of uncertainty propagation. We will do it initially to derive the generalisations (so you won't have to do any differentiation yourself) and we will then show how you can start use the general form on a given function.\\[\\begin{align*}\\Delta f(x_i,...,x_N) &= \\sqrt{\\sum_{i=1}^{N} \\left(\\frac{\\partial f}{\\partial x_i} \\Delta x_{i}\\right)^2}\\end{align*}\\]There is a symbol that you may not have seen before: partial differentiation, \\(\\partial y / \\partial x\\). Simply put, partial differention is just regular differentiation, but you have multiple variables. When you're doing the differentiation, you just treat all of the variables as constants <b>except</b> for the one that you're differentiating with respect to. This equation has a very simple meaning behind it, how much will \\(f(x_i,...,x_N)\\) change if a change is made to each individual variable?\\[\\begin{align*}\\sum_{i=1}^{N} &: \\text{Summation over each variable of interest (distance, mass, charge, etc.)} \\\\\\frac{\\partial f}{\\partial x_i} &: \\text{How much a small change in this variable, } x_i \\text{, will affect } f \\\\\\Delta x_i &: \\text{How much of a change we expect to be in } x_i \\text{ due to uncertainties}\\end{align*}\\]<b>Generalising to \\(k\\) terms</b><br>Let's consider the following, a summation of \\(k\\) terms and the product of \\(k\\) terms:\\[\\begin{align*}y &= \\sum_{m=1}^{k} x_i \\\\z &= \\prod_{m=1}^{k} q_i\\end{align*}\\]Do we have to apply the propagation equations iteratively, two variables at a time? Let's check using the partial derivative form, note that \\(k\\)is the number of terms in our expressions, this is substituted in for \\(N\\) in the equation in your books. Similarly our \\(y\\) goes in for \\(f\\) and \\(x_i\\) is the same.\\[\\begin{align*}\\Delta y &= \\sqrt{\\sum_{i=1}^{k}\\left(\\frac{\\partial y}{\\partial x_i}\\Delta x_i\\right)^2} \\&= \\sqrt{\\left(\\frac{\\partial y}{\\partial x_1}\\Delta x_1\\right)^2 + \\left(\\frac{\\partial y}{\\partial x_2}\\Delta x_2\\right)^2 + \\left(\\frac{\\partial y}{\\partial x_3}\\Delta x_3\\right)^2 + ...} \\end{align*}\\]All terms in the partial derivatives will go to zero, except the \\(x_i\\) term in each iteration which goes to one. Therefore:\\[\\begin{align*}\\Delta y &= \\sqrt{\\left(\\Delta x_1\\right)^2 + \\left(\\Delta x_2\\right)^2 + \\left(\\Delta x_3\\right)^2 + ...} \\\\&= \\sqrt{\\sum_{i=1}^{k}\\left(\\Delta x_i\\right)^2}\\end{align*}\\]So if you're doing addition with more than two variables, you can put all of them under a single square root. Continuing with multiplication:\\[\\begin{align*}\\Delta z &= \\sqrt{\\sum_{i=1}^{k}\\left(\\frac{\\partial z}{\\partial q_i}\\Delta q_i\\right)^2} \\\\&= \\sqrt{\\left(\\frac{\\partial z}{\\partial q_0}\\Delta q_0\\right)^2 + \\left(\\frac{\\partial z}{\\partial q_1}\\Delta q_1\\right)^2 + \\left(\\frac{\\partial z}{\\partial q_2}\\Delta q_2\\right)^2 + ...}\\end{align*}\\]Here the partial derivative differs from the addition case, now what will be left is the product of all $q_i$ terms except with the \\(i^{th}\\) term missing.\\[\\begin{align*}\\Delta z &= \\sqrt{\\left(\\frac{z}{q_1}\\Delta q_1\\right)^2 + \\left(\\frac{z}{q_2}\\Delta q_2\\right)^2 + \\left(\\frac{z}{q_3}\\Delta q_3\\right)^2 + ...} \\\\&= \\sqrt{z^2\\left(\\frac{\\Delta q_1}{q_1}\\right)^2 + z^2\\left(\\frac{\\Delta q_2}{q_2}\\right)^2 + z^2\\left(\\frac{\\Delta q_3}{q_3}\\right)^2 + ...} \\\\&= z\\sqrt{\\left(\\frac{\\Delta q_1}{q_1}\\right)^2 + \\left(\\frac{\\Delta q_2}{q_2}\\right)^2 + \\left(\\frac{\\Delta q_3}{q_3}\\right)^2 + ...} \\\\&= z\\sqrt{\\sum_{i=1}^{k}\\left(\\frac{\\Delta q_i}{q_i}\\right)^2}\\end{align*}\\]We can therefore see that the multiplication expression can be generalised to \\(k\\) terms as well.";

const basicText = "<img src=\"https://hosting.photobucket.com/images/i/MyLastBrainCell/Jessie-star-banner.jpg\" class=\"wrapper\"></img>"

basicModeDisclaimer = "Howdy partner, are you looking for the advanced content? If so, <button class="advButton" onclick=\"showAdvanced()\"> Click here</button>, otherwise here is a calming photo instead.";

advancedModeDisclaimer = "Howdy partner, are you looking for calming pictures? If so, <button class="advButton" onclick=\"showBasic()\"> Click here</button>, otherwise enjoy the advanced content instead."

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
