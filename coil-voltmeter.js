function singleWire(px) {
  let muNaught = 1.257 * 10 **(-6);
  let mu = 25;
  let dist = (px - 180) * 10**(-3);

  return Math.round( 10000*( dist**(-3) - (dist-0.05)**(-3) ) * (muNaught * mu) / (2 * Math.PI) )/10000
}

function sumWire(px) {

  let total = 0;
  for (let i = 280; i <= px ; i++) {
    //console.log('i = ' + String(i));
    //console.log('singleWire() = ' + String(singleWire(i)));
    total += singleWire(i);
    //console.log('new total = ' + String(total));
  }

  return Math.round(total*10000)/10000
}
