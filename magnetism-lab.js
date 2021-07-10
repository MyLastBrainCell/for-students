
  function processSystemInput(sample,omegaZero,dist) {
    let muNaught = 1.257 * 10 **(-6);
    let mu = 25;
    let N = 200;
    // z = 8cm was roughly the lowest distance from memory
    let z = dist;
    //let B = 0.01;
    let B = (2 * muNaught * mu) / (4 * Math.PI * z**3)
    let r = 0.02;
    let A = Math.PI * r**2;

    let NBA = N * B * A;

    let emfPlot = [];
    let tPlot = [];
    let fitPlot = [];

    let t = 0;
    let dt = 1/sample;

    while (t < 5){

      tPlot.push(t);
      emfPlot.push( - omegaZero * Math.exp(-(1-dt/2) * t) * NBA * Math.sin( omegaZero * Math.exp(-(1-dt/2) * t) * t))
      
      t += dt;
    }

    plotData(tPlot,emfPlot);
  }

function plotData(t,emf) {

  var trace1 = {
    x: t,
    y: emf,
    mode: 'markers',
    name: "Data",
    type: 'scatter',
    marker: { size: 6,
              color: 'blue',
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
      title: {text: "Time (s)"},
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
      title: {text: "Voltage (V)"},
    }
  };

  Plotly.newPlot('myDiv',data,layout);
}


  function processPlotInput(sample,omegaZero,amp,omega) {
    let N = 200;
    let B = 0.01;
    let r = 0.02;
    let A = Math.PI * r**2;

    let NBA = N * B * A;

    let emfPlot = [];
    let tPlot = [];
    let fitPlot = [];

    let t = 0;
    let dt = 1/sample;

    while (t < 5){
      tPlot.push(t);
      emfPlot.push( - omegaZero * Math.exp(-(1-dt/2) * t) * NBA * Math.sin( omegaZero * Math.exp(-(1-dt/2) * t) * t))
      t += dt;
    }

    t = 0;
    dt = 0.001;
    tFit = [];

    while (t < 5){
      tFit.push(t);
      fitPlot.push( amp * Math.sin( omega * t) );
      t += dt;
    }

    //console.log(t);
    //console.log(emfPlot);
    plotPattern(tPlot,emfPlot,tFit,fitPlot);
  }

function plotPattern(t,emf,tFit,fit) {

  var trace1 = {
    x: t,
    y: emf,
    mode: 'markers',
    name: "Data",
    type: 'scatter',
    marker: { size: 6,
              color: 'blue',
     }
  };

  var trace2 = {
    x: tFit,
    y: fit,
    mode: 'lines',
    name: "Sine wave fit",
    lines: { linewidth: 3,
              linecolor: 'red',
     }
  };

  var data = [ trace1 , trace2 ];

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
      title: {text: "Time (s)"},
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
      title: {text: "Voltage (V)"},
    }
  };

  Plotly.newPlot('myDiv',data,layout);
}
