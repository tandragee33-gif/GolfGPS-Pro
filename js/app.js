document.addEventListener("DOMContentLoaded", () => {
    
    // Database of Courses with Coordinates (Tandragee, St Andrews, Augusta)
    const courseDatabase = {
        tandragee: {
            name: "Tandragee Golf Club",
            lat: 54.3541,
            lon: -6.4173,
            holes: [
                { hole: 1, par: 4, hcp: 5, defaultFront: 310, defaultCenter: 325, defaultBack: 340, greenLat: 54.3550, greenLon: -6.4180 },
                { hole: 2, par: 3, hcp: 13, defaultFront: 140, defaultCenter: 155, defaultBack: 168, greenLat: 54.3560, greenLon: -6.4190 },
                { hole: 3, par: 4, hcp: 1, defaultFront: 390, defaultCenter: 410, defaultBack: 425, greenLat: 54.3570, greenLon: -6.4200 },
                { hole: 4, par: 5, hcp: 9, defaultFront: 480, defaultCenter: 505, defaultBack: 520, greenLat: 54.3580, greenLon: -6.4210 },
                { hole: 5, par: 4, hcp: 7, defaultFront: 330, defaultCenter: 350, defaultBack: 365, greenLat: 54.3590, greenLon: -6.4220 },
                { hole: 6, par: 3, hcp: 17, defaultFront: 120, defaultCenter: 135, defaultBack: 145, greenLat: 54.3600, greenLon: -6.4230 },
                { hole: 7, par: 4, hcp: 3, defaultFront: 370, defaultCenter: 390, defaultBack: 405, greenLat: 54.3610, greenLon: -6.4240 },
                { hole: 8, par: 4, hcp: 11, defaultFront: 320, defaultCenter: 340, defaultBack: 355, greenLat: 54.3620, greenLon: -6.4250 },
                { hole: 9, par: 4, hcp: 15, defaultFront: 290, defaultCenter: 310, defaultBack: 325, greenLat: 54.3630, greenLon: -6.4260 }
            ]
        },
        standrews: {
            name: "St Andrews Old Course",
            lat: 56.3432,
            lon: -2.8023,
            holes: [
                { hole: 1, par: 4, hcp: 7, defaultFront: 342, defaultCenter: 365, defaultBack: 385, greenLat: 56.3432, greenLon: -2.8023 },
                { hole: 2, par: 5, hcp: 1, defaultFront: 510, defaultCenter: 535, defaultBack: 550, greenLat: 56.3450, greenLon: -2.8050 }
            ]
        }
    };

    let activeCourseId = "tandragee";
    let currentHoleIndex = 0;
    let scores = courseDatabase[activeCourseId].holes.map(h => h.par);
    let watchId = null;

    // Haversine Formula (Calculates Yards)
    function calculateYards(lat1, lon1, lat2, lon2) {
        const R = 6371e3;
        const rad = Math.PI / 180;
        const dLat = (lat2 - lat1) * rad;
        const dLon = (lon2 - lon1) * rad;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round((R * c) * 1.09361);
    }

    function updateHoleDisplay(userLat = null, userLon = null) {
        const course = courseDatabase[activeCourseId];
        const data = course.holes[currentHoleIndex];

        // Update Course Name Display
        document.getElementById("current-course-name").innerText = course.name;

        document.getElementById("current-hole").innerText = data.hole;
        document.getElementById("current-par").innerText = data.par;
        document.getElementById("current-handicap").innerText = `HCP ${data.hcp}`;
        document.getElementById("current-score-display").innerText = scores[currentHoleIndex];

        if (userLat && userLon) {
            const centerDist = calculateYards(userLat, userLon, data.greenLat, data.greenLon);
            document.getElementById("dist-center").innerText = centerDist;
            document.getElementById("dist-front").innerText = centerDist - 15;
            document.getElementById("dist-back").innerText = centerDist + 15;
        } else {
            document.getElementById("dist-front").innerText = data.defaultFront;
            document.getElementById("dist-center").innerText = data.defaultCenter;
            document.getElementById("dist-back").innerText = data.defaultBack;
        }
    }

    // Manual Course Selection from Courses Tab
    const courseCards = document.querySelectorAll(".course-card");
    courseCards.forEach(card => {
        card.addEventListener("click", () => {
            const selectedId = card.getAttribute("data-course-id");
            if (courseDatabase[selectedId]) {
                activeCourseId = selectedId;
                currentHoleIndex = 0;
                scores = courseDatabase[activeCourseId].holes.map(h => h.par);

                // Highlight active card
                courseCards.forEach(c => c.classList.remove("active-course"));
                card.classList.add("active-course");

                updateHoleDisplay();
                alert(`Loaded course: ${courseDatabase[activeCourseId].name}`);
            }
        });
    });

    // Auto-Detect Course via GPS
    const autoDetectBtn = document.getElementById("auto-detect-btn");
    if (autoDetectBtn) {
        autoDetectBtn.addEventListener("click", () => {
            if ("geolocation" in navigator) {
                autoDetectBtn.innerText = "Locating...";
                navigator.geolocation.getCurrentPosition((pos) => {
                    const uLat = pos.coords.latitude;
                    const uLon = pos.coords.longitude;
                    
                    let closestCourse = null;
                    let shortestDist = Infinity;

                    // Check distance to each course in database
                    for (let id in courseDatabase) {
                        const distYards = calculateYards(uLat, uLon, courseDatabase[id].lat, courseDatabase[id].lon);
                        if (distYards < shortestDist) {
                            shortestDist = distYards;
                            closestCourse = id;
                        }
                    }

                    // If within ~5km (5500 yards), auto-select it!
                    if (closestCourse) {
                        activeCourseId = closestCourse;
                        currentHoleIndex = 0;
                        scores = courseDatabase[activeCourseId].holes.map(h => h.par);

                        courseCards.forEach(c => {
                            c.classList.toggle("active-course", c.getAttribute("data-course-id") === activeCourseId);
                        });

                        updateHoleDisplay();
                        alert(`📍 Nearby course detected: ${courseDatabase[activeCourseId].name}!`);
                    }
                    autoDetectBtn.innerText = "Detect";
                }, () => {
                    alert("GPS position unavailable. Please ensure location services are enabled.");
                    autoDetectBtn.innerText = "Detect";
                });
            }
        });
    }

    // Toggle Real Phone GPS
    const gpsToggleBtn = document.getElementById("toggle-gps-btn");
    const gpsAccuracyDisplay = document.getElementById("gps-accuracy-display");

    if (gpsToggleBtn) {
        gpsToggleBtn.addEventListener("click", () => {
            if (watchId === null) {
                if ("geolocation" in navigator) {
                    gpsToggleBtn.innerText = "🛑 Stop Live GPS";
                    gpsToggleBtn.classList.add("active");
                    gpsAccuracyDisplay.innerText = "Acquiring signal...";

                    watchId = navigator.geolocation.watchPosition(
                        (position) => {
                            const lat = position.coords.latitude;
                            const lon = position.coords.longitude;
                            const accuracy = Math.round(position.coords.accuracy * 1.09361);

                            gpsAccuracyDisplay.innerText = `GPS Acc: ±${accuracy} yd`;
                            updateHoleDisplay(lat, lon);
                        },
                        (error) => {
                            alert("Location access denied or unavailable.");
                            gpsToggleBtn.innerText = "📡 Enable Live Phone GPS";
                            gpsToggleBtn.classList.remove("active");
                            gpsAccuracyDisplay.innerText = "GPS: Off";
                            watchId = null;
                        },
                        { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
                    );
                }
            } else {
                navigator.geolocation.clearWatch(watchId);
                watchId = null;
                gpsToggleBtn.innerText = "📡 Enable Live Phone GPS";
                gpsToggleBtn.classList.remove("active");
                gpsAccuracyDisplay.innerText = "GPS: Off";
                updateHoleDisplay();
            }
        });
    }

    // Score Controls (+ / -)
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
            const currentHole = courseDatabase[activeCourseId].holes[currentHoleIndex].hole;
            const currentScore = scores[currentHoleIndex];
            alert(`Saved ${currentScore} for Hole ${currentHole}!`);
            
            if (currentHoleIndex < courseDatabase[activeCourseId].holes.length - 1) {
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
            if (currentHoleIndex < courseDatabase[activeCourseId].holes.length - 1) {
                currentHoleIndex++;
                updateHoleDisplay();
            }
        });
    }

    // Tab Navigation
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

    updateHoleDisplay();
});