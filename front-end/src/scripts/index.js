/* eslint-disable import/no-unresolved */
import '../styles/style.scss';
import '../styles/responsive.scss';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import loginUsername from './utils/login-username';
import logout from './utils/logout';
import notif from './utils/notif';
import App from './views/app';
import swRegister from './utils/sw-register';

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
  logout();
});

window.addEventListener('load', () => {
  swRegister();
  app.renderPage();
  loginUsername();
  notif();
  logout();
});
