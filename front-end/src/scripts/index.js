import '../styles/style.scss';
import loginUsername from './utils/login-username';
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
});

document.addEventListener('DOMContentLoaded', () => {
  loginUsername();
});

window.addEventListener('load', () => {
  app.renderPage();
});
