  function wavelengthToRGB(wavelength) {
    //Based on code by Dan Bruton http://www.physics.sfasu.edu/astro/color/spectra.html

    wavelength *= 10**(9);

    const gamma = 0.8;
    let attenuation = 0;
    let R = 0.0;
    let G = 0.0;
    let B = 0.0;

    if (wavelength >= 380 && wavelength <= 440) {
      attenuation = 0.3 + 0.7 * (wavelength - 380) / (440 - 380);
      R = ((-(wavelength - 440) / (440 - 380)) * attenuation) ** gamma;
      G = 0.0;
      B = (1.0 * attenuation) ** gamma;
    }
    else if (wavelength >= 440 && wavelength <= 490) {
      R = 0.0;
      G = ((wavelength - 440) / (490 - 440)) ** gamma;
      B = 1.0;
    }
    else if (wavelength >= 490 && wavelength <= 510) {
      R = 0.0;
      G = 1.0;
      B = (-(wavelength - 510) / (510 - 490)) ** gamma;
    }
    else if (wavelength >= 510 && wavelength <= 580) {
      R = ((wavelength - 510) / (580 - 510)) ** gamma;
      G = 1.0;
      B = 0.0;
    }
    else if (wavelength >= 580 && wavelength <= 645) {
      R = 1.0;
      G = (-(wavelength - 645) / (645 - 580)) ** gamma;
      B = 0.0;
    }
    else if (wavelength >= 645 && wavelength <= 750) {
      attenuation = 0.3 + 0.7 * (750 - wavelength) / (750 - 645);
      R = (1.0 * attenuation) ** gamma;
      G = 0.0;
      B = 0.0;
    }
    else {let R = 0.0; let G = 0.0; let B = 0.0;}

      
    return [Math.round(255*R), Math.round(255*G), Math.round(255*B)]
  }



  function diffPattern(lam,d,L) {

    let mMax = 0;
    let markerMax = 0;
    let theta_m = 0;
    let y_m = [];

    mMax = 10;
    markerMax = 15;

    let m = -mMax;

    while (m <= mMax) {
      
      theta_m = Math.asin(m * lam / d);
      y_m.push(L * Math.tan(theta_m));

      m += 1;
    }
    
    return y_m;
  };




  function processInput(xGrating,xScreen,wavelength) {
    xGrating = Number(xGrating);
    xScreen = Number(xScreen);
    let L = xScreen - xGrating;
    let d = 10**(-5);
    let screenHeight = 0.6;

    wavelength = Number(wavelength)*10**(-9);
    let colourStr = 'rgb(' + String(wavelengthToRGB(wavelength)) + ')';

    let pattern = diffPattern(wavelength,d,L);

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

    let data = [ trace1 , trace2 , trace3 , trace4 , trace5 , trace6 , trace7 ]


    var layout = {

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


    
    

    Plotly.newPlot('opticalElementDiv',data,layout);

  }
