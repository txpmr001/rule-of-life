// main javascript file

let rolApp = {};  // Make an empty object for application variables.

/**
 * @description Show a full page overlay.
 */ 
const showOverlay = (id) => {
  document.getElementById(id + '-overlay').style.width = "90%";
  document.getElementById(id + '-overlay-header').style.width = "90%";
  const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
  const body = document.body;
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}`;
};

/**
 * @description Hide a full page overlay.
 */
const hideOverlay = (id) => {
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = 'static';
  body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
  document.getElementById(id + '-overlay').style.width = "0%";
  document.getElementById(id + '-overlay-header').style.width = "0%";
}

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

/**
 * @description Scroll to an anchor tag.
 * @param {string} elementId - A tag identifier indicating which element to scroll to.
 */
function jumpTo(elementId) {
  if (elementId.startsWith('page-')) {
    hideOverlay('goto');
  } else if (elementId.startsWith('section-') || elementId.startsWith('chapter-')) {
    hideOverlay('toc');
  }
  console.log('jumpTo', elementId);

  //location.href = '#' + elementId;

  let element = document.getElementById(elementId);
  let bodyRect = document.body.getBoundingClientRect(),
    elemRect = element.getBoundingClientRect(),
    offset = elemRect.top - bodyRect.top;
  //console.log('jumtTO element is ' + offset + ' vertical pixels from <body>');
  //document.getElementById('message-area').innerHTML = 'jumpTo ' + elementId + ' offset ' + offset.toString();
  window.scrollTo(0, offset);
}

/**
 * @description Save the current font size in localStorage.
 */
function saveFontSize() {
  if (window.localStorage) {
    localStorage.setItem('rolApp.fontSize', rolApp.currentFontSize);
  }
}

/**
 * @description Handle dropdown menu functions.
 * @param {string} id - A string indicating which menu function was clicked.
 */
function handleMenu(id) {
  //console.log('handleMenu', id);
  switch(id) {
    case 'toggle-menu':
      document.getElementById("menu-dropdown").classList.toggle("show-dropdown");
      break;
    case 'toc':
      showOverlay('toc');
      break;
    case 'goto':
      showOverlay('goto');
      break;
    case 'fontsize':
      rolApp.sampleTextElement.style.fontSize = rolApp.currentFontSize;
      rolApp.sampleFontSize = rolApp.currentFontSize.slice(0, -2);
      console.log('rolApp.sampleFontsize =', rolApp.sampleFontSize);
      rolApp.fontSizeModalElement.style.display = "block";
      break;
    }
  }

/**
 * @description HILITOR SEARCH
 */
 function search() {
  let searchText = rolApp.searchTextElement.value
  if (rolApp.contentFiltered == false && searchText) {
    // Execute a search.
    rolApp.contentFiltered = true;
    rolApp.contentFilter = searchText;
    // Switch to cancel button, disable search text input, highlight search term.
    rolApp.searchButtonElement.src = 'images/close-200.png';
    rolApp.searchTextElement.disabled = true;
    rolApp.searchTextElement.classList.add('search-highlight');

    rolApp.myHilitor = new Hilitor('hilitor-group');
    let matchRegExp = rolApp.myHilitor.apply(rolApp.contentFilter);
    //let matchCount = rolApp.myHilitor.apply(rolApp.contentFilter);
    console.log('matchRegExp =', matchRegExp);
    for (let i = 1; i <= 40; i++) {
      let groupId = 'filter-group-' + i.toString();
      let group = document.getElementById(groupId);
      let marked = group.innerHTML.indexOf('<mark') >= 0;
      if (!marked) {
        group.style.display = 'none';
      }
    }
    //Array.prototype.forEach.call(rolApp.filterGroupElements, function(group, groupIdx) {
    //  if (response == 0) {
    //    group.style.display = 'none';
    //  }
    //});
  } else if (rolApp.contentFiltered == true) {
    // Cancel a search.
    rolApp.contentFiltered = false;
    rolApp.contentFilter = '';
    rolApp.searchTextElement.value = '';
    // Switch to search button, enable search text input, remove search term highlight
    rolApp.searchButtonElement.src = 'images/magnifier-200.png';
    rolApp.searchTextElement.disabled = false;
    rolApp.searchTextElement.classList.remove('search-highlight');

    rolApp.myHilitor.remove()
    for (let i = 1; i <= 40; i++) {
      let groupId = 'filter-group-' + i.toString();
      let group = document.getElementById(groupId);
      group.style.display = 'block';
    }
  }
}

/**
 * @description Handle button clicks.
 * @param {string} id - A string indicating which button was clicked.
 */
function handleButton(id) {
  //console.log('handleButton', id);
  switch(id) {
    case 'search':
      search();   // User clicked search button.
      break;
    case 'close-toc': 
      hideOverlay('toc');
      break;
    case 'close-goto':
      hideOverlay('goto'); 
      break;
    case 'close-fontsize': 
      rolApp.fontSizeModalElement.style.display = "none";
      break;
    case 'cancel-fontsize': 
      rolApp.fontSizeModalElement.style.display = "none";
      break;
    case 'apply-fontsize': 
      rolApp.currentFontSize = rolApp.sampleFontSize + "px";
      rolApp.htmlElement.style.fontSize = rolApp.currentFontSize;
      rolApp.fontSizeModalElement.style.display = "none";
      saveFontSize();
      break;
    case 'fontsize-decrease':
      rolApp.sampleFontSize--;
      console.log('rolApp.sampleFontSize =', rolApp.sampleFontSize)
      rolApp.sampleTextElement.style.fontSize = rolApp.sampleFontSize + "px";
      break;
    case 'fontsize-reset':
      rolApp.sampleFontSize = rolApp.originalFontSize.slice(0, -2);
      console.log('rolApp.sampleFontSize =', rolApp.sampleFontSize)
      rolApp.sampleTextElement.style.fontSize = rolApp.sampleFontSize + "px";
      break;
    case 'fontsize-increase':
      rolApp.sampleFontSize++;
      console.log('rolApp.sampleFontSize =', rolApp.sampleFontSize)
      rolApp.sampleTextElement.style.fontSize = rolApp.sampleFontSize + "px";
      break;
    }
}

/**
 * @description Handle keyup event.
 * @param {object} e - The keyup event. 
 */
function handleSearchText(e) {
  //console.log('handleSearchText e.code', e.code);
  if (e.code == 'Enter') {
    search();   // User pressed enter key.
  }
}
document.getElementById('search-text').addEventListener("keyup", (e) => handleSearchText(e));

/**
 * @description
 *    Close modal for click on modal background (outside modal content).
 *    Close dropdown menu(s) if click is not on a dropdown button.
 *    
 *    If click is not a menu dropdown button,
 *      check for and close dropdown menu(s).
 */
window.onclick = function(event) {

  if (event.target.matches('.modal')) {
    //console.log('window.onclick() closing modal, event.target =', event.target)
    event.target.style.display = "none";
  } 
  
  if (!event.target.matches('.dropdown-button')) {
    //console.log('window.onclick() closing dropdown menu(s)');
    for (let i = 0; i < rolApp.dropdownMenuElements.length; i++) {
      let dropdownMenuElement = rolApp.dropdownMenuElements[i];
      if (dropdownMenuElement.classList.contains('show-dropdown')) {
        dropdownMenuElement.classList.remove('show-dropdown');
      }
    }
  }
}

window.addEventListener('load', (event) => {

  // Get and save original HTML font size.
  rolApp.htmlElement = document.getElementsByTagName('HTML')[0];
  let htmlStyles = getComputedStyle(rolApp.htmlElement);
  rolApp.originalFontSize = htmlStyles.fontSize;
  console.log('rolApp.originalFontSize =', rolApp.originalFontSize);
  rolApp.currentFontSize = rolApp.originalFontSize;

  // Use saved font size if it exists in local storage.
  if (window.localStorage) {
    let storageFontSize = localStorage.getItem('rolApp.fontSize');
    if (storageFontSize) {
      if (rolApp.currentFontSize !== storageFontSize) {
        rolApp.currentFontSize = storageFontSize;
        rolApp.htmlElement.style.fontSize = rolApp.currentFontSize;
      }
    }
  }
  console.log('rolApp.currentFontSize =', rolApp.currentFontSize);

  rolApp.fontSizeModalElement = document.getElementById('fontsize-modal');
  rolApp.sampleTextElement = document.getElementById('sample-text');

  rolApp.installDialogAnchorElement = document.getElementById('install-dialog-anchor');
  rolApp.installDialogElement = document.getElementById('install-dialog');

  rolApp.searchTextElement = document.getElementById('search-text');
  rolApp.searchButtonElement = document.getElementById('search-button');
  rolApp.contentFiltered = false;
  rolApp.contentFilter = '';

  rolApp.dropdownMenuElements = document.getElementsByClassName('nav-dropdown');
  //rolApp.filterGroupElements = document.getElementsByClassName('filter-group');

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log(`Service Worker registered! Scope: ${registration.scope}`);
      })
      .catch(err => {
        console.log(`Service Worker registration failed: ${err}`);
      });
  } else {
    console.log('serviceWorker not in navigator');
  }

}); // end window load event
