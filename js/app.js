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