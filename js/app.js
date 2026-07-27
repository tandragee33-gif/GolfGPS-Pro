document.addEventListener("DOMContentLoaded", () => {
    
    // Database of Courses with Official Par, SI, and Green GPS Coordinates
    const courseDatabase = {
        tandragee: {
            name: "Tandragee Golf Club",
            lat: 54.3541,
            lon: -6.4173,
            holes: [
                { hole: 1, par: 4, si: 8, defaultFront: 325, defaultCenter: 346, defaultBack: 360, greenLat: 54.3550, greenLon: -6.4180 },
                { hole: 2, par: 4, si: 16, defaultFront: 245, defaultCenter: 266, defaultBack: 280, greenLat: 54.3560, greenLon: -6.4190 },
                { hole: 3, par: 5, si: 2, defaultFront: 470, defaultCenter: 492, defaultBack: 510, greenLat: 54.3570, greenLon: -6.4200 },
                { hole: 4, par: 4, si: 18, defaultFront: 288, defaultCenter: 308, defaultBack: 325, greenLat: 54.3580, greenLon: -6.4210 },
                { hole: 5, par: 3, si: 11, defaultFront: 148, defaultCenter: 166, defaultBack: 180, greenLat: 54.3590, greenLon: -6.4220 },
                { hole: 6, par: 4, si: 6, defaultFront: 300, defaultCenter: 320, defaultBack: 335, greenLat: 54.3600, greenLon: -6.4230 },
                { hole: 7, par: 4, si: 3, defaultFront: 362, defaultCenter: 384, defaultBack: 400, greenLat: 54.3610, greenLon: -6.4240 },
                { hole: 8, par: 5, si: 13, defaultFront: 430, defaultCenter: 450, defaultBack: 468, greenLat: 54.3620, greenLon: -6.4250 },
                { hole: 9, par: 3, si: 12, defaultFront: 160, defaultCenter: 179, defaultBack: 192, greenLat: 54.3630, greenLon: -6.4260 },
                { hole: 10, par: 4, si: 14, defaultFront: 288, defaultCenter: 307, defaultBack: 322, greenLat: 54.3640, greenLon: -6.4270 },
                { hole: 11, par: 4, si: 1, defaultFront: 355, defaultCenter: 375, defaultBack: 390, greenLat: 54.3650, greenLon: -6.4280 },
                { hole: 12, par: 4, si: 5, defaultFront: 322, defaultCenter: 343, defaultBack: 358, greenLat: 54.3660, greenLon: -6.4290 },
                { hole: 13, par: 4, si: 9, defaultFront: 340, defaultCenter: 359, defaultBack: 372, greenLat: 54.3670, greenLon: -6.4300 },
                { hole: 14, par: 3, si: 17, defaultFront: 122, defaultCenter: 138, defaultBack: 150, greenLat: 54.3680, greenLon: -6.4310 },
                { hole: 15, par: 4, si: 7, defaultFront: 285, defaultCenter: 302, defaultBack: 318, greenLat: 54.3690, greenLon: -6.4320 },
                { hole: 16, par: 3, si: 10, defaultFront: 142, defaultCenter: 159, defaultBack: 172, greenLat: 54.3700, greenLon: -6.4330 },
                { hole: 17, par: 5, si: 15, defaultFront: 458, defaultCenter: 478, defaultBack: 495, greenLat: 54.3710, greenLon: -6.4340 },
                { hole: 18, par: 4, si: 4, defaultFront: 325, defaultCenter: 343, defaultBack: 358, greenLat: 54.3720, greenLon: -6.4350 }
            ]
        },
        standrews: {
            name: "St Andrews Old Course",
            lat: 56.3432,
            lon: -2.8023,
            holes: [
                { hole: 1, par: 4, si: 7, defaultFront: 342, defaultCenter: 365, defaultBack: 385, greenLat: 56.3432, greenLon: -2.8023 },
                { hole: 2, par: 5, si: 1, defaultFront: 510, defaultCenter: 535, defaultBack: 550, greenLat: 56.3450, greenLon: -2.8050 }
            ]
        }
    };

    let activeCourseId = "tandragee";
    let currentHoleIndex = 0;
    let scores = courseDatabase[activeCourseId].holes.map(h => h.par);
    let watchId = null;

    // Haversine Formula (Calculates distance in Yards)
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

        // Update UI
        const courseTag = document.getElementById("current-course-name");
        if (courseTag) courseTag.innerText = course.name;

        document.getElementById("current-hole").innerText = data.hole;
        document.getElementById("current-par").innerText = data.par;
        
        const siSpan = document.getElementById("current-si");
        if (siSpan) siSpan.innerText = data.si;

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

        // --- STABLEFORD CALCULATION ---
        const hcpInput = document.getElementById("playing-handicap");
        const playingHcp = hcpInput ? parseInt(hcpInput.value, 10) || 0 : 18;

        // Calculate points for current hole
        const currentGross = scores[currentHoleIndex];
        const holePts = calculateStablefordPoints(currentGross, data.par, data.si, playingHcp);
        const holePtsElem = document.getElementById("hole-points");
        if (holePtsElem) holePtsElem.innerText = holePts;

        // Calculate total running points for all played holes
        const currentCourseHoles = courseDatabase[activeCourseId].holes;
        let totalPts = 0;
        currentCourseHoles.forEach((h, idx) => {
            totalPts += calculateStablefordPoints(scores[idx], h.par, h.si, playingHcp);
        });

        const totalPtsElem = document.getElementById("total-points");
        if (totalPtsElem) totalPtsElem.innerText = totalPts;
    }
    // Manual Course Selection
    const courseCards = document.querySelectorAll(".course-card");
    courseCards.forEach(card => {
        card.addEventListener("click", () => {
            const selectedId = card.getAttribute("data-course-id");
            if (courseDatabase[selectedId]) {
                activeCourseId = selectedId;
                currentHoleIndex = 0;
                scores = courseDatabase[activeCourseId].holes.map(h => h.par);

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

                    for (let id in courseDatabase) {
                        const distYards = calculateYards(uLat, uLon, courseDatabase[id].lat, courseDatabase[id].lon);
                        if (distYards < shortestDist) {
                            shortestDist = distYards;
                            closestCourse = id;
                        }
                    }

                    // If within ~5km (5500 yards), auto-select it!
                    if (closestCourse && shortestDist < 5500) {
                        activeCourseId = closestCourse;
                        currentHoleIndex = 0;
                        scores = courseDatabase[activeCourseId].holes.map(h => h.par);

                        courseCards.forEach(c => {
                            c.classList.toggle("active-course", c.getAttribute("data-course-id") === activeCourseId);
                        });

                        updateHoleDisplay();
                        alert(`📍 Nearby course detected: ${courseDatabase[activeCourseId].name}!`);
                    } else {
                        alert("No saved course detected nearby. Playing in universal GPS mode.");
                    }
                    autoDetectBtn.innerText = "Detect";
                }, () => {
                    alert("GPS location access denied or unavailable.");
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
                            alert("Location access denied.");
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

    // Score (+ / -)
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
// --- STEP 3 C: HANDICAP LISTENER ---
    const hcpInput = document.getElementById("playing-handicap");
    if (hcpInput) {
        hcpInput.addEventListener("input", () => {
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

    // Hole Navigation
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

    // Tab Switching
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
// Calculate how many handicap strokes a player gets on a hole
function getExtraStrokes(handicap, strokeIndex) {
    let strokes = Math.floor(handicap / 18);
    let remainder = handicap % 18;
    if (strokeIndex <= remainder) {
        strokes += 1;
    }
    return strokes;
}

// Calculate Stableford Points for a single hole
function calculateStablefordPoints(grossScore, par, strokeIndex, playingHandicap) {
    if (!grossScore || grossScore <= 0) return 0;
    
    const extraStrokes = getExtraStrokes(playingHandicap, strokeIndex);
    const netScore = grossScore - extraStrokes;
    const points = par - netScore + 2;
    
    return Math.max(0, points); // Cannot score negative points
}