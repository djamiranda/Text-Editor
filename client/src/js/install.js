// Get a reference to the button element with the ID 'buttonInstall'
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the Progressive Web App (PWA)

// Event listener for the 'beforeinstallprompt' event
// This event is fired when the browser is considering showing the install prompt for the PWA.
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the triggered event for later use
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the button, making it visible
    butInstall.classList.toggle('hidden', false);
});

// Event listener for the button click on 'butInstall' element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return; // If there's no deferred prompt, exit the function
    }
    // Show the install prompt to the user
    promptEvent.prompt();
    // Reset the deferred prompt variable to null as it can only be used once
    window.deferredPrompt = null;
    // Hide the button by adding the 'hidden' class again
    butInstall.classList.toggle('hidden', true);
});

// Event listener for the 'appinstalled' event
// This event is fired when the PWA has been successfully installed on the device
window.addEventListener('appinstalled', (event) => {
    // Clear the deferred prompt variable since the app is now installed
    window.deferredPrompt = null;
});
