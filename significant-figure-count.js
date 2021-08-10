  const SumArray = array =>
  array.reduce(function (a, b) {
    return a + b;
  }, 0);

function SciSigCount(variable) {
  let sigCount = 0;
  let maybeBank = 0;
  let preSig = true;
  let preDec = true;

  let zeroTest = [];
  variable = String(variable);

  for (let i = 0; i < variable.length; i++) {
    if (variable[i] === '.' || variable[i] === '0') {
      zeroTest.push(1);
    } else {
      zeroTest.push(0);
    }
  }

  if (SumArray(zeroTest) === zeroTest.length) {
    sigCount = variable.length - (variable.indexOf('.') > -1);

    return sigCount;
  }

  for (let i = 0; i < variable.length; i++) {
    let char = variable[i];

    if (char === '.' && preDec) {
      preDec = false;
    } else if (char !== '0' && char !== '.' && preSig) {
      preSig = false;
    } else if (char === '0' && !preSig) {
      if (preDec) {
        maybeBank += 1;
      } else {
        sigCount += 1;
      }
    }

    if (char !== '.' && char !== '0' && !preSig) {
      sigCount += 1;
      sigCount += maybeBank;
      maybeBank = 0;
    }
  }

  return sigCount;
}
