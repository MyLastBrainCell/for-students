function singleWire(px) {
  let muNaught = 1.257 * 10 **(-6);
  let mu = 25;
  let dist = (px - 180) * 10**(-3);

  return Math.round( 1000*100*( dist**(-3) - (dist-0.05)**(-3) ) * (muNaught * mu) / (2 * Math.PI) )/100
}

function sumWire(px) {

  let total = 0;
  for (let i = 280; i <= px ; i+=10) {
    total += singleWire(i);
  }

  return Math.round(total*100)/100
}
