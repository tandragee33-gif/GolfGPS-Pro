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
    
    // Track gross score for each hole (null = unentered/unplayed)
    let rawScores = new Array(courseDatabase[activeCourseId].holes.length).fill(null);
    // Track saved scores (only updated when user clicks 'Save Score')
    let savedScores = new Array(courseDatabase[activeCourseId].holes.length).fill(null);

    let watchId = null;

    // Helper: Extra handicap strokes based on Stroke Index
    function getExtraStrokes(handicap, strokeIndex) {
        let strokes = Math.floor(handicap / 18);
        let remainder = handicap % 18;
        if (strokeIndex <= remainder) strokes += 1;
        return strokes;
    }

    // Helper: Calculate Stableford Points
    function calculateStablefordPoints(grossScore, par, strokeIndex, playingHandicap) {
        if (grossScore === null || grossScore === 0) return 0;
        const extraStrokes = getExtraStrokes(playingHandicap, strokeIndex);
        const netScore = grossScore - extraStrokes;
        const points = par - netScore + 2;
        return Math.max(0, points);
    }

    // Haversine Formula (Yards)
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

        // Course Name & Hole Header
        const courseTag = document.getElementById("current-course-name");
        if (courseTag) courseTag.innerText = course.name;

        document.getElementById("current-hole").innerText = data.hole;
        document.getElementById("current-par").innerText = data.par;
        
        const siSpan = document.getElementById("current-si");
        if (siSpan) siSpan.innerText = data.si;

        // Current Score Display (- if unentered)
        const displayScore = rawScores[currentHoleIndex] !== null ? rawScores[currentHoleIndex] : "-";
        document.getElementById("current-score-display").innerText = displayScore;

        // GPS Distances
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

        // --- STABLEFORD POINTS CALCULATION ---
        const hcpInput = document.getElementById("playing-handicap");
        const playingHcp = hcpInput ? parseInt(hcpInput.value, 10) || 0 : 18;

        // Display current hole's saved points
        const savedGrossForHole = savedScores[currentHoleIndex];
        const currentHolePts = savedGrossForHole !== null ? calculateStablefordPoints(savedGrossForHole, data.par, data.si, playingHcp) : 0;
        const holePtsElem = document.getElementById("hole-points");
        if (holePtsElem) holePtsElem.innerText = currentHolePts;

        // Calculate total running points from saved scores
        let totalPts = 0;
        course.holes.forEach((h, idx) => {
            if (savedScores[idx] !== null) {
                totalPts += calculateStablefordPoints(savedScores[idx], h.par, h.si, playingHcp);
            }
        });

        const totalPtsElem = document.getElementById("total-points");
        if (totalPtsElem) totalPtsElem.innerText = totalPts;
    }

// Score Counter Controls (+ / -)
    const minusBtn = document.getElementById("minus-score-btn");
    const plusBtn = document.getElementById("plus-score-btn");
    const logScoreBtn = document.getElementById("log-score-btn");

    if (minusBtn && plusBtn) {
        minusBtn.addEventListener("click", () => {
            const par = courseDatabase[activeCourseId].holes[currentHoleIndex].par;
            if (rawScores[currentHoleIndex] === null) {
                rawScores[currentHoleIndex] = par;
            } else if (rawScores[currentHoleIndex] > 0) {
                rawScores[currentHoleIndex]--;
            }
            updateHoleDisplay();
        });

        plusBtn.addEventListener("click", () => {
            const par = courseDatabase[activeCourseId].holes[currentHoleIndex].par;
            if (rawScores[currentHoleIndex] === null) {
                rawScores[currentHoleIndex] = par;
            } else {
                rawScores[currentHoleIndex]++;
            }
            updateHoleDisplay();
        });
    }

    // Save Score Button (Saves score for this hole & updates point total)
    if (logScoreBtn) {
        logScoreBtn.addEventListener("click", () => {
            if (rawScores[currentHoleIndex] === null) {
                alert("Please select a score before saving.");
                return;
            }

            savedScores[currentHoleIndex] = rawScores[currentHoleIndex];
            const currentHoleNum = courseDatabase[activeCourseId].holes[currentHoleIndex].hole;
            
            updateHoleDisplay();
            alert(`Saved score of ${savedScores[currentHoleIndex]} for Hole ${currentHoleNum}!`);

            // Advance to next hole if available
            if (currentHoleIndex < courseDatabase[activeCourseId].holes.length - 1) {
                currentHoleIndex++;
                updateHoleDisplay();
            }
        });
    }

    // Finish Round & Save to Stats
    const finishRoundBtn = document.getElementById("finish-round-btn");
    if (finishRoundBtn) {
        finishRoundBtn.addEventListener("click", () => {
            const course = courseDatabase[activeCourseId];
            const hcpInput = document.getElementById("playing-handicap");
            const playingHcp = hcpInput ? parseInt(hcpInput.value, 10) || 0 : 18;

            let totalPoints = 0;
            let totalGross = 0;
            let holesPlayed = 0;

            course.holes.forEach((h, idx) => {
                if (savedScores[idx] !== null) {
                    totalPoints += calculateStablefordPoints(savedScores[idx], h.par, h.si, playingHcp);
                    totalGross += savedScores[idx];
                    holesPlayed++;
                }
            });

            if (holesPlayed === 0) {
                alert("No scores saved yet for this round.");
                return;
            }

const roundRecord = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                courseName: course.name,
                handicap: playingHcp,
                totalPoints: totalPoints,
                totalGross: totalGross,
                holesPlayed: holesPlayed,
                holeDetails: course.holes.map((h, idx) => ({
                    hole: h.hole,
                    par: h.par,
                    si: h.si,
                    gross: savedScores[idx],
                    pts: savedScores[idx] !== null ? calculateStablefordPoints(savedScores[idx], h.par, h.si, playingHcp) : 0
                }))
            };

            // Save round in localStorage
            let savedRounds = JSON.parse(localStorage.getItem("golf_rounds") || "[]");
            savedRounds.push(roundRecord);
            localStorage.setItem("golf_rounds", JSON.stringify(savedRounds));

            alert(`Round finished! You scored ${totalPoints} Stableford points over ${holesPlayed} holes.`);

            // Reset current round
            rawScores = new Array(course.holes.length).fill(null);
            savedScores = new Array(course.holes.length).fill(null);
            currentHoleIndex = 0;
            updateHoleDisplay();

            // Render updated stats & switch to Stats tab
            renderStatsView();
            switchToTab("stats-view");
        });
    }

// Render Stats View (Shows saved rounds with View & Delete buttons)
    function renderStatsView() {
        const container = document.getElementById("saved-rounds-list");
        if (!container) return;

        let savedRounds = JSON.parse(localStorage.getItem("golf_rounds") || "[]");

        if (savedRounds.length === 0) {
            container.innerHTML = `<p style="color: #888; text-align: center;">No saved rounds yet. Finish a round to see it here!</p>`;
            return;
        }

        container.innerHTML = "";
        savedRounds.slice().reverse().forEach((round) => {
            const card = document.createElement("div");
            card.className = "saved-round-card";
            card.innerHTML = `
                <div>
                    <div class="round-info-title">${round.courseName}</div>
                    <div class="round-info-details">
                        📅 ${round.date} • HCP ${round.handicap}<br>
                        <strong>${round.totalPoints} Points</strong> (${round.totalGross} Gross over ${round.holesPlayed} holes)
                    </div>
                </div>
                <div>
                    <button class="view-card-btn" data-id="${round.id}">View</button>
                    <button class="delete-round-btn" data-id="${round.id}">Delete</button>
                </div>
            `;
            container.appendChild(card);
        });

        // Event listeners for View buttons
        const viewBtns = container.querySelectorAll(".view-card-btn");
        viewBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idToView = parseInt(e.target.getAttribute("data-id"), 10);
                showRoundDetailsModal(idToView);
            });
        });

        // Event listeners for Delete buttons
        const deleteBtns = container.querySelectorAll(".delete-round-btn");
        deleteBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idToDelete = parseInt(e.target.getAttribute("data-id"), 10);
                deleteRound(idToDelete);
            });
        });
    }

    // Modal Display Function
    function showRoundDetailsModal(id) {
        let savedRounds = JSON.parse(localStorage.getItem("golf_rounds") || "[]");
        const round = savedRounds.find(r => r.id === id);
        if (!round) return;

        const modal = document.getElementById("scorecard-modal");
        const title = document.getElementById("modal-round-title");
        const meta = document.getElementById("modal-round-meta");
        const tbody = document.getElementById("modal-scorecard-body");

        title.innerText = round.courseName;
        meta.innerHTML = `Date: <strong>${round.date}</strong> | Playing HCP: <strong>${round.handicap}</strong><br>Total Points: <strong>${round.totalPoints}</strong> | Total Gross: <strong>${round.totalGross}</strong>`;

        tbody.innerHTML = "";

        if (round.holeDetails && round.holeDetails.length > 0) {
            round.holeDetails.forEach(h => {
                const tr = document.createElement("tr");
                const grossVal = h.gross !== null ? h.gross : "-";
                tr.innerHTML = `
                    <td><strong>Hole ${h.hole}</strong></td>
                    <td>${h.par}</td>
                    <td>${h.si}</td>
                    <td>${grossVal}</td>
                    <td><strong>${h.pts}</strong></td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            tbody.innerHTML = `<tr><td colspan="5" style="color:#aaa;">Detailed hole scores not available for this round.</td></tr>`;
        }

        modal.style.display = "flex";
    }

    // Modal Close Controls
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modalOverlay = document.getElementById("scorecard-modal");

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            if (modalOverlay) modalOverlay.style.display = "none";
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.style.display = "none";
            }
        });
    }

    // Delete a Round from Stats
    function deleteRound(id) {
        if (confirm("Are you sure you want to delete this round?")) {
            let savedRounds = JSON.parse(localStorage.getItem("golf_rounds") || "[]");
            savedRounds = savedRounds.filter(r => r.id !== id);
            localStorage.setItem("golf_rounds", JSON.stringify(savedRounds));
            renderStatsView();
        }
    }

    // Helper to switch active tab view
    function switchToTab(viewId) {
        const navItems = document.querySelectorAll(".nav-item");
        const views = document.querySelectorAll(".view");

        navItems.forEach((nav) => {
            nav.classList.toggle("active", nav.getAttribute("data-view") === viewId);
        });
        views.forEach((view) => {
            view.classList.toggle("active-view", view.id === viewId);
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

    // Tab Navigation Listener
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            const targetViewId = item.getAttribute("data-view");
            switchToTab(targetViewId);
            if (targetViewId === "stats-view") {
                renderStatsView();
            }
        });
    });

    // Listen for Handicap Changes
    const hcpInput = document.getElementById("playing-handicap");
    if (hcpInput) {
        hcpInput.addEventListener("input", () => {
            updateHoleDisplay();
        });
    }

    // --- GPS TRACKING ---
    if ("geolocation" in navigator) {
        watchId = navigator.geolocation.watchPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                updateHoleDisplay(userLat, userLon);
            },
            (error) => {
                console.warn("GPS error or permission denied:", error);
                updateHoleDisplay();
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 10000
            }
        );
    }
  // Toggle Real Phone GPS
    const gpsToggleBtn = document.getElementById("toggle-gps-btn");
    const gpsAccuracyDisplay = document.getElementById("gps-accuracy-display");

    if (gpsToggleBtn) {
        gpsToggleBtn.addEventListener("click", () => {
            if (watchId === null) {
                if ("geolocation" in navigator) {
                    gpsToggleBtn.innerText = "🛑 Stop Live GPS";
                    if (gpsAccuracyDisplay) gpsAccuracyDisplay.innerText = "Acquiring signal...";

                    watchId = navigator.geolocation.watchPosition(
                        (position) => {
                            const lat = position.coords.latitude;
                            const lon = position.coords.longitude;
                            const accuracy = Math.round(position.coords.accuracy * 1.09361);

                            if (gpsAccuracyDisplay) gpsAccuracyDisplay.innerText = `GPS Acc: ±${accuracy} yd`;
                            updateHoleDisplay(lat, lon);
                        },
                        (error) => {
                            alert("Location access denied or unavailable.");
                            gpsToggleBtn.innerText = "📡 Enable Live Phone GPS";
                            if (gpsAccuracyDisplay) gpsAccuracyDisplay.innerText = "GPS: Off";
                            watchId = null;
                        },
                        { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
                    );
                }
            } else {
                navigator.geolocation.clearWatch(watchId);
                watchId = null;
                gpsToggleBtn.innerText = "📡 Enable Live Phone GPS";
                if (gpsAccuracyDisplay) gpsAccuracyDisplay.innerText = "GPS: Off";
                updateHoleDisplay();
            }
        });
    }
    // Initial render
    updateHoleDisplay();
    renderStatsView();
});