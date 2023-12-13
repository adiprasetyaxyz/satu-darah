import SatuDarahSource from '../../data/satu-darah-source';
import { navigateTo } from '../../utils/navigate';
import { createRegisterForm } from './template/template-creator';
// Mendapatkan eventId dari URL
const getLastUrlSegment = () => {
  const currentURL = window.location.href;
  const urlSegments = currentURL.split('/');
  return urlSegments[urlSegments.length - 1];
};

const CreateRegisterEvent = {
  async render() {
    return `
        <div id="create-register-notif"></div>
        <div id="create-register-form"></div>
      `;
  },

  async afterRender() {
    const createRegisterFormContainer = document.getElementById('create-register-form');
    const createRegisterNotif = document.getElementById('create-register-notif');
    createRegisterFormContainer.innerHTML += createRegisterForm();

    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(registerForm);
      const registerData = Object.fromEntries(formData.entries());

      try {
        // Mendapatkan eventId dari URL terakhir
        const eventId = getLastUrlSegment();
        console.log(eventId);

        // Pemeriksaan apakah pengguna sudah terdaftar untuk event tersebut
        const isRegistered = localStorage.getItem(`registeredForEvent_${eventId}`);

        if (isRegistered) {
          createRegisterNotif.innerHTML = '<p>Anda sudah terdaftar untuk event ini!</p>';
        } else {
          // Memasukkan eventId ke dalam data registrasi

          // Panggil fungsi untuk membuat registrasi
          const createdRegister = await SatuDarahSource.registerEvent(eventId, registerData);
          console.log('Register event created:', createdRegister);

          // Menandai pengguna sudah terdaftar untuk event ini di penyimpanan lokal
          localStorage.setItem(`registeredForEvent_${eventId}`, 'true');

          // Tindakan setelah berhasil membuat registrasi

          // Contoh, tampilkan pesan sukses pada halaman
          createRegisterNotif.innerHTML = '<p>Registrasi berhasil dibuat!</p>';
          navigateTo('/#/event'); // Navigasi ke halaman profil
        }
      } catch (error) {
        console.error('Gagal membuat registrasi:', error.message);
        // Tangani kesalahan jika gagal membuat registrasi

        // Contoh, tampilkan pesan kesalahan pada halaman
        createRegisterNotif.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    });
  },
};

export default CreateRegisterEvent;
