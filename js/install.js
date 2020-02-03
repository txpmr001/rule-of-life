/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
'use strict';

let deferredInstallPrompt = null;
// Add event listener for 'beforeinstallprompt' event.
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

/**
 * @description 
 *  Event handler for 'beforeinstallprompt' event.
 *  Save the 'beforeinstallprompt' event & show install buttons.
 * @param {Event} evt - The 'beforeinstallprompt' event.
 */
function saveBeforeInstallPromptEvent(evt) {
  // Save 'beforeinstallprompt' event & show the install buttons.
  deferredInstallPrompt = evt;

  console.log('saveBeforeInstallPromptEvent: display install buttons');
  // Show dropdown menu install pwa button.
  document.getElementById('install-menu-item').style.display = 'block';

  // Show install pwa dialog with animation when it scrolls into view.
  function chk4InstallDialog() {
    if (!rolApp.contentFiltered) {
      let bounding = rolApp.installDialogAnchorElement.getBoundingClientRect();
      if (bounding.top < 500) {
        document.getElementById('install-dialog').classList.add('show-install-dialog');
        window.removeEventListener('scroll', chk4InstallDialog);
      }
    }
  }
  window.addEventListener('scroll', chk4InstallDialog);
}

// Add event listeners for install buttons.
const installButtons = document.getElementsByClassName('installButton');
for (let idx = 0; idx < installButtons.length; idx++) {
  installButtons[idx].addEventListener('click', installPWA);
}

/**
 * @description
 *  Event handler for install buttons.
 *  Does the PWA installation using the saved 'beforeinstallprompt' event.
 * @param {Event} evt - The click event from an install button.
 */
function installPWA(evt) {
  // Show install pwa prompt & hide the install buttons.
  deferredInstallPrompt.prompt();
  // Hide the install button, they can't be called twice.
  console.log('installPWA: hide install buttons');
  document.getElementById('install-menu-item').style.display = 'none';
  document.getElementById('install-dialog').classList.remove('show-install-dialog');

  // Log user response to prompt.
  deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });
}

// Add an event listener for 'appinstalled'.
window.addEventListener('appinstalled', logAppInstalled);

/**
 * @description
 *  Event handler for 'appinstalled' event.
 *  Log the installation to analytics or save the event somehow.
 * @param {Event} evt - The 'appinstalled' event.
 */
function logAppInstalled(evt) {
  // Add code to log the event
  console.log('Rule of Life App was installed.', evt);
}
