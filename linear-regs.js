function getInputValue(){
    // Selecting the input element and get its value 

    let xInput = document.getElementById("horizontalData").value;
    let yInput = document.getElementById("verticalData").value;
    let xUncInput = document.getElementById("horizontalUnc").value;
    let yUncInput = document.getElementById("verticalUnc").value;
    let xNameInput = document.getElementById("horizontalLabel").value;
    let yNameInput = document.getElementById("verticalLabel").value;
    let xUnitInput = document.getElementById("horizontalUnit").value;
    let yUnitInput = document.getElementById("verticalUnit").value;

    if (xInput.length === 0) {xInput = [0,0,0]};
    if (yInput.length === 0) {yInput = [0,0,0]};
    if (xUncInput.length === 0) {xUncInput = []; for (let i = 0; i < xInput.length ; i++) {xUncInput.push(1)}};
    if (yUncInput.length === 0) {yUncInput = []; for (let i = 0; i < yInput.length ; i++) {yUncInput.push(1)}};
    if (xNameInput.length === 0) {xNameInput = 'x'};
    if (yNameInput.length === 0) {yNameInput = 'y'};
    if (xUnitInput.length === 0) {xUnitInput = ''};
    if (yUnitInput.length === 0) {yUnitInput = ''};

    let eq = LinearRegs(xInput,yInput,yUncInput);
}

function ExampleLinear() {
    let xInput = [1,2,3];
    let yInput = [3,4.9,7];
    let yUncInput = [1,1,1];
    let xNameInput = 'r';
    let yNameInput = 'd';
    let xUnitInput = 'm';
    let yUnitInput = 'm';

    let eq = LinearRegs(xInput,yInput,yUncInput);
}



  function SumArray(arr) {
    let total = 0;
    for (let i = 0; i < arr.length ; i++) {
      total += arr[i];
    };
    return total;
  }

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









  function LinearRegs(x,y,yUnc) {

    // x = [float(f) for f in x]
    // y = [float(f) for f in y]
    // y_err = [float(f) for f in y_err]

    // axis = np.linspace(x[0],x[len(x)-1],len(x))
    // x_length = np.linspace(min(x),max(x),100)
    let n = x.length;
    let w = [];
    let xbarNum = 0;
    let ybarNum = 0;
    let D = 0;

    for (let i = 0 ; i < yUnc.length ; i++) {if (yUnc[i] !== 0) {w.push(yUnc[i]**(-2))} else {w.push(1)}};

    for (let i = 0 ; i < x.length ; i++) {
      xbarNum += w[i] * x[i];
      ybarNum += w[i] * y[i];
    }

    let xbar = xbarNum / SumArray(w);
    let ybar = ybarNum / SumArray(w);
    let m = 0;

    for (let i = 0 ; i < x.length ; i++) {
      D += w[i] * (x[i] - xbar)**2;
      m += w[i] * (x[i] - xbar) * y[i];
    }

    m *= (1/D);
    let c = ybar - m * xbar;
    //let d = [];
    let dSquareSum = 0;

    for (let i = 0 ; i < x.length ; i++) {
      //d.push( y[i] - m * x[i] - c);
      dSquareSum += w[i] * ( y[i] - m * x[i] - c)**2;
    }

    let mUnc = Math.sqrt( (1/D) * dSquareSum/(n-2));
    let cUnc = Math.sqrt( ( (1/n) + (xbar**2)/D ) * dSquareSum / (n-2) );

    // Ignore R2 for now
    console.log("y = [" + RoundUnc(m,mUnc) + "]x" + " + [" + RoundUnc(c,cUnc) + "]");

    //return "y = " + String(m) + "x + " + String(c);
    return [m,mUnc,c,cUnc];

  };

  //console.log(LinearRegs([1,2,3],[3,5,7.2],[1,1,1]));

  xInput = [1,2,3];
  yInput = [3,4.9,7];
  yUncInput = [1,1,1];
  xNameInput = 'r';
  yNameInput = 'd';
  xUnitInput = 'm';
  yUnitInput = 'm';

  fitParam = LinearRegs(xInput,yInput,yUncInput);
  console.log(fitParam);
  console.log([ xInput[0] , xInput[xInput.length-1]]);
  console.log([ fitParam[0] * xInput[0] + fitParam[2] , fitParam[0] * xInput[xInput.length-1] + fitParam[2] ]);

  let mStr = RoundUnc(fitParam[0],fitParam[1]);
  let cStr = RoundUnc(fitParam[2],fitParam[3]);

  console.log("~~~~~~~~");
  console.log(mStr);
  console.log(cStr);

  let titleStr = yNameInput + " = ["

  titleStr += mStr[0] + "+-" + mStr[1];

  titleStr += "]" + xNameInput + " + [";

  titleStr += cStr[0] + "+-" + cStr[1];

  titleStr += "]";

  var layout = {

    title: titleStr,
    xaxis: {
      showgrid: true,
      zeroline: true,
      showline: true,
      mirror: 'ticks',
      gridcolor: '#bdbdbd',
      gridwidth: 2,
      zerolinecolor: '#969696',
      zerolinewidth: 2,
      linecolor: '#636363',
      linewidth: 3,
      title: {
        text: xNameInput + " (" + xUnitInput + ")",
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
    },
    yaxis: {
      showgrid: true,
      zeroline: true,
      showline: true,
      mirror: 'ticks',
      gridcolor: '#bdbdbd',
      gridwidth: 2,
      zerolinecolor: '#969696',
      zerolinewidth: 2,
      linecolor: '#636363',
      linewidth: 3,
      title: {
        text: yNameInput + " (" + yUnitInput + ")",
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    }
  };

  //var data = [traceData,traceFit];
  //var data = traceData;
  //var data = traceFit;

  //Plotly.newPlot('myDiv', data, layout);

  var trace1 = {
      x: xInput,
      y: yInput,
      error_y: {
        type: 'data',
        array: yUncInput,
        visible: true
      },
      mode: 'markers',
      name: "Data",
      type: 'scatter'
    };

  var trace2 = {
      x: [ xInput[0] , xInput[xInput.length-1]],
      y: [ fitParam[0] * xInput[0] + fitParam[2] , fitParam[0] * xInput[xInput.length-1] + fitParam[2] ],
      linecolor: 'red',
      name: "Fit",
      type: 'lines'
  };

  var data = [trace1, trace2];

  Plotly.newPlot('myDiv', data,layout);
