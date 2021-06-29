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



  function diffPattern(lam,d,L,source) {

    let mMax = 0;
    let markerMax = 0;
    let intensity = [];
    let theta_m = 0;
    let y_m = [];
    let colour = [];
    let alpha_i = [];

    if (+lam === +lam) {
        /* check if it's a number */
        mMax = 10;
        markerMax = 15;

        let m = -mMax;

        while (m <= mMax) {
          
          theta_m = Math.asin(m * lam / d);
          y_m.push(L * Math.tan(theta_m));
          colour.push(wavelengthToRGB(lam));
          alpha_i.push(1);

          if (m === 0) {intensity.push(markerMax)}
          else {intensity.push(markerMax / (Math.abs(m)+1))}

          m += 1;
        }
      }
    else {
      // Assume it's a list
      for (let i = 0 ; i < lam.length ; i++) {
        mMax = 4;
        markerMax = 100;

        let m = -mMax;

        while (m <= mMax) {
          
          theta_m = Math.asin(m * lam[i] / d);
          y_m.push(L * Math.tan(theta_m));
          colour.push(wavelengthToRGB(lam[i]));

          if (m === 0) {intensity.push(markerMax); alpha_i.push(0.2)}
          else {intensity.push(markerMax * 0.9**(Math.abs(m))); alpha_i.push(0.2 * 0.7**(Math.abs(m)))};

          m += 1;
        }
      }
    }
    //return [ y_m , colour , intensity , alpha_i];

    let zeros = [];
    let colourStr = [];

    for (let i = 0 ; i < y_m.length ; i++) {
      zeros.push(0);
      colourStr.push('rgba(' + String(colour[i]) + ',' + alpha_i[i] + ')');
    };

    if (source === 'coherent') {plotPattern(y_m,zeros,colourStr,intensity);}
    else {plotIncoherentPattern(y_m,zeros,colourStr,intensity);};

  };

  function plotPattern(y_m,zeros,colours,intensity) {

    var trace1 = {
      x: y_m,
      y: zeros,
      mode: 'markers',
      name: "Data",
      type: 'scatter',
      marker: { size: intensity,
                color: colours,
                line: {color: 'black', width: 2},
       }
    };

    var data = [ trace1 ];

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
      }
    };

    Plotly.newPlot('screenDiv',data,layout);
  }



  function plotIncoherentPattern(y_m,zeros,colours,intensity) {

    var data = [];

    for (let i = 0 ; i < y_m.length ; i++) {
      
      let tempTrace = {
        x: [y_m[i] , y_m[i]],
        y: [-intensity[i]/100 , intensity[i]/100],
        mode: 'lines',
        line: {
          color: colours[i],
          width: 1200/intensity[i],
        },
      }
      data.push(tempTrace);
    }

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
      }
    };

    Plotly.newPlot('screenDiv',data,layout);
  }


  function processDataInput(d,L,wavelength) {
    d = Number(d) * 10**(-5);
    L = Number(L);
    let source = 'coherent';

    if (wavelength === 'incandescent') {wavelength = [450*10**(-9),480*10**(-9),510*10**(-9),540*10**(-9),570*10**(-9),600*10**(-9),630*10**(-9),660*10**(-9)]; source='incoherent';}
    else if (wavelength ==='fluorescent') {wavelength = [420*10**(-9),520*10**(-9),620*10**(-9)]; source = 'incoherent';}
    else {wavelength = Number(wavelength)*10**(-9);};

    diffPattern(wavelength,d,L,source);

  }
