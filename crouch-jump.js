      // Thank you to Daniel V. Schroeder for the base code!

      var theCanvas = document.getElementById("theCanvas");   // for drawing the projectile
      var theContext = theCanvas.getContext("2d");
      //var velCanvas = document.getElementById("velCanvas");   // for drawing the projectile
      //var velContext = velCanvas.getContext("2d");
      var x, y, vx, vy;                           // position and velocity
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

      let dTheta = 1;

      function drawProjectile(theta) {
          theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
          //velContext.clearRect(0, 0, velCanvas.width, velCanvas.height);
          var legR = 35;
          var headR = 50;
        
          var kneeX = footX;
          var kneeY = footY - legR;
        
          var buttX = kneeX - legR*Math.cos(Math.PI/2 - theta);
          var buttY = kneeY - legR*Math.sin(Math.PI/2 - theta);
        
          var headX = footX;
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
        console.log('current is ' + String(thetaCurrentDeg));
        angle = (Math.PI/180)*angle;
        drawProjectile(angle);
      }

      function raiseBody() {
        angle = Math.round(thetaCurrentDeg);
        iterProtect += 1;
        dTheta *= 1.1;    
            
        if (Math.round(angle*10)/10 !== 0 && runSim === 'up') {
          angle -= dTheta;
          updateCoords(angle);
        }
        else if (Math.round((angle-dTheta)*10)/10 <= 0 && runSim !== 'resetting' && runSim !== 'off') {
          if (footY >= 330 && runSim === 'up') {footY -= 2; updateCoords(0)}
          else if (footY <= 330 || (footY < footYInitial && runSim === 'down')) {runSim = 'down'; footY += 2; updateCoords(0)}
          else if (footY >= footYInitial && runSim === 'down') {console.log('please die'); runSim = 'resetting'; updateCoords(0)}
        }
        else if (runSim === 'resetting' && Math.round(angle) !== Math.round(thetaInitialDeg)) {
          console.log('yas!');
          console.log(angle);
          angle += dTheta;
          updateCoords(angle);
        }
        else {runSim = 'off'};
      }

      function dropBody() {
        angle = Math.round(thetaCurrentDeg);
        if (Math.round(angle*10)/10 !== thetaInitialDeg) {
          angle += 1;
          updateCoords(angle);
          console.log(angle);
        }
      }
      
        drawProjectile(thetaInitial);

    function registerClick() {
      iterProtect = 0;
      runSim = 'up';
      console.log('registerClick() with ' + String(document.getElementById('thetaSlider').value))
      const id = setInterval(function() {
        if ( (Math.round(thetaCurrentDeg) !== thetaInitialDeg || runSim !== 'off') && iterProtect < 300) {raiseBody();}
        else {
          clearInterval(id);
          }
      }, 20); 
    }
