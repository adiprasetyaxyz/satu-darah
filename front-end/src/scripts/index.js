import '../styles/style.scss';
import loginUsername from './utils/login-username';
import logout from './utils/logout';
import notif from './utils/notif';
// eslint-disable-next-line import/no-unresolved
import App from './views/App';

// eslint-disable-next-line no-unused-vars
const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
  loginUsername();
  notif();
});

window.addEventListener('load', () => {
  app.renderPage();
  loginUsername();
  logout();
  notif();
});
