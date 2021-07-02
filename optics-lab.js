function pmPercent(value,percent) {
    percent *= 0.01;
    if (Math.random() >= 0.5) {return value * (1 - percent * Math.random())}
    else {return value * (1 + percent * Math.random())}  
}

function wavelengthToRGB(traceWavelength) {
    //Based on code by Dan Bruton http://www.physics.sfasu.edu/astro/color/spectra.html

    traceWavelength *= 10**(9);

    const gamma = 0.8;
    let attenuation = 0;
    let R = 0.0;
    let G = 0.0;
    let B = 0.0;

    if (traceWavelength >= 380 && traceWavelength <= 440) {
      attenuation = 0.3 + 0.7 * (traceWavelength - 380) / (440 - 380);
      R = ((-(traceWavelength - 440) / (440 - 380)) * attenuation) ** gamma;
      G = 0.0;
      B = (1.0 * attenuation) ** gamma;
    }
    else if (traceWavelength >= 440 && traceWavelength <= 490) {
      R = 0.0;
      G = ((traceWavelength - 440) / (490 - 440)) ** gamma;
      B = 1.0;
    }
    else if (traceWavelength >= 490 && traceWavelength <= 510) {
      R = 0.0;
      G = 1.0;
      B = (-(traceWavelength - 510) / (510 - 490)) ** gamma;
    }
    else if (traceWavelength >= 510 && traceWavelength <= 580) {
      R = ((traceWavelength - 510) / (580 - 510)) ** gamma;
      G = 1.0;
      B = 0.0;
    }
    else if (traceWavelength >= 580 && traceWavelength <= 645) {
      R = 1.0;
      G = (-(traceWavelength - 645) / (645 - 580)) ** gamma;
      B = 0.0;
    }
    else if (traceWavelength >= 645 && traceWavelength <= 750) {
      attenuation = 0.3 + 0.7 * (750 - traceWavelength) / (750 - 645);
      R = (1.0 * attenuation) ** gamma;
      G = 0.0;
      B = 0.0;
    }
    else {let R = 0.0; let G = 0.0; let B = 0.0;}

      
    return [Math.round(255*R), Math.round(255*G), Math.round(255*B)]
  }



  function diffPattern(traceWavelength,d,inputL,source) {

    let mMax = 0;
    let markerMax = 0;
    let intensity = [];
    let theta_m = 0;
    let y_m = [];
    let colour = [];
    let alpha_i = [];

    if (+traceWavelength === +traceWavelength) {
        /* check if it's a number */
        mMax = 10;
        markerMax = 15;

        let m = -mMax;

        while (m <= mMax) {
          
          theta_m = Math.asin(m * traceWavelength / d);
          //y_m.push(L * Math.tan(theta_m));
          y_m.push( pmPercent(inputL * Math.tan(theta_m),5) );
          colour.push(wavelengthToRGB(traceWavelength));
          alpha_i.push(1);

          if (m === 0) {intensity.push(markerMax)}
          else {intensity.push(markerMax / (Math.abs(m)+1))}

          m += 1;
        }
      }
    else {
      // Assume it's a list
      for (let i = 0 ; i < traceWavelength.length ; i++) {
        mMax = 4;
        markerMax = 100;

        let m = -mMax;

        while (m <= mMax) {
          
          theta_m = Math.asin(m * traceWavelength[i] / d);
          y_m.push(inputL * Math.tan(theta_m));
          colour.push(wavelengthToRGB(traceWavelength[i]));

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

    var trace21 = {
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

    var data = [ trace21 ];

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


  function processDataInput(d,inputL,traceWavelength) {
    d = Number(d) * 10**(-5);
    inputL = Number(inputL);
    let source = 'coherent';

    if (traceWavelength === 'incandescent') {traceWavelength = [450*10**(-9),480*10**(-9),510*10**(-9),540*10**(-9),570*10**(-9),600*10**(-9),630*10**(-9),660*10**(-9)]; source='incoherent';}
    else if (traceWavelength === 'fluorescent') {traceWavelength = [420*10**(-9),520*10**(-9),620*10**(-9)]; source = 'incoherent';}
    else {traceWavelength = Number(traceWavelength)*10**(-9);};

    diffPattern(traceWavelength,d,inputL,source);

  }
