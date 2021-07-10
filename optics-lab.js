function pmPercent(value,percent) {
    console.log('pmPercent called');
    percent *= 0.01;
    if (Math.random() >= 0.5) {return value * (1 - percent * Math.random())}
    else {return value * (1 + percent * Math.random())}  
}

function wavelengthToRGB(projectionWavelength) {
    //Based on code by Dan Bruton http://www.physics.sfasu.edu/astro/color/spectra.html
    
    console.log('wavelengthToRGB called');

    projectionWavelength *= 10**(9);

    const gamma = 0.8;
    let attenuation = 0;
    let R = 0.0;
    let G = 0.0;
    let B = 0.0;

    if (projectionWavelength >= 380 && projectionWavelength <= 440) {
      attenuation = 0.3 + 0.7 * (projectionWavelength - 380) / (440 - 380);
      R = ((-(projectionWavelength - 440) / (440 - 380)) * attenuation) ** gamma;
      G = 0.0;
      B = (1.0 * attenuation) ** gamma;
    }
    else if (projectionWavelength >= 440 && projectionWavelength <= 490) {
      R = 0.0;
      G = ((projectionWavelength - 440) / (490 - 440)) ** gamma;
      B = 1.0;
    }
    else if (projectionWavelength >= 490 && projectionWavelength <= 510) {
      R = 0.0;
      G = 1.0;
      B = (-(projectionWavelength - 510) / (510 - 490)) ** gamma;
    }
    else if (projectionWavelength >= 510 && projectionWavelength <= 580) {
      R = ((projectionWavelength - 510) / (580 - 510)) ** gamma;
      G = 1.0;
      B = 0.0;
    }
    else if (projectionWavelength >= 580 && projectionWavelength <= 645) {
      R = 1.0;
      G = (-(projectionWavelength - 645) / (645 - 580)) ** gamma;
      B = 0.0;
    }
    else if (projectionWavelength >= 645 && projectionWavelength <= 750) {
      attenuation = 0.3 + 0.7 * (750 - projectionWavelength) / (750 - 645);
      R = (1.0 * attenuation) ** gamma;
      G = 0.0;
      B = 0.0;
    }
    else {let R = 0.0; let G = 0.0; let B = 0.0;}

      
    return [Math.round(255*R), Math.round(255*G), Math.round(255*B)]
  }



  function diffPattern(projectionWavelength,d,inputL,source) {
      
    console.log("diffPattern called");

    let mMax = 0;
    let markerMax = 0;
    let intensity = [];
    let theta_m = 0;
    let y_m = [];
    let colour = [];
    let alpha_i = [];

    if (+projectionWavelength === +projectionWavelength) {
        /* check if it's a number */
        mMax = 10;
        markerMax = 15;

        let m = -mMax;

        while (m <= mMax) {
          
          theta_m = Math.asin(m * projectionWavelength / d);
          //y_m.push(L * Math.tan(theta_m));
          y_m.push( pmPercent(inputL * Math.tan(theta_m),5) );
          colour.push(wavelengthToRGB(projectionWavelength));
          alpha_i.push(1);

          if (m === 0) {intensity.push(markerMax)}
          else {intensity.push(markerMax / (Math.abs(m)+1))}

          m += 1;
        }
      }
    else {
      // Assume it's a list     
      for (let i = 0 ; i < projectionWavelength.length ; i++) {
        mMax = 4;
        markerMax = 100;

        let m = -mMax;

        while (m <= mMax) {
          
          theta_m = Math.asin(m * projectionWavelength[i] / d);
          y_m.push(inputL * Math.tan(theta_m));
          colour.push(wavelengthToRGB(projectionWavelength[i]));

          if (m === 0) {intensity.push(markerMax); alpha_i.push(0.3)}
          else {intensity.push(markerMax * 0.9**(Math.abs(m))); alpha_i.push(0.3 * 0.7**(Math.abs(m)))};

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
      
    console.log('plotPattern called');

    var trace21 = {
      x: y_m,
      y: zeros,
      mode: 'markers',
      name: "projectionData",
      type: 'scatter',
      showlegend: false,
      marker: { size: intensity,
                color: colours,
                line: {color: 'black', width: 2},
       }
    };

    var projectionData = [ trace21 ];

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

    Plotly.newPlot('projectionDiv',projectionData,projectionLayout);
  }



  function plotIncoherentPattern(y_m,zeros,colours,intensity) {
      
    console.log('plotIncoherentPattern called');

    var projectionData = [];
      
    y_m.push(0);
    intensity.push(100);
    colours.push('white');

    for (let i = 0 ; i < y_m.length ; i++) {
      
      let tempTrace = {
        x: [y_m[i] , y_m[i]],
        y: [-intensity[i]/100 , intensity[i]/100],
        mode: 'lines',
        showlegend: false,
        line: {
          color: colours[i],
          width: 1200/intensity[i],
        },
      }
      projectionData.push(tempTrace);
    }

    var projectionLayout = {
      plot_bgcolor:"black",
      paper_bgcolor:"#FFF3",
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

    Plotly.newPlot('whiteLightDiv',projectionData,projectionLayout);
  }


  function processProjectionDataInput(d,inputL,projectionWavelength) {
    console.log('processProjectionDataInput called');
      
    d = Number(d) * 10**(-5);
    inputL = Number(inputL);
    let source = 'coherent';

    if (projectionWavelength === 'incandescent') {projectionWavelength = [450*10**(-9),465*10**(-9),480*10**(-9),495*10**(-9),510*10**(-9),525*10**(-9),540*10**(-9),555*10**(-9),570*10**(-9),585*10**(-9),600*10**(-9),615*10**(-9),630*10**(-9),645*10**(-9),660*10**(-9)]; source='incoherent';}
    else if (projectionWavelength === 'fluorescent') {projectionWavelength = [420*10**(-9),520*10**(-9),620*10**(-9)]; source = 'incoherent';}
    else if (projectionWavelength === 'blank') {
       
       console.log('blank plot to be produced');
        
       let trace1 = {
        x: [0],
        y: [0],
        mode: 'markers',
        showlegend: false,
        marker: {
          color: 'black',
          size: 1,
        },
      }
      
      var projectionLayout = {
          plot_bgcolor:"black",
          paper_bgcolor:"#FFF3",
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
        
        let emptyData = [ trace1 ];

        Plotly.newPlot('whiteLightDiv',emptyData,projectionLayout);
    
    }
      
    else {projectionWavelength = Number(projectionWavelength)*10**(-9);};

    diffPattern(projectionWavelength,d,inputL,source);

  }
