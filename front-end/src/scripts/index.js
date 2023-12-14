import '../styles/style.scss';
import '../styles/responsive.scss';
import loginUsername from './utils/login-username';
import logout from './utils/logout';
import notif from './utils/notif';
// eslint-disable-next-line import/no-unresolved
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
});

window.addEventListener('load', () => {
  app.renderPage();
  loginUsername();
  logout();
  notif();
  swRegister();
});

// Ambil semua elemen anchor di dalam navigasi
const navLinks = document.querySelectorAll('.app-bar__navigation > ul > li > a');
console.log(navLinks);

// Tambahkan event listener untuk setiap anchor
navLinks.forEach((link) => {
  link.addEventListener('click', function () {
  // Hilangkan kelas 'active' dari setiap link
    navLinks.forEach((navLink) => {
      navLink.classList.remove('active');
    });
    // Tambahkan kelas 'active' ke link yang sedang diklik
    this.classList.add('active');
  });
});
