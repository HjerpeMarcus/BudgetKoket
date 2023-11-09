document.addEventListener("DOMContentLoaded", function () {
  // Get references to HTML elements
  const cookiePopup = document.getElementById("cookie-popup");
  const cookieSwitch = document.getElementById("cookie-switch");
  const cookieStatus = document.getElementById("cookie-status");
  const cookieSettingsButton = document.getElementById(
    "cookie-settings-button"
  );
  const closeIcon = document.getElementById("close-icon");
  const switchContainer = document.querySelector(".cookie-switch-container");
  const onlyNecessaryButton = document.getElementById("only-necessary-button");
  const okButton = document.getElementById("ok-button");

  // Function to check if the user has previously consented
  function hasUserConsented() {
    return localStorage.getItem("cookieConsent") === "true";
  }

  // Function to update the switch and status based on the user's choice
  function updateSwitchAndStatus() {
    if (hasUserConsented()) {
      cookieSwitch.checked = true;
      cookieStatus.textContent = "Kakor påslagna";
      //enableGoogleAnalytics();
      enableHotjar();
    } else {
      cookieSwitch.checked = false;
      cookieStatus.textContent = "Kakor avstängda";
      //disableGoogleAnalytics();
      disableHotjar();
    }
  }

  // Initialize switch and status based on the user's choice
  updateSwitchAndStatus();

  // Function to close the cookie popup
  function closeCookiePopup() {
    cookiePopup.style.display = "none";
    localStorage.setItem("popupClosed", "true");
  }

  // Function to open the cookie popup with switch
  function openCookiePopupWithSwitch() {
    cookiePopup.style.display = "block";
    localStorage.setItem("popupClosed", "false");
    switchContainer.style.display = "flex"; // Show the switch container
    onlyNecessaryButton.style.display = "none"; // Hide the "Bara nödvändiga" button
    okButton.style.display = "none"; // Hide the "Ok" button
    // Check if the user has consented by clicking "Ok" in the initial popup
    if (localStorage.getItem("cookieConsent") === "true") {
      // Set the switch state to checked and update the status
      cookieSwitch.checked = true;
      cookieStatus.textContent = "Kakor påslagna";
    } else {
      // Set the switch state to unchecked and update the status
      cookieSwitch.checked = false;
      cookieStatus.textContent = "Kakor avstängda";
    }
  }

  // Function to open the cookie popup with buttons
  function openCookiePopupWithButtons() {
    cookiePopup.style.display = "block";
    localStorage.setItem("popupClosed", "false");
    onlyNecessaryButton.style.display = "block"; // Show the "Bara nödvändiga" button
    okButton.style.display = "block"; // Show the "Ok" button
    switchContainer.style.display = "none"; // Hide the switch container
  }

  // Handle switch changes
  cookieSwitch.addEventListener("change", function () {
    if (cookieSwitch.checked) {
      localStorage.setItem("cookieConsent", "true");
      cookieStatus.textContent = "Kakor påslagna";
      //enableGoogleAnalytics();
      enableHotjar();
    } else {
      localStorage.setItem("cookieConsent", "false");
      cookieStatus.textContent = "Kakor avstängda";
      //disableGoogleAnalytics();
      disableHotjar();
    }
  });

  // Handle "Cookie Settings" button click
  cookieSettingsButton.addEventListener("click", function () {
    openCookiePopupWithSwitch();
    closeIcon.style.display = "block"; // Show the close icon
  });

  // Handle "Close Popup" button click
  closeIcon.addEventListener("click", function () {
    closeCookiePopup();
  });

  // Handle "Bara nödvändiga" button click
  onlyNecessaryButton.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "false");
    //disableGoogleAnalytics(); // Disable GA
    disableHotjar(); // Disable HJ
    closeCookiePopup();
  });

  // Handle "Ok" button click
  okButton.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "true");
    //enableGoogleAnalytics(); // Enable GA
    enableHotjar(); // Enable HJ
    closeCookiePopup();
  });

  // Check if the popup was closed on a different page
  if (localStorage.getItem("popupClosed") === "true") {
    closeCookiePopup();
  }

  //// Function to enable Google Analytics
  //    function enableGoogleAnalytics() {
  //        // Replace 'YOUR-GA-ID' with your actual Google Analytics ID
  //        window.dataLayer = window.dataLayer || [];
  //        function gtag() {
  //            window.dataLayer.push(arguments);
  //        }
  //        gtag('js', new Date());
  //        gtag('config', 'YOUR-GA-ID', { 'send_page_view': true });
  //        console.log('Google Analytics enabled');
  //    }
  //
  //    // Function to disable Google Analytics
  //    function disableGoogleAnalytics() {
  //        // Replace 'YOUR-GA-ID' with your actual Google Analytics ID
  //        window.dataLayer = window.dataLayer || [];
  //        function gtag() {
  //            window.dataLayer.push(arguments);
  //        }
  //        gtag('js', new Date());
  //        gtag('config', 'YOUR-GA-ID', { 'send_page_view': false });
  //        console.log('Google Analytics disabled');
  //    }

  // Function to enable Hotjar
  function enableHotjar() {
    // Replace 'YOUR-HOTJAR-ID' with your actual Hotjar ID
    (function (h, o, t, j, a, r) {
      h.hj =
        h.hj ||
        function () {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      h._hjSettings = { hjid: 3727421, hjsv: 6 };
      a = o.getElementsByTagName("head")[0];
      r = o.createElement("script");
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=6");
    console.log("Hotjar enabled");
  }

  // Function to disable Hotjar
  function disableHotjar() {
    // Remove the Hotjar script from the DOM
    const hotjarScript = document.querySelector('script[src*="hotjar"]');
    if (hotjarScript) {
      hotjarScript.remove();
    }
    console.log("Hotjar disabled");
  }

  // Check if the user has made a choice before showing the popup
  if (!localStorage.getItem("cookieConsent")) {
    openCookiePopupWithButtons();
  }
});
