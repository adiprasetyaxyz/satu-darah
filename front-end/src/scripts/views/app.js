import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._updateNavigation();
    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });

    // Mengambil semua elemen anchor di dalam navigasi
    const navLinks = document.querySelectorAll('.app-bar__navigation > ul > li > a');

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.forEach((navLink) => {
          navLink.classList.remove('active');
        });
        link.classList.add('active');
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _updateNavigation() {
    // Dapat juga ditempatkan di sini jika diperlukan untuk perbaruan berbasis state atau URL
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    // Tambahkan kembali logika untuk menandai navigasi yang aktif di sini jika diperlukan
  }
}

export default App;
