document.addEventListener("DOMContentLoaded", () => {
    
    // Sample 18-Hole Data
    const holeData = [
        { hole: 1, par: 4, hcp: 7, front: 342, center: 365, back: 385 },
        { hole: 2, par: 5, hcp: 1, front: 510, center: 535, back: 550 },
        { hole: 3, par: 3, hcp: 15, front: 145, center: 160, back: 172 },
        { hole: 4, par: 4, hcp: 5, front: 390, center: 410, back: 430 },
        { hole: 5, par: 4, hcp: 11, front: 320, center: 340, back: 355 },
        { hole: 6, par: 3, hcp: 17, front: 125, center: 140, back: 150 },
        { hole: 7, par: 5, hcp: 3, front: 490, center: 515, back: 540 },
        { hole: 8, par: 4, hcp: 9, front: 370, center: 390, back: 405 },
        { hole: 9, par: 4, hcp: 13, front: 330, center: 350, back: 365 }
    ];

    let currentHoleIndex = 0;
    // Store scores for each hole (defaults to Par)
    const scores = holeData.map(h => h.par);

    function updateHoleDisplay() {
        const data = holeData[currentHoleIndex];
        document.getElementById("current-hole").innerText = data.hole;
        document.getElementById("current-par").innerText = data.par;
        document.getElementById("current-handicap").innerText = `HCP ${data.hcp}`;
        document.getElementById("dist-front").innerText = data.front;
        document.getElementById("dist-center").innerText = data.center;
        document.getElementById("dist-back").innerText = data.back;

        // Show score for this hole
        document.getElementById("current-score-display").innerText = scores[currentHoleIndex];
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
            
            // Automatically advance to next hole if not on last
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