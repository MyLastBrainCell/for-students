  function processSeparationInput(r) {
    r = Number(r);
    let xCharge = 0;
    let xDipole = r;
    let F = 0;
    let lineWidth = 2;
    let arrowSize = 10;

    if (r===0.112) {F = 0.1 * (2.25/2.25); lineWidth = 6; arrowSize = 15;}
    else if (r===0.122) {F = 0.1 * (1.75/2.25); lineWidth = 5; arrowSize = 14;}
    else if (r===0.132) {F = 0.1 * (1.10/2.25); lineWidth = 4; arrowSize = 13;}
    else if (r===0.142) {F = 0.1 * (0.85/2.25); lineWidth = 3; arrowSize = 12;}
    else if (r===0.152) {F = 0.1 * (0.50/2.25); lineWidth = 2; arrowSize = 11;}
    else if (r===0.162) {F = 0.1 * (0.33/2.25); lineWidth = 1; arrowSize = 10;};

    var trace1 = {
      x: [xCharge],
      y: [0],
      mode: 'markers',
      name: "Point Charge",
      marker: { size: 5,
              color: 'black',
       },
    };

    var trace2 = {
      x: [xDipole,xDipole - F],
      y: [0,0],
      mode: 'line',
      name: " ",
      type: 'scatter',
      line: {width: lineWidth, color: 'red',},
    };

    var trace3 = {
      x: [xDipole - F/2],
      y: [0],
      mode: 'markers+text',
      name: " ",
      type: 'scatter',
      marker: {size: 1, color: 'red',},
      text: ["F +- 10^(5)N"],
      textposition: "top",
      textfont:{'family': "Times", 'size': [20], 'color': ["red"]},
    };

    var trace4 = {
      x: [xDipole - F],
      y: [0],
      mode: 'markers',
      name: 'Force',
      marker: {size: arrowSize, 
               symbol: 'triangle-left',
               color: 'red',
       },
    };


    var trace5 = {
      x: [xDipole],
      y: [0],
      mode: 'markers',
      name: "Induced dipole",
      marker: { size: 15,
              color: 'black',
       },
    };

    var trace6 = {
      x: [0.003],
      y: [0.25],
      mode: 'markers',
      name: ' ',
      marker: {size: 10, 
               symbol: 'triangle-left',
               color: 'black',
       },
    };

    var trace7 = {
      x: [xDipole-0.003],
      y: [0.25],
      mode: 'markers',
      name: ' ',
      marker: {size: 10, 
               symbol: 'triangle-right',
               color: 'black',
       },
    };

    var trace8 = {
      x: [0.003,xDipole-0.003],
      y: [0.25,0.25],
      mode: 'lines',
      name: "r",
      text: ["r"],
      line: {color: 'black'},
      type: 'scatter',
    };

    var trace9 = {
      x: [xDipole/2],
      y: [0.25],
      mode: 'markers+text',
      name: "r",
      text: ["r +- 0.001 m"],
      marker: {size: 3, color: 'black'},
      textposition: "top",
      textfont:{'family': "Times", 'size': [20], 'color': ["black"]},
      type: 'scatter',
    };

    let dipoleData = [ trace1 , trace2 , trace3 , trace4 , trace5 , trace6 , trace7 , trace8 , trace9 ]


    var dipoleLayout = {

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
        range: [-0.03, 0.2],
        title: {
          text: "x (m)",
        }
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
        range: [-0.5, 0.5],
        title: {
          text: "y (m)",
        }
      }
    };


    
    

    Plotly.newPlot('dipoleDiv',dipoleData,dipoleLayout);

  }
