function projectedWavelengthToRGB(projectedWavelength) {
    //Based on code by Dan Bruton http://www.physics.sfasu.edu/astro/color/spectra.html

    projectedWavelength *= 10**(9);

    const gamma = 0.8;
    let attenuation = 0;
    let R = 0.0;
    let G = 0.0;
    let B = 0.0;

    if (projectedWavelength >= 380 && projectedWavelength <= 440) {
      attenuation = 0.3 + 0.7 * (projectedWavelength - 380) / (440 - 380);
      R = ((-(projectedWavelength - 440) / (440 - 380)) * attenuation) ** gamma;
      G = 0.0;
      B = (1.0 * attenuation) ** gamma;
    }
    else if (projectedWavelength >= 440 && projectedWavelength <= 490) {
      R = 0.0;
      G = ((projectedWavelength - 440) / (490 - 440)) ** gamma;
      B = 1.0;
    }
    else if (projectedWavelength >= 490 && projectedWavelength <= 510) {
      R = 0.0;
      G = 1.0;
      B = (-(projectedWavelength - 510) / (510 - 490)) ** gamma;
    }
    else if (projectedWavelength >= 510 && projectedWavelength <= 580) {
      R = ((projectedWavelength - 510) / (580 - 510)) ** gamma;
      G = 1.0;
      B = 0.0;
    }
    else if (projectedWavelength >= 580 && projectedWavelength <= 645) {
      R = 1.0;
      G = (-(projectedWavelength - 645) / (645 - 580)) ** gamma;
      B = 0.0;
    }
    else if (projectedWavelength >= 645 && projectedWavelength <= 750) {
      attenuation = 0.3 + 0.7 * (750 - projectedWavelength) / (750 - 645);
      R = (1.0 * attenuation) ** gamma;
      G = 0.0;
      B = 0.0;
    }
    else {let R = 0.0; let G = 0.0; let B = 0.0;}

      
    return [Math.round(255*R), Math.round(255*G), Math.round(255*B)]
  }



  function diffPattern(projectedWavelength,d,calculatedL) {

    let mMax = 0;
    let markerMax = 0;
    let theta_m = 0;
    let y_m = [];

    mMax = 10;
    markerMax = 15;

    let m = -mMax;

    while (m <= mMax) {
      
      theta_m = Math.asin(m * projectedWavelength / d);
      y_m.push(calculatedL * Math.tan(theta_m));

      m += 1;
    }
    
    return y_m;
  };




  function processSetupInput(xGrating,xScreen,projectedWavelength) {
    xGrating = Number(xGrating);
    xScreen = Number(xScreen);
    let calculatedL = xScreen - xGrating;
    let d = 10**(-5);
    let screenHeight = 0.6;

    projectedWavelength = Number(projectedWavelength)*10**(-9);
    let colourStr = 'rgb(' + String(projectedWavelengthToRGB(projectedWavelength)) + ')';

    let pattern = diffPattern(projectedWavelength,d,calculatedL);

    let xPattern = [];
    let yPattern = [];

    for (let i = 0 ; i < pattern.length ; i++) {
      if (Math.abs(pattern[i]) < screenHeight) {xPattern.push(xGrating); xPattern.push(xScreen); yPattern.push(0); yPattern.push(pattern[i]);};
    };

    var trace1 = {
      x: [0,0],
      y: [-0.1,0.1],
      mode: 'lines',
      name: "Laser",
      line: { width: 10,
              color: 'black',
       },
    };

    var trace2 = {
      x: [0.15,0.15],
      y: [-0.2,0.2],
      mode: 'lines',
      name: "Collimator",
      line: { width: 3,
              color: 'black',
       },
    };
  
    var trace3 = {
      x: [xGrating],
      y: [0],
      mode: 'markers',
      name: "Diffraction grating base",
      type: 'scatter',
      marker: { size: 50,
                color: 'black',
       }
    };

    var trace4 = {
      x: [xGrating,xGrating],
      y: [-0.1,0.1],
      mode: 'lines',
      name: "Diffraction grating",
      line: { width: 5,
              color: 'grey',
       }
    };

    var trace5 = {
      x: [xScreen,xScreen],
      y: [-screenHeight,screenHeight],
      mode: 'lines',
      name: "Screen",
      line: { width: 3,
              color: 'black',
       },
    };

    var trace6 = {
      x: [0,xScreen],
      y: [0,0],
      mode: 'lines',
      name: "y=0",
      line: { width: 3,
              color: colourStr,
       },
    };
    
    var trace7 = {
      x: xPattern,
      y: yPattern,
      mode: 'lines',
      name: "y_m",
      line: { width: 3,
              color: colourStr,
       },
    };

    var trace8 = {
      x: [xGrating,xScreen],
      y: [0.75,0.75],
      mode: 'lines',
      name: " ",
      line: { width: 3,
              color: 'black',
       },
    };

    var trace9 = {
      x: [xGrating],
      y: [0.75],
      mode: 'markers',
      name: ' ',
      marker: {size: 10, 
               symbol: 'triangle-left',
               color: 'black',
       },
    };

    var trace10 = {
      x: [xScreen],
      y: [0.75],
      mode: 'markers',
      name: ' ',
      marker: {size: 10, 
               symbol: 'triangle-right',
               color: 'black',
       },
    };

    var trace11 = {
      x: [(xGrating + xScreen)/2],
      y: [0.75],
      mode: 'markers+text',
      name: "L",
      text: ["L"],
      textposition: "top",
      textfont:{'family': "Times", 'size': [25], 'color': ["black"]},
      type: 'scatter',
    };

    let projectionData = [ trace1 , trace2 , trace3 , trace4 , trace5 , trace6 , trace7 , trace8 , trace9 , trace10 , trace11]


    var projectionLayout = {

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
        range: [-0.3, 4],
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
        range: [-1, 1],
      }
    };


    
    

    Plotly.newPlot('opticalElementDiv',projectionData,projectionLayout);

  }
