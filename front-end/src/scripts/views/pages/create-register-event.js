import SatuDarahSource from '../../data/satu-darah-source';
import showModal from '../../utils/modal';
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
    <div class="modal" id="successModal" style="display: none;">
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <p id="message">Berhasil Login!</p>
    </div>
  </div>
        <div id="create-register-notif"></div>
        <div id="create-register-form"></div>
      `;
  },

  async afterRender() {
    window.scrollTo(0, 0); // Geser ke bagian atas halaman
    const createRegisterFormContainer = document.getElementById('create-register-form');
    createRegisterFormContainer.innerHTML += createRegisterForm();

    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(registerForm);
      const registerData = Object.fromEntries(formData.entries());

      try {
        // Mendapatkan eventId dari URL terakhir
        const eventId = getLastUrlSegment();

        // Pemeriksaan apakah pengguna sudah terdaftar untuk event tersebut
        const isRegistered = localStorage.getItem(`registeredForEvent_${eventId}`);

        if (isRegistered) {
          showModal('Anda sudah terdaftar pada event ini!');
        } else {
          // Memasukkan eventId ke dalam data registrasi

          // Panggil fungsi untuk membuat registrasi
          const createdRegister = await SatuDarahSource.registerEvent(eventId, registerData);
          console.log('Register event created:', createdRegister);

          // Menandai pengguna sudah terdaftar untuk event ini di penyimpanan lokal
          localStorage.setItem(`registeredForEvent_${eventId}`, 'true');

          // Tindakan setelah berhasil membuat registrasi
          showModal('Pendaftaran Berhasil!');
          setTimeout(() => {
            navigateTo('/#/event'); // Navigasi ke halaman profil
          }, 1000);
        }
      } catch (error) {
        showModal(error);
      }
    });
  },
};

export default CreateRegisterEvent;
