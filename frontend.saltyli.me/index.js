import { renderNavBar } from './nav-bar.js';
import { renderUserContent } from './user-content.js'
import { renderSideBar } from './side-bar.js';
import { renderHome } from './home.js';
import { renderLogin } from './login.js';
import AppState from './app-state.js';

window.addEventListener('load', () => {
    let appState = new AppState();
    let _jwt = getCookie('token');
    // if user has cookie token set it in appState
    if (_jwt) {
      appState.setCore('token', _jwt)
    };

    render(document.location.hash, appState);
    window.addEventListener('popstate', function(){
        render(document.location.hash, appState);
    });
});

function getCookie(name) {
  function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  return match ? match[1] : null;
}

function render(hashUrl, appState) {
    let url = hashUrl.replace('#', '');
    const urlList = url.split('/');
    if (!appState.getCore()?.token) {
      switch (urlList[0]) {
          case 'login':
              renderNavBar(urlList[0], appState);
              renderLogin(appState);
              break;
          case 'register':
              renderNavBar(urlList[0], appState);
              renderLogin();
              break;
          default:
              renderNavBar(urlList[0], appState);
              renderHome(appState);
              break;
      }
    } else {
        // the path set in appState will determine routing here can be one of graphs, outletControl, conditions, profile
        renderSideBar(appState);
    }
}


async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (e) {
      console.log(`SW registration failed`);
    }
  }
}
