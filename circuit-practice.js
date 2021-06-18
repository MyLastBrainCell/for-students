function getInputValue(){
    // Selecting the input element and get its value 

    /*
    let V = document.getElementById("batteryVoltage").value;
    let RA = document.getElementById("resA").value;
    let RB = document.getElementById("resB").value;
    let RC = document.getElementById("resC").value;
    let circuitSwitch = document.getElementById("circuitSwitch").value;
    let lampMinCurrent = document.getElementById("lampMinCurrent").value;

    if (V.length === 0) {V = 12};
    if (RA.length === 0) {RA = 5};
    if (RB.length === 0) {RB = 8};
    if (RC.length === 0) {RC = 1};
    if (circuitSwitch !== 'open' && circuitSwitch !== 'closed') {xNameInput = 'open'};
    if (lampMinCurrent.length === 0) {yNameInput = 0.05};
    */

    let V = 12;
    let RA = 5;
    let RB = 8;
    let RC = 1;
    let circuitSwitch = "open";
    let lampMinCurrent = 0.05;

    //let lampStates = GetLampState(Voltage,RA,RB,circuitSwitch,LampMinCurrent);
    let lampStates = [1,1,0];
    let filePath = 's/' + imgMatcher(lampStates,circuitSwitch);
    document.getElementById("circuitImg").src = filePath;
}

function resetBox() {document.getElementById("circuitImg").src = "https://hosting.photobucket.com/images/i/MyLastBrainCell/circuit-closed-left.png"}

function GetLampState(Voltage,RA,RB,circuitSwitch,lampMinCurrent) {

  if (circuitSwitch === 'open') {
    let currentA = Voltage / RA;

    if (currentA >= lampMinCurrent) { return [1,0,0]}
    else {return [0,0,0]};
  } else if (circuitSwitch === 'closed') {
    let currentA = Voltage / RA;
    let currentB = Voltage / RB;

    if (currentA >= lampMinCurrent && currentB >= lampMinCurrent) {return [1,1,0]}
    else if (currentA >= lampMinCurrent && currentB < lampMinCurrent) {return [1,0,0]}
    else if (currentA < lampMinCurrent && currentB >= lampMinCurrent) {return [0,1,0]}
    else {return [0,0,0]};
  }
}

function imgMatcher(lampStates,circuitSwitch) {

  if (lampStates === [0,0,0] && circuitSwitch === 'open') {return "circuit-open-none.png"}
  else if (lampStates === [0,0,0] && circuitSwitch === 'closed') {return "circuit-closed-0.png"}
  else if (lampStates === [1,0,0] && circuitSwitch === 'closed') {return "circuit-closed-left.png"}
  else if (lampStates === [1,0,0] && circuitSwitch === 'open') {return "circuit-open-left.png"}
  else if (lampStates === [0,1,0] && circuitSwitch === 'closed') {return "circuit-closed-middle.png"}
  else if (lampStates === [1,1,0] && circuitSwitch === 'closed') {return "circuit-closed-2.png"}
}
