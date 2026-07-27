document.addEventListener("DOMContentLoaded", () => {
    
    // Sample 18-Hole Data with Green Coordinates (Lat / Lon)
    // Default reference coordinates set to St Andrews Old Course
    const holeData = [
        { 
            hole: 1, par: 4, hcp: 7, 
            defaultFront: 342, defaultCenter: 365, defaultBack: 385,
            greenLat: 56.3432, greenLon: -2.8023 
        },
        { 
            hole: 2, par: 5, hcp: 1, 
            defaultFront: 510, defaultCenter: 535, defaultBack: 550,
            greenLat: 56.3450, greenLon: -2.8050 
        },
        { 
            hole: 3, par: 3, hcp: 15, 
            defaultFront: 145, defaultCenter: 160, defaultBack: 172,
            greenLat: 56.3465, greenLon: -2.8080 
        }
    ];

    let currentHoleIndex = 0;
    const scores = holeData.map(h => h.par);
    let watchId = null; // Stores GPS tracker reference

    // Haversine Formula: Calculates real-world distance in Yards between two GPS points
    function calculateYards(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // Earth's radius in meters
        const rad = Math.PI / 180;
        const dLat = (lat2 - lat1) * rad;
        const dLon = (lon2 - lon1) * rad;

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const meters = R * c;
        return Math.round(meters * 1.09361); // Convert meters to yards
    }

    function updateHoleDisplay(userLat = null, userLon = null) {
        const data = holeData[currentHoleIndex];
        document.getElementById("current-hole").innerText = data.hole;
        document.getElementById("current-par").innerText = data.par;
        document.getElementById("current-handicap").innerText = `HCP ${data.hcp}`;
        document.getElementById("current-score-display").innerText = scores[currentHoleIndex];

        if (userLat && userLon) {
            // Calculate live yardage from user position to green
            const centerDist = calculateYards(userLat, userLon, data.greenLat, data.greenLon);
            document.getElementById("dist-center").innerText = centerDist;
            document.getElementById("dist-front").innerText = centerDist - 20;
            document.getElementById("dist-back").innerText = centerDist + 20;
        } else {
            // Fallback to static course defaults when GPS is off
            document.getElementById("dist-front").innerText = data.defaultFront;
            document.getElementById("dist-center").innerText = data.defaultCenter;
            document.getElementById("dist-back").innerText = data.defaultBack;
        }
    }

    // Toggle Real Smartphone GPS
    const gpsToggleBtn = document.getElementById("toggle-gps-btn");
    const gpsAccuracyDisplay = document.getElementById("gps-accuracy-display");

    if (gpsToggleBtn) {
        gpsToggleBtn.addEventListener("click", () => {
            if (watchId === null) {
                // Request live GPS location from smartphone hardware
                if ("geolocation" in navigator) {
                    gpsToggleBtn.innerText = "🛑 Stop Live GPS";
                    gpsToggleBtn.classList.add("active");
                    gpsAccuracyDisplay.innerText = "Acquiring satellite signal...";

                    watchId = navigator.geolocation.watchPosition(
                        (position) => {
                            const lat = position.coords.latitude;
                            const lon = position.coords.longitude;
                            const accuracy = Math.round(position.coords.accuracy * 1.09361); // accuracy in yards

                            gpsAccuracyDisplay.innerText = `GPS Acc: ±${accuracy} yd`;
                            updateHoleDisplay(lat, lon);
                        },
                        (error) => {
                            alert("Unable to acquire location. Ensure Location Access is enabled in your browser settings.");
                            gpsToggleBtn.innerText = "📡 Enable Live Phone GPS";
                            gpsToggleBtn.classList.remove("active");
                            gpsAccuracyDisplay.innerText = "GPS: Error";
                            watchId = null;
                        },
                        {
                            enableHighAccuracy: true, // Use hardware GPS chip
                            maximumAge: 1000,         // Refresh every second
                            timeout: 10000
                        }
                    );
                } else {
                    alert("Geolocation is not supported by your browser.");
                }
            } else {
                // Turn off GPS tracking
                navigator.geolocation.clearWatch(watchId);
                watchId = null;
                gpsToggleBtn.innerText = "📡 Enable Live Phone GPS";
                gpsToggleBtn.classList.remove("active");
                gpsAccuracyDisplay.innerText = "GPS: Off";
                updateHoleDisplay();
            }
        });
    }

    // Score Counter Controls (+ / -)
    const minusBtn = document.getElementById("minus-score-btn");
    const plusBtn = document.getElementById("plus-score-btn");
    const logScoreBtn = document.getElementById("log-score-btn");

    if (minusBtn && plusBtn) {
        minusBtn.addEventListener("click", () => {
            if (scores[currentHoleIndex] > 1) {
                scores[currentHoleIndex]--;
                updateHoleDisplay();
            }
        });

        plusBtn.addEventListener("click", () => {
            scores[currentHoleIndex]++;
            updateHoleDisplay();
        });
    }

    if (logScoreBtn) {
        logScoreBtn.addEventListener("click", () => {
            const currentHole = holeData[currentHoleIndex].hole;
            const currentScore = scores[currentHoleIndex];
            alert(`Saved ${currentScore} for Hole ${currentHole}!`);
            
            if (currentHoleIndex < holeData.length - 1) {
                currentHoleIndex++;
                updateHoleDisplay();
            }
        });
    }

    // Hole Navigation Buttons
    const prevBtn = document.getElementById("prev-hole-btn");
    const nextBtn = document.getElementById("next-hole-btn");

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentHoleIndex > 0) {
                currentHoleIndex--;
                updateHoleDisplay();
            }
        });

        nextBtn.addEventListener("click", () => {
            if (currentHoleIndex < holeData.length - 1) {
                currentHoleIndex++;
                updateHoleDisplay();
            }
        });
    }

    // Tab Navigation Logic
    const navItems = document.querySelectorAll(".nav-item");
    const views = document.querySelectorAll(".view");

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            const targetViewId = item.getAttribute("data-view");
            navItems.forEach((nav) => nav.classList.remove("active"));
            views.forEach((view) => view.classList.remove("active-view"));

            item.classList.add("active");
            const targetView = document.getElementById(targetViewId);
            if (targetView) targetView.classList.add("active-view");
        });
    });

    // Initialize initial hole display
    updateHoleDisplay();
});