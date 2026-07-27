// Wait for the entire web page to load before running any code
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Set today's date (if an element with id="today" exists)
    const todayElement = document.getElementById("today");
    if (todayElement) {
        const today = new Date();
        todayElement.innerHTML = today.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    // 2. Set GPS status
    const gpsElement = document.getElementById("gps-status");
    if (gpsElement) {
        gpsElement.innerHTML = "GPS Ready";
    }

    // 3. Tab Navigation Logic
    const navItems = document.querySelectorAll(".nav-item");
    const views = document.querySelectorAll(".view");

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            const targetViewId = item.getAttribute("data-view");

            // Remove active class from all buttons
            navItems.forEach((nav) => nav.classList.remove("active"));

            // Hide all views
            views.forEach((view) => view.classList.remove("active-view"));

            // Activate clicked button and display selected view
            item.classList.add("active");
            const targetView = document.getElementById(targetViewId);
            if (targetView) {
                targetView.classList.add("active-view");
            }
        });
    });

    // 4. Start Round Button Event
    const startBtn = document.getElementById("start-round-btn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            alert("Starting round! GPS tracking initialized.");
        });
    }
});
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

    function updateHoleDisplay() {
        const data = holeData[currentHoleIndex];
        document.getElementById("current-hole").innerText = data.hole;
        document.getElementById("current-par").innerText = data.par;
        document.getElementById("current-handicap").innerText = `HCP ${data.hcp}`;
        document.getElementById("dist-front").innerText = data.front;
        document.getElementById("dist-center").innerText = data.center;
        document.getElementById("dist-back").innerText = data.back;
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