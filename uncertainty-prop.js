function clearBox() {
    document.getElementById('MathOutput').innerHTML = "[Numeric solution will come out here!]";
  };

  function getInputValue() {
    // Selecting the input element and get its value
    let inputVal = document.getElementById('myInput').value;
    codeOut = '';
    UncPropSteps(inputVal);
    document.getElementById('MathOutput').innerHTML = codeOut;
    MathJax.typeset()
  }

  let codeOut = '';
  let addition = '';

  function UpdateOut(newString) {
    // +- -> \pm
    // * -> \times
    // Ignore division for now
    // Ignore powers for now (should be ^ already at end, but no {})

    addition = ''

    for (let i = 0 ; i < newString.length ; i++) {
      if (newString[i] === '+' && newString[i+1] === '-') {addition += '\\pm'; i += 1}
      else if (newString[i] === '*' && newString[i+1] !== '*') {addition += '\\times'}
      else {addition += newString[i]};
    }

    codeOut += (addition + '<br>\n');
  }

  const SumArray = array =>
    array.reduce(function (a, b) {
      return a + b;
    }, 0);

  function RoundSig(x, sig) {
    return parseFloat(Number(x).toPrecision(sig));
  }

  function RoundUnc(x, dx) {
    x = String(x);
    dx = String(dx);
    let round_dx = dx;
    let round_x = x;
    let placeholder = 0;

    let acceptedScraps = [
      '-',
      '+',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '.',
    ];

    let count = 0;

    for (let i = 0; i < dx.length; i++) {
      if (acceptedScraps.indexOf(dx[i]) > -1) {
        count += 1;
      }
    }

    if (count === dx.length) {
      dx = dx.split('+').join('');
      round_dx = String(RoundSig(dx, 1));
    } else {
      round_dx = String(dx);
    }

    if (String(round_dx).indexOf('e') > -1) {
      placeholder = -1 * Number(round_dx.split('e')[1]);
    } else if (String(round_dx).indexOf('10^') > -1) {
      placeholder = -1 * Number(round_dx.split('10^')[1]);
    } else if (String(round_dx).indexOf('.') > -1) {
      placeholder = round_dx.split('.')[1].length;
    } else if (String(round_dx).indexOf('.') === -1) {
      placeholder = -1 * round_dx.length + 1;
    }

    placeholder = Math.round(placeholder);

    if (placeholder < 0) {
      console.log('good');
      return [
        Math.round(x * 10 ** placeholder) * 10 ** Math.abs(placeholder),
        round_dx,
      ];
    } else {
      return [String(Number(x).toFixed(placeholder)), round_dx];
    }
  }

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

  function unc_sum(x, dx, y, dy) {
    let p = x + y;
    let dp = (dx ** 2 + dy ** 2) ** 0.5;

    return Math.abs(dp);
  }

  function unc_prod(x, dx, y, dy) {
    let p = x * y;
    let dp = p * Math.sqrt((dx / x) ** 2 + (dy / y) ** 2);

    return Math.abs(dp);
  }

  function unc_div(x, dx, y, dy) {
    let p = x / y;
    let dp = p * Math.sqrt((dx / x) ** 2 + (dy / y) ** 2);

    return Math.abs(dp);
  }

  function unc_const(B, x, dx) {
    let p = B * x;
    let dp = B * dx;

    return Math.abs(dp);
  }

  function unc_pow(x, dx, n) {
    let p = x ** n;
    let dp = (p * n * dx) / x;

    return Math.abs(dp);
  }

  function unc_log10(x, dx) {
    let p = Math.log10(x);
    let dp = dx / (2.3 * x);

    return Math.abs(dp);
  }

  function unc_ln(x, dx) {
    let p = Math.log(x);
    let dp = dx / x;

    return Math.abs(dp);
  }

  function unc_exp(x, dx) {
    let p = Math.exp(x);
    let dp = p * dx;

    return Math.abs(dp);
  }

  function unc_sin(x, dx) {
    let p = Math.sin(x);
    let dp = Math.cos(x) * dx;

    return Math.abs(dp);
  }

  function unc_cos(x, dx) {
    let p = Math.cos(x);
    let dp = Math.sin(x) * dx;

    return Math.abs(dp);
  }

  function unc_tan(x, dx) {
    let p = Math.tan(x);
    let dp = Math.sec(x) ** 2 * dx;

    return Math.abs(dp);
  }

  function unc_asin(x, dx) {
    let p = Math.asin(x);
    let dp = dx / Math.sqrt(1 - x ** 2);

    return Math.abs(dp);
  }

  function unc_acos(x, dx) {
    let p = Math.acos(x);
    let dp = dx / Math.sqrt(1 - x ** 2);

    return Math.abs(dp);
  }

  function unc_atan(x, dx) {
    let p = Math.atan(x);
    let dp = dx / Math.sqrt(x ** 2 + 1);

    return Math.abs(dp);
  }

  function FuncSplitter(func) {
    const allOperators = [
      'log10',
      'atan',
      'acos',
      'asin',
      'tan',
      'cos',
      'sin',
      'exp',
      'log',
      'ln',
      '**',
      '*',
      '/',
      '+',
      '-',
    ];

    const acceptedScraps = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '(',
      ')',
      ';',
    ];

    let strippedFunc = '';

    for (let i = 0; i < func.length; i++) {
      if (func[i] !== ' ') {
        strippedFunc += func[i];
      }
    }

    let variables = [];
    let operators = [];
    let opIndicies = [];

    let iterProtect = 0;

    while (
      strippedFunc.indexOf('[') > -1 &&
      strippedFunc.indexOf(']') >= -1 &&
      iterProtect < 50
    ) {
      let i = strippedFunc.indexOf('[');
      let j = strippedFunc.indexOf(']');

      variables.push(strippedFunc.slice(i, j + 1));
      strippedFunc =
        strippedFunc.slice(0, i) +
        ';'.repeat(j + 1 - i) +
        strippedFunc.slice(j + 1);

      iterProtect += 1;
    }
    if (iterProtect >= 50) {
      console.log(
        'Error in variable identifying loop, proceeding but please check over input in case of mistake.'
      );
      UpdateOut('Error in variable identifying loop, proceeding but please check over input in case of mistake.');
    }

    iterProtect = 0;

    let k = 0;
    let scraps = 0;

    for (let i = 0; i < strippedFunc.length; i++) {
      if (acceptedScraps.indexOf(strippedFunc[i]) === -1) {
        scraps += 1;
      }
    }

    while (scraps > 0 && iterProtect < 50) {
      while (k < allOperators.length) {
        if (strippedFunc.indexOf(allOperators[k]) > -1) {
          let i = strippedFunc.indexOf(allOperators[k]);
          let j = i + allOperators[k].length;

          opIndicies.push(i);
          operators.push(strippedFunc.slice(i, j));

          strippedFunc =
            strippedFunc.slice(0, i) +
            ';'.repeat(allOperators[k].length) +
            strippedFunc.slice(j + 1);

          if ((strippedFunc.match(/;/g) || []).length === strippedFunc.length) {
            break;
          }

          k = -1;
        }
        k += 1;
        iterProtect += 1;
      }
      scraps = 0;
      for (let i = 0; i < strippedFunc.length; i++) {
        if (acceptedScraps.indexOf(strippedFunc[i]) === -1) {
          scraps += 1;
        }
      }
    }
    if (iterProtect >= 50) {
      console.log(
        'Error in operator identifying loop, proceeding but please check over input in case of mistake.'
      );
      UpdateOut('Error in operator identifying loop, proceeding but please check over input in case of mistake.');
    }

    return [variables, operators, opIndicies];
  }

  function BracketFinder(func) {
    let bracketLocation = [[], []];

    for (let i = 0; i < func.length; i++) {
      let char = func[i];

      if (char === '(') {
        bracketLocation[0].push(i);
      } else if (char === ')') {
        bracketLocation[1].push(i);
      }
    }
    if (bracketLocation[0].length > 0 && bracketLocation[1].length > 0) {
      let lastBracket = [
        bracketLocation[0][bracketLocation[0].length - 1],
        undefined,
      ];

      for (let j = 0; j < bracketLocation[1].length; j++) {
        if (
          bracketLocation[1][j] > lastBracket[0] &&
          lastBracket[1] === undefined
        ) {
          lastBracket[1] = bracketLocation[1][j];
        }
      }

      bracketLocation.push([lastBracket[0], lastBracket[1]]);
    } else {
      bracketLocation.push([0, func.length]);
    }

    return bracketLocation;
  }

  function UncPropSteps(func) {
    console.log('Confirming an uncertainty propagation of ' + func);
    UpdateOut('Confirming an uncertainty propagation of \\(' + func + '\\)');

    let strippedFunc = '';

    for (let i = 0; i < func.length; i++) {
      if (func[i] !== ' ') {
        strippedFunc += func[i];
      }
    }

    func = '';

    for (let i = 0; i < strippedFunc.length; i++) {
      if (strippedFunc[i] === '^') {
        func += '**';
      } else {
        func += strippedFunc[i];
      }
    }

    const singleElementOps = [
      'log10',
      'atan',
      'acos',
      'asin',
      'tan',
      'cos',
      'sin',
      'exp',
      'log',
      'ln',
    ];

    let funcNew = func;
    let iterations = 0;
    let funcSplit = FuncSplitter(funcNew);

    let bracketLocation = 'NA';
    let singleOps = [];
    let startIndex = 'NA';
    let finalBracket = 'NA';
    let finalBracketSplit = 'NA';
    let tempVar = 'NA';
    let tempFunc = 'NA';
    let tempSol = undefined;
    let isolatedRule = '';
    let propagation = '';

    while (funcSplit[1].length !== 0 && iterations < 5) {
      bracketLocation = BracketFinder(funcNew);
      singleOps = [];
      startIndex = 'NA';
      finalBracket = 'NA';

      for (let i = 0; i < funcSplit[1].length; i++) {
        if (singleElementOps.indexOf(funcSplit[1][i]) > -1) {
          singleOps.push(1);
        } else {
          singleOps.push(0);
        }
      }

      if (SumArray(singleOps) >= 1) {
        startIndex = funcSplit[2][singleOps.indexOf(1)];
      }

      if (bracketLocation[0].length === 0) {
        finalBracket = funcNew;
      } else {
        finalBracket = funcNew.slice(
          bracketLocation[2][0] + 1,
          bracketLocation[2][1]
        );
      }

      finalBracketSplit = FuncSplitter(finalBracket);

      if (funcSplit[1].length === 1) {
        console.log('We have only one operator in ' + func);
        UpdateOut('We have only one operator in \\(' + func + '\\)');
        tempVar = '[' + FindUncRule(funcNew).join('+-') + ']';
        func = tempVar;
      } else if (bracketLocation[0].length === 0 && funcSplit[1].length > 0) {
        console.log('No brackets, try working left-to-right');
        UpdateOut('No brackets, try working left-to-right');
        tempFunc = funcNew.slice(0, funcSplit[2][1] + 1);
        tempVar = '[' + FindUncRule(tempFunc).join('+-') + ']';
        func = funcNew.split(tempFunc)[0] + tempVar + funcNew.split(tempFunc)[1];
      } else if (finalBracketSplit[1].length === 1) {
        console.log('We have a single operator within the last set of brackets.');
        UpdateOut('We have a single operator within the last set of brackets.');
        tempVar = '[' + FindUncRule(finalBracket).join('+-') + ']';
        func =
          funcNew.split(finalBracket)[0] +
          tempVar +
          funcNew.split(finalBracket)[1];
      } else if (finalBracketSplit[0] === 1 && finalBracketSplit[1] === 0) {
        console.log(
          "We have a single variable enclosed in brackets. Let's take a look..."
        );
        UpdateOut("we have a single variable enclosed in brackets. Let's take a look...");

        let openingIndex = bracketLocation[2][0];
        let bracketOp = '';
        let bracketOpIndex = 0;
        let lefthandVariable = '';

        for (let i = 0; i < funcSplit[1].length; i++) {
          if (funcSplit[2][i] + funcSplit[1][i].length == openingIndex) {
            bracketOp = funcSplit[1][i];
            bracketOpIndex = funcSplit[2][i];
            break;
          }
        }
        if (bracketOp) {
          for (let i = 0; i < funcSplit[0].length; i++) {
            if (
              funcNew.indexOf(funcSplit[0][i]) + funcSplit[0][i] ===
              bracketOpIndex
            ) {
              lefthandVariable = funcSplit[0][i];
              break;
            }
          }
          let isolatedRule =
            lefthandVariable + bracketOp + '(' + finalBracketSplit[0][0] + ')';
          let propagation = FindUncRule(isolatedRule);
          func = funcNew
            .split(isolatedRule)
            .join('[' + propagation.join('+-') + ']');
        }
      } else if (func.indexOf(']**') > -1) {
        console.log('We have a power applied directly to a variable');
        UpdateOut('We have a power applied directly to a variable.');
        let lefthandSide = func.split('**')[0];
        tempVar = lefthandSide.split('**')[0].split('[');
        tempVar = tempVar[tempVar.length - 1];
        let baseOperator = '[' + tempVar + '**';
        let powerSide = func.split(baseOperator)[1];
        let powerSideSplit = FuncSplitter(powerSide);

        if (powerSide[0] === '(') {
          let brackets = BracketFinder(powerSide);
          let miniFunc = funcNew.slice(
            bracketLocation[2][0] + 1,
            bracketLocation[2][1]
          );

          powerSideSplit = FuncSplitter(miniFunc);

          if (powerSideSplit[0].length === 0) {
            isolatedRule = baseOperator + miniFunc;
            propagation = FindUncRule(isolatedRule);
          } else {
            console.log(
              'Cannot propagate the form of a variable to the power of a variable.'
            );
            UpdateOut('Cannot propagate the form of a variable to the power of a variable.');
          }

          func =
            func.split(baseOperator)[0] +
            '[' +
            propagation.join('+-') +
            ']' +
            powerSide.split(')')[1];
        }
      } else if (SumArray(singleOps) === 1) {
        console.log('We have a single element operation.');
        UpdateOut('We have a single element operation.');

        let rule = funcSplit[1][singleOps.indexOf(1)];
        let endIndex = startIndex + rule.length;
        isolatedRule = rule + funcNew.slice(endIndex).split(')')[0] + ')';
        console.log('Passing ' + isolatedRule + ' call to FindUncRule');
        propagation = FindUncRule(isolatedRule);

        func = funcNew
          .split(isolatedRule)
          .join('[' + propagation.join('+-') + ']');
      }

      funcNew = func;
      funcSplit = FuncSplitter(funcNew);

      console.log('New function after iteration: ' + funcNew);
      UpdateOut('New function after iteration: \\[' + funcNew + '\\]<br>');
      console.log('Num operators remaining: ' + String(funcSplit[1].length));
      console.log('Iterations: ' + String(iterations) + '\n');

      if (funcNew.indexOf(undefined) > -1) {
        break;
      }

      iterations += 1;
    }

    if (funcNew.indexOf(undefined) > -1) {
      console.log(
        'Exited due to an undefined value, please check your math domain.'
      );
      UpdateOut('Exited due to an undefined value, please check your math domain.');
    } else {
      console.log('Finished!');
      UpdateOut('Finished!');
      let finalVal = funcNew.split('+-')[0].split('[')[1];
      let finalUnc = funcNew.split('+-')[1].split(']')[0];
      let finalQuote = RoundUnc(finalVal, finalUnc);

      funcNew = '[' + finalQuote.join('+-') + ']';
    }

    UpdateOut('<br>\\[' + funcNew + '\\]');

    return funcNew;
  }

  function FindOperation(func) {
    let singleElementOps = [
      'log10',
      'atan',
      'acos',
      'asin',
      'tan',
      'cos',
      'sin',
      'exp',
      'log',
      'ln',
    ];
    let starOps = ['*', '**'];
    let otherOps = ['/'];
    let operations = [];
    let operationsInd = undefined;

    for (let i = 0; i < singleElementOps.length; i++) {
      let op = singleElementOps[i];
      if (
        func.indexOf(op) > -1 &&
        (operations.length === 0 ||
          (operations.indexOf('a' + op) === -1 && operations.indexOf(op + '10')))
      ) {
        operations.push(op);
        operationsInd = func.indexOf(op);
      }
    }

    if (func.indexOf(otherOps[0]) > -1) {
      operations.push(otherOps[0]);
    }

    for (let i = 0; i < func.length; i++) {
      if (func[i] === '+' && func[i + 1] !== '-') {
        operations.push('+');
        operationsInd = i;
      }
      if (
        func[i] === '-' &&
        i !== 0 &&
        ['e', '+', '[', '('].indexOf(func[i - 1]) === -1
      ) {
        operations.push('-');
        operationsInd = i;
      }
    }

    if (func.indexOf(starOps[0]) > -1 && func.indexOf('**') === -1) {
      operations.push('*');
      operationsInd = func.indexOf('*');
    } else if (func.indexOf(starOps[0]) > -1 && func.indexOf('*') > -1) {
      operations.push('**');
      operationsInd = func.indexOf('**');
    }

    if (operations.length > 1) {
      console.log(operations);
      console.log('Too many operations!');
      UpdateOut('Too many operations!');
      return [func, 0];
    } else if (operations.length === 1) {
      console.log('Operation registered to be ' + operations[0]);
      UpdateOut('Operation registered to be ' + operations[0] + ' ');
      return [operations[0], operationsInd];
    } else {
      console.log('No operators found');
      UpdateOut('No operators found.');
      return [func, 0];
    }
  }

  function FindUncRule(func) {
    console.log('FindUncRule called for ' + func);

    let strippedFunc = '';
    for (let i = 0; i < func.length; i++) {
      if (func[i] !== ' ') {
        strippedFunc += func[i];
      }
    }
    func = strippedFunc;

    const singleElementOps = [
      'log10',
      'atan',
      'acos',
      'asin',
      'tan',
      'cos',
      'sin',
      'exp',
      'log',
      'ln',
    ];
    let LHS = undefined;
    let RHS = undefined;
    let x_str = undefined;
    let y_str = undefined;
    let x = undefined;
    let dx = undefined;
    let y = undefined;
    let dy = undefined;
    let tempVar = undefined;
    let tempUnc = undefined;

    let op = FindOperation(func);
    let operationsInd = op[1];
    op = op[0];

    if (['+', '-'].indexOf(op) > -1) {
      LHS = func.slice(0, operationsInd);
      RHS = func.slice(operationsInd + 1);
    } else if (op === '**') {
      LHS = func.split(op)[0];
      RHS = func.split(op)[1];
      if (RHS[0] === '(' && RHS[RHS.length - 1] === ')') {
        RHS = RHS.slice(1, RHS.length - 1);
      }
    } else {
      LHS = func.split(op)[0];
      RHS = func.split(op)[1];
    }

    if (LHS.indexOf('[') > -1) {
      x_str = LHS.split('[')[1].split(']')[0];
      x = Number(x_str.split('+-')[0]);
      dx = Number(x_str.split('+-')[1]);
    } else if (+LHS === +LHS) {
      /* check if it's a number */ x = Number(LHS);
      dx = 0;
    }

    if (RHS.indexOf('[') > -1) {
      y_str = RHS.split('[')[1].split(']')[0];
      y = Number(y_str.split('+-')[0]);
      dy = Number(y_str.split('+-')[1]);
    } else if (+RHS === +RHS) {
      /* check if it's a number */ y = Number(RHS);
      dy = 0;
    }

    if (op === '+') {
      tempVar = x + y;
      tempUnc = unc_sum(x, dx, y, dy);
      return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
    } else if (op === '-') {
      tempVar = x - y;
      tempUnc = unc_sum(x, dx, y, dy);
      return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
    } else if (op === '*') {
      tempVar = x * y;
      if (dx === 0) {
        tempUnc = unc_const(x, y, dy);
      } else if (dy === 0) {
        tempUnc = unc_const(y, x, dx);
      } else {
        tempUnc = unc_prod(x, dx, y, dy);
      }
      return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
    } else if (op === '/') {
      tempVar = x / y;
      tempUnc = unc_div(x, dx, y, dy);
      return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
    } else if (op === '**') {
      let n = Number(RHS);
      tempVar = x ** n;
      tempUnc = unc_pow(x, dx, y, dy);
      return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
    } else if (singleElementOps.indexOf(op) > -1) {
      if (op === 'log10') {
        if (y > 0) {
          tempVar = Math.log10(y);
          tempUnc = unc_log10(y, dy);
          return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
        } else {
          return [undefined, undefined];
        }
      } else if (op === 'log' || op === 'ln') {
        if (y > 0) {
          tempVar = Math.log(y);
          tempUnc = unc_ln(y, dy);
          return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
        } else {
          return [undefined, undefined];
        }
      } else if (op === 'exp') {
        tempVar = Math.exp(y);
        tempUnc = unc_exp(y, dy);
        return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
      } else if (op === 'sin') {
        tempVar = Math.sin(y);
        tempUnc = unc_sin(y, dy);
        return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
      } else if (op === 'cos') {
        tempVar = Math.cos(y);
        tempUnc = unc_cos(y, dy);
        return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
      } else if (op === 'tan') {
        tempVar = Math.tan(y);
        tempUnc = unc_tan(y, dy);
        return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
      } else if (op === 'asin') {
        tempVar = Math.asin(y);
        tempUnc = unc_asin(y, dy);
        return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
      } else if (op === 'acos') {
        tempVar = Math.acos(y);
        tempUnc = unc_acos(y, dy);
        return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
      } else if (op === 'atan') {
        tempVar = Math.atan(y);
        tempUnc = unc_atan(y, dy);
        return [RoundSig(tempVar, 4), RoundSig(Math.abs(tempUnc), 4)];
      } else {
        console.log(
          'An unexpected error has occurred - function was logged as known and then not found in the next section of code.'
        );
        UpdateOut('An unexpected error has occurred - function was logged as known and then not found in the next section of code.');
        return [undefined, undefined];
      }
    }
  }
