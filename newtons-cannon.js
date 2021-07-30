        var theCanvas = document.getElementById("theCanvas");   // for drawing the projectile
        var theContext = theCanvas.getContext("2d");
        var trailCanvas = document.getElementById("trailCanvas");   // for drawing trails
        var trailContext = trailCanvas.getContext("2d");
        var speedSlider = document.getElementById("speedSlider");
        var speedReadout = document.getElementById("speedReadout");
        var earthRadius = 6371000;                  // meters
        var mountainHeight = earthRadius * 0.008;   // to match image
        var x, y, vx, vy;                           // position and velocity
        var timer;                                  // for animation timing

        // Fire the "cannon":
        function fireProjectile() {
            window.clearTimeout(timer);     // first clear any flight in progress
            x = 0;
            y = earthRadius + mountainHeight;
            console.log('fired at y = ' + String(y));
            //y = 100;
            vx = Number(speedSlider.value);
            vy = 0;
            moveProjectile();
        }

        // Move the projectile by a single time step and schedule next move:
        function moveProjectile() {
            var newtonG = 6.67e-11;         // gravitational constant in SI units
            var earthMass = 5.97e24;        // kilograms
            var dt = 5;                     // time step in seconds
            var r = Math.sqrt(x*x + y*y);
            if (r > 0.9*earthRadius && r < 1.5*earthRadius) {
                var accel = newtonG * earthMass / (r * r);  // magnitude of the acceleration
                var ax = -accel * x / r;
                var ay = -accel * y / r;
                vx += ax * dt;
                vy += ay * dt;
                var lastx = x;
                x += vx * dt;
                y += vy * dt;
                drawProjectile();
                if (!((lastx < 0) && (x >= 0))) {   // if orbit isn't complete...
                    timer = window.setTimeout(moveProjectile, 1000/30);     // come back in 1/30 second
                }
            }
        }

        // Draw the projectile at its current location, and add a dot to the trail:
        function drawProjectile() {
            theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
            var metersPerPixel = earthRadius / (0.25*878);
            var pixelX = 2560/8 + x/metersPerPixel;
            var pixelY = 1920/8 - y/metersPerPixel;
            console.log('x = ' + String(pixelX) + ' and y = ' + String(pixelY));
            theContext.beginPath();
            theContext.arc(pixelX, pixelY, 5, 0, 2*Math.PI);
            var theGradient = theContext.createRadialGradient(pixelX-1, pixelY-2, 1, pixelX, pixelY, 5);
            theGradient.addColorStop(0, "#ffd0d0");
            theGradient.addColorStop(1, "#ff0000");
            theContext.fillStyle = theGradient;
            theContext.fill();
            trailContext.fillStyle = "red";
            trailContext.fillRect(pixelX-0.5, pixelY-0.5, 1, 1);
        }

        // Update the speed slider readout:
        function showSpeed() {
            speedReadout.innerHTML = speedSlider.value;
        }

        // Clear the trails from the image:
        function clearTrails() {
            trailContext.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        }
