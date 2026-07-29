document.addEventListener("DOMContentLoaded", () => {
    
   // Database of Courses with Official Par, SI, and Green GPS Coordinates
const courseDatabase = {
    tandragee: {
        name: "Tandragee Golf Club",
        lat: 54.3541,
        lon: -6.4173,
        holes: [
            {
                hole: 1, par: 4, si: 8,
                defaultFront: 325, defaultCenter: 346, defaultBack: 360,
                frontLat: 54.34722924433236, frontLon: -6.417416157304501,
                greenLat: 54.34715378652473, greenLon: -6.417337086615404,
                backLat: 54.34711085477934, backLon: -6.417220212049806
            },
            {
                hole: 2, par: 4, si: 16,
                defaultFront: 245, defaultCenter: 266, defaultBack: 280,
                frontLat: 54.34949593297841, frontLon: -6.415901601851185,
                greenLat: 54.349622661384835, greenLon: -6.415794836493512,
                backLat: 54.3496957472734, backLon: -6.4157143987079435
            },
            {
                hole: 3, par: 5, si: 2,
                defaultFront: 470, defaultCenter: 492, defaultBack: 510,
                frontLat: 54.351521519920276, frontLon: -6.4229437527521895,
                greenLat: 54.35156277841414, greenLon: -6.423096560342305,
                backLat: 54.35160034350924, backLon: -6.423219882939728
            },
            {
                hole: 4, par: 4, si: 18,
                defaultFront: 288, defaultCenter: 308, defaultBack: 325,
                frontLat: 54.34992734485268, frontLon: -6.4209949255606915,
                greenLat: 54.349859832597524, greenLon: -6.420834308615935,
                backLat: 54.34980142180827, backLon: -6.42072917647315
            },
            {
                hole: 5, par: 3, si: 11,
                defaultFront: 148, defaultCenter: 166, defaultBack: 180,
                frontLat: 54.350145564428246, frontLon: -6.422730710806879,
                greenLat: 54.35025023088596, greenLon: -6.422898939571348,
                backLat: 54.35034497419572, backLon: -6.423021350391667
            },
            {
                hole: 6, par: 4, si: 6,
                defaultFront: 300, defaultCenter: 320, defaultBack: 335,
                frontLat: 54.348489204456236, frontLon: -6.422162352296128,
                greenLat: 54.34838406689885, greenLon: -6.422127690745724,
                backLat: 54.34829193659105, backLon: -6.4221266639283305
            },
            {
                hole: 7, par: 4, si: 3,
                defaultFront: 362, defaultCenter: 384, defaultBack: 400,
                frontLat: 54.351184791456966, frontLon: -6.424819298107393,
                greenLat: 54.351299194584556, greenLon: -6.424880407828352,
                backLat: 54.351395589160326, backLon: -6.424917758023239
            },
            {
                hole: 8, par: 5, si: 13,
                defaultFront: 430, defaultCenter: 450, defaultBack: 468,
                frontLat: 54.34759823702035, frontLon: -6.4244544047623835,
                greenLat: 54.34748442936552, greenLon: -6.424436442149522,
                backLat: 54.34739327588915, backLon: -6.424394123186103
            },
            {
                hole: 9, par: 3, si: 12,
                defaultFront: 160, defaultCenter: 179, defaultBack: 192,
                frontLat: 54.34619630777057, frontLon: -6.424181029872858,
                greenLat: 54.34606278771971, greenLon: -6.4241698660073565,
                backLat: 54.34595429646081, backLon: -6.424140523190739
            },
            {
                hole: 10, par: 4, si: 14,
                defaultFront: 288, defaultCenter: 307, defaultBack: 322,
                frontLat: 54.34801859153491, frontLon: -6.423688318249892,
                greenLat: 54.348152334668725, greenLon: -6.423716973744733,
                backLat: 54.34825763948903, backLon: -6.423738951602539
            },
            {
                hole: 11, par: 4, si: 1,
                defaultFront: 355, defaultCenter: 375, defaultBack: 390,
                frontLat: 54.34569435144582, frontLon: -6.4224038488055015,
                greenLat: 54.34557474657937, greenLon: -6.422357738908907,
                backLat: 54.345467094188635, backLon: -6.422322835441267
            },
            {
                hole: 12, par: 4, si: 5,
                defaultFront: 322, defaultCenter: 343, defaultBack: 358,
                frontLat: 54.347818810272535, frontLon: -6.422035106694612,
                greenLat: 54.34794240258709, greenLon: -6.422010941855127,
                backLat: 54.348027135427245, backLon: -6.422051131768944
            },
            {
                hole: 13, par: 4, si: 9,
                defaultFront: 340, defaultCenter: 359, defaultBack: 372,
                frontLat: 54.34493491264978, frontLon: -6.420434719644754,
                greenLat: 54.34487631622433, greenLon: -6.420411633710065,
                backLat: 54.34476156292718, backLon: -6.420372428682595
            },
            {
                hole: 14, par: 3, si: 17,
                defaultFront: 122, defaultCenter: 138, defaultBack: 150,
                frontLat: 54.345426690195794, frontLon: -6.418503982133937,
                greenLat: 54.34550662512222, greenLon: -6.418428796425502,
                backLat: 54.345575767669764, backLon: -6.418386051557354
            },
            {
                hole: 15, par: 4, si: 7,
                defaultFront: 285, defaultCenter: 302, defaultBack: 318,
                frontLat: 54.347627221633985, frontLon: -6.420567867864202,
                greenLat: 54.34772146648081, greenLon: -6.420644311868163,
                backLat: 54.34778043141138, backLon: -6.420680520609463
            },
            {
                hole: 16, par: 3, si: 10,
                defaultFront: 142, defaultCenter: 159, defaultBack: 172,
                frontLat: 54.34957036369051, frontLon: -6.420221153937985,
                greenLat: 54.34963815877819, greenLon: -6.42009252848965,
                backLat: 54.349706002041465, backLon: -6.420002754506243
            },
            {
                hole: 17, par: 5, si: 15,
                defaultFront: 458, defaultCenter: 478, defaultBack: 495,
                frontLat: 54.34598259448096, frontLon: -6.417630381179684,
                greenLat: 54.34590925225639, greenLon: -6.417585542136856,
                backLat: 54.34589076948135, backLon: -6.417501489711771
            },
            {
                hole: 18, par: 4, si: 4,
                defaultFront: 325, defaultCenter: 343, defaultBack: 358,
                frontLat: 54.34895330239557, frontLon: -6.419807267917365,
                greenLat: 54.34903774555875, greenLon: -6.419856217458413,
                backLat: 54.349104819449835, backLon: -6.41989498469942
            }
        ]
    }
    
    };

    let activeCourseId = "tandragee";
    let currentHoleIndex = 0;

    // Tracks when you reach the green so it can auto-advance at the next tee
let reachedCurrentGreen = false;
    
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
        if (userLat !== null && userLon !== null) {
            const centerDist = calculateYards(userLat, userLon, data.greenLat, data.greenLon);
            document.getElementById("dist-center").innerText = centerDist;
            document.getElementById("dist-front").innerText = centerDist - 15;
            document.getElementById("dist-back").innerText = centerDist + 15;

            // --- AUTO-ADVANCE TO NEXT HOLE ---
            // 1. Mark that you reached the current green (within 30 yards)
            if (centerDist <= 30) {
                reachedCurrentGreen = true;
            }

            // 2. Walk away towards the next tee (more than 45 yards), switch hole
            if (reachedCurrentGreen && centerDist > 45) {
                if (currentHoleIndex < course.holes.length - 1) {
                    currentHoleIndex++;
                    reachedCurrentGreen = false; // Reset for next hole
                    updateHoleDisplay(userLat, userLon);
                }
            }
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
                reachedCurrentGreen = false;
                updateHoleDisplay();
            }
        });
        nextBtn.addEventListener("click", () => {
            if (currentHoleIndex < courseDatabase[activeCourseId].holes.length - 1) {
                currentHoleIndex++;
                reachedCurrentGreen = false;
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

// Load Saved Playing Handicap from Local Storage (Default to 18 if not set)
    const hcpInput = document.getElementById("playing-handicap");
    if (hcpInput) {
        const savedHcp = localStorage.getItem("default_playing_handicap");
        if (savedHcp !== null) {
            hcpInput.value = savedHcp;
        }

        // Save new handicap whenever you change it on screen
        hcpInput.addEventListener("input", () => {
            localStorage.setItem("default_playing_handicap", hcpInput.value);
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

// Mode Switcher (Score & GPS vs Rangefinder Only)
    const modeToggleBtn = document.getElementById("mode-toggle-btn");
    const playView = document.getElementById("play-view");

    if (modeToggleBtn && playView) {
        modeToggleBtn.addEventListener("click", () => {
            playView.classList.toggle("rangefinder-mode");
            
            if (playView.classList.contains("rangefinder-mode")) {
                modeToggleBtn.innerText = "Mode: 🎯 Rangefinder Only";
            } else {
                modeToggleBtn.innerText = "Mode: 📝 Score & GPS";
            }
        });
    }
    // Initial render
    updateHoleDisplay();
    renderStatsView();
});
// Function to detect which course you are standing on
function detectNearestCourse() {
    if (!("geolocation" in navigator)) {
        alert("GPS is not supported on this device.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            let closestCourseId = null;
            let shortestDistance = Infinity;

            // Check distance to every course in your database
            for (const courseId in courseDatabase) {
                const course = courseDatabase[courseId];
                
                // Calculate distance from user to course center coordinates
                const distance = calculateYards(userLat, userLon, course.lat, course.lon);

                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    closestCourseId = courseId;
                }
            }

            // If standing within ~15 miles (26,400 yards) of the course
            if (closestCourseId && shortestDistance <= 26400) {
                activeCourseId = closestCourseId;
                currentHoleIndex = 0; // Reset to Hole 1
                
                // Reset score arrays for the new course
                rawScores = new Array(courseDatabase[activeCourseId].holes.length).fill(null);
                savedScores = new Array(courseDatabase[activeCourseId].holes.length).fill(null);

                updateHoleDisplay(userLat, userLon);
                alert("Course Detected: " + courseDatabase[activeCourseId].name);
            } else {
                alert("No nearby golf course found in your database.");
            }
        },
        (error) => {
            alert("Unable to detect location: " + error.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}
