// Data River UI v0.0 
// Made by: Sofiia Khutorna

export function darkMode() {
    var element = document.body;
    var toggleSwitch = document.querySelector('.darkSwitch input');
    element.classList.toggle("dark-mode");

    // save the current mode and switch state in localStorage
    if (element.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("switchState", "checked");
    } else {
        localStorage.setItem("theme", "light");
        localStorage.setItem("switchState", "unchecked");
    }
}

export function applySavedTheme() {
    var savedTheme = localStorage.getItem("theme");
    var savedSwitchState = localStorage.getItem("switchState");
    var toggleSwitch = document.querySelector('.darkSwitch input');

    // Apply the saved theme
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Set the toggle switch state
    if (savedSwitchState === "checked") {
        toggleSwitch.checked = true;
    } else {
        toggleSwitch.checked = false;
    }
}
