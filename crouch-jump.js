      var theCanvas = document.getElementById("theCanvas");   // for drawing the projectile
      var theContext = theCanvas.getContext("2d");
      var timer;                                  // for animation timing
      let thetaInitialDeg = document.getElementById('thetaSlider').value;
      let thetaInitial = (Math.PI/180)*thetaInitialDeg;
      let thetaCurrentDeg = document.getElementById('thetaSlider').value;
      let thetaCurrent = (Math.PI/180)*thetaCurrentDeg;

      let runSim = 'off';
      let iterProtect = 0;

      const footXInitial = 329;
      const footYInitial = 427;
      let footX = 329;
      let footY = 427;

      let dTheta = 2;
      let vel = 0;
      let dt = 10/1000;
      let clickable = true;

      let accelPush = -22 / dt;
      let accelGrav = 9.8 / dt;
      let accel = accelPush + accelGrav;

      function drawProjectile(theta) {
          theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
          //velContext.clearRect(0, 0, velCanvas.width, velCanvas.height);
          var legR = 35;
          var headR = 60;
        
          var kneeX = footX + legR*Math.sin(theta/2);
          var kneeY = footY - legR*Math.cos(theta/2);
        
          var buttX = kneeX - legR*Math.cos(Math.PI/2 - theta);
          var buttY = kneeY - legR*Math.sin(Math.PI/2 - theta);
        
          var headX = (buttX + kneeX)/2;
          var headY = buttY - Math.sqrt(headR**2 - (headX - buttX)**2);

          theContext.beginPath();
          theContext.arc(footX, footY, 6, 0, 2*Math.PI);
          var theGradient = theContext.createRadialGradient(footX-1, footY-2, 1, footX, footY, 5);
          theGradient.addColorStop(0, "#ffd0d0");
          theGradient.addColorStop(1, "#ff0000");
          theContext.fillStyle = theGradient;
          theContext.fill();

          theContext.beginPath();
          theContext.arc(kneeX, kneeY, 5, 0, 2*Math.PI);
          var theGradient = theContext.createRadialGradient(kneeX-1, kneeY-2, 1, kneeX, kneeY, 5);
          theGradient.addColorStop(0, "#ffd0d0");
          theGradient.addColorStop(1, "#ff0000");
          theContext.fillStyle = theGradient;
          theContext.fill();

          theContext.beginPath();
          theContext.arc(buttX, buttY, 7, 0, 2*Math.PI);
          var theGradient = theContext.createRadialGradient(buttX-1, buttY-2, 1, buttX, buttY, 5);
          theGradient.addColorStop(0, "#ffd0d0");
          theGradient.addColorStop(1, "#ff0000");
          theContext.fillStyle = theGradient;
          theContext.fill();
        
          theContext.beginPath();
          theContext.arc(headX, headY, 7, 0, 2*Math.PI);
          var theGradient = theContext.createRadialGradient(headX-1, headY-2, 1, headX, headY, 5);
          theGradient.addColorStop(0, "#ffd0d0");
          theGradient.addColorStop(1, "#ff0000");
          theContext.fillStyle = theGradient;
          theContext.fill();
        
          theContext.beginPath();
          theContext.moveTo(80, headY-7);
          theContext.lineTo(580, headY-7);
          theContext.stroke();
        
          theContext.beginPath();
          theContext.moveTo(footX, footY);
          theContext.lineTo(kneeX, kneeY);
          theContext.lineTo(buttX, buttY);
          theContext.lineTo(headX, headY);
          theContext.stroke();
        
      }

      // Clear the trails from the image:
      function clearTrails() {
          trailContext.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      }

      function updateCoords(angle) {
        thetaCurrentDeg = angle;
        thetaCurrent = (Math.PI/180)*angle;
        //console.log('current is ' + String(thetaCurrentDeg));
        angle = (Math.PI/180)*angle;
        drawProjectile(angle);
      }

      function raiseBody() {
        angle = Math.round(thetaCurrentDeg);
        iterProtect += 1;
        
        if (Math.round(footY*10)/10 !== Math.round(footYInitial*10)/10) {accel = 0};
            
        if (Math.round(angle*10)/10 !== 0 && runSim === 'up') {
          dTheta *= 1.05;
          angle -= dTheta;

          if (angle < 0) {angle = 0};

          vel += accel*dt;
          updateCoords(angle);

          console.log('angle ' + String(angle));
          console.log('acceleration: ' + String(accel));
          console.log('velocity: ' + String(vel));
          console.log('dist travelled: ' + String(vel*dt));
          console.log('\n\n');
        }
        else if (Math.round((angle-dTheta)*10)/10 <= 0 && runSim !== 'resetting' && runSim !== 'off') {
          accel = accelGrav;
          vel += accel*dt;

          if (Math.round(vel*10)/10 > 0 && runSim === 'up') {footY -= vel*dt; updateCoords(0)}
          else if (Math.round(vel*10)/10 < 0 || (footY < footYInitial && runSim === 'down')) {console.log('B'); runSim = 'down'; footY += vel*dt /*previously += 2*/; updateCoords(0)}
          else if (Math.round(footYInitial*10)/10 === footYInitial && runSim === 'down') {console.log('B'); accel = -10; runSim = 'resetting'; updateCoords(0)}

        }
        else if (runSim === 'resetting' && (angle - thetaInitialDeg) <= 0) {
          dTheta /= 1.05;
          angle += dTheta;
          updateCoords(angle);
        }
        else {thetaCurrentDeg = thetaInitialDeg; angle = thetaInitialDeg; runSim = 'off'; footX = 329; footY = 427; dTheta = 1;};
      }

      
        drawProjectile(thetaInitial);

    function registerClick() {

      if (clickable) {
        clickable = false;
        runSim = 'off';
        iterProtect = 0;

        footX = 329; 
        footY = 427;

        dTheta = 1;

        iterProtect = 0;
        runSim = 'up';
        accel = accelPush + accelGrav;
        vel = 0;

        thetaInitialDeg = document.getElementById('thetaSlider').value;
        thetaInitial = (Math.PI/180)*thetaInitialDeg;
        thetaCurrentDeg = document.getElementById('thetaSlider').value;
        thetaCurrent = (Math.PI/180)*thetaCurrentDeg;


        const id = setInterval(function() {
          thetaInitialDeg = document.getElementById('thetaSlider').value;
          thetaInitial = (Math.PI/180)*thetaInitialDeg;
          if ( (Math.round(thetaCurrentDeg * 10)/10 !== Math.round(thetaInitialDeg * 10)/10 || runSim !== 'off') && iterProtect < 300) {raiseBody();}
          
          else {
            clearInterval(id);
            clickable = true;
            }
        }, dt*1000); 
      }
    }
