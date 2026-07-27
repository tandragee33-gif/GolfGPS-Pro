const today = new Date();

document.getElementById("today").innerHTML =
today.toLocaleDateString("en-GB",{
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric"
});

document.getElementById("gpsStatus").innerHTML =
"GPS not started";
// Wait for the web page to load fully
document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const views = document.querySelectorAll(".view");

    // Add click event to each bottom navigation button
    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            const targetViewId = item.getAttribute("data-view");

            // 1. Remove active state from all nav buttons
            navItems.forEach((nav) => nav.classList.remove("active"));

            // 2. Hide all screen views
            views.forEach((view) => view.classList.remove("active-view"));

            // 3. Highlight clicked button and show target view
            item.classList.add("active");
            document.getElementById(targetViewId).classList.add("active-view");
        });
    });

    // Start Round Button Event
    const startBtn = document.getElementById("start-round-btn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            alert("Starting round! GPS tracking initialized.");
        });
    }
});