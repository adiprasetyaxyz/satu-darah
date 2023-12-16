import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported in the browser');
    return;
  }
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  const wb = new Workbox('./sw.bundle.js');

  try {
    await wb.register();
    console.log('Service worker registered');
  } catch (error) {
    console.log('Failed to register service worker', error);
  }
};

<<<<<<< Updated upstream
export default swRegister;
=======
// eslint-disable-next-line eol-last
export default swRegister;
>>>>>>> Stashed changes
