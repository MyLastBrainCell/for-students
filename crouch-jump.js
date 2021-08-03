      // Thank you to Daniel V. Schroeder for the base code!

      var theCanvas = document.getElementById("theCanvas");   // for drawing the projectile
      var theContext = theCanvas.getContext("2d");
      //var velCanvas = document.getElementById("velCanvas");   // for drawing the projectile
      //var velContext = velCanvas.getContext("2d");
      var x, y, vx, vy;                           // position and velocity
      var timer;                                  // for animation timing
      let theta = (Math.PI/180)*document.getElementById('thetaSlider').value;



      function drawProjectile() {
          theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
          //velContext.clearRect(0, 0, velCanvas.width, velCanvas.height);
          var legR = 35;
          var headR = 50;
          var footX = 329;
          var footY = 427;
        
          var kneeX = footX;
          var kneeY = footY - legR;
        
          var buttX = kneeX - legR*Math.cos(Math.PI/2 - theta);
          var buttY = kneeY - legR*Math.sin(Math.PI/2 - theta);
        
          var headX = footX;
          var headY = buttY - Math.sqrt(headR**2 - (headX - buttX)**2);

          theContext.beginPath();
          theContext.arc(footX, footY, 7, 0, 2*Math.PI);
          var theGradient = theContext.createRadialGradient(footX-1, footY-2, 1, footX, footY, 5);
          theGradient.addColorStop(0, "#ffd0d0");
          theGradient.addColorStop(1, "#ff0000");
          theContext.fillStyle = theGradient;
          theContext.fill();

          theContext.beginPath();
          theContext.arc(kneeX, kneeY, 7, 0, 2*Math.PI);
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

      function updateCoords() {
        drawProjectile();
        document.getElementById('cartPos').innerHTML = '\\( \\theta_i = ' + Math.round(document.getElementById('thetaSlider').value) + '^{o} \\)';
        theta = (Math.PI/180)*document.getElementById('thetaSlider').value;
        MathJax.typeset();
       
      }
      
        drawProjectile();
      
      

