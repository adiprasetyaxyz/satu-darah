import SatuDarahSource from '../../data/satu-darah-source';
import showModal from '../../utils/modal';
import { navigateTo } from '../../utils/navigate';
import { createEvent } from './template/template-creator';

const CreateEvent = {
  async render() {
    return `
    <div class="modal" id="successModal" style="display: none;">
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <p id="message">Event berhasil dibuat!</p>
    </div>
  </div>
    <div id="create-notif"></div>
    <div id="create-container">
    <div id="create-event"></div>
    <div>
      `;
  },

  async afterRender() {
    window.scrollTo(0, 0); // Geser ke bagian atas halaman
    const createEventContainer = document.getElementById('create-event');
    createEventContainer.innerHTML += createEvent();
    const createForm = document.getElementById('create-form');
    createForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(createForm);
      const eventData = Object.fromEntries(formData.entries());

      try {
        const createdEvent = await SatuDarahSource.createEvent(eventData);
        console.log('Event created:', createdEvent);

        // Lakukan navigasi atau tindakan lain setelah event berhasil dibuat
        showModal('Event berhasil dibuat');
        setTimeout(() => {
          navigateTo('/#/profile');
        }, 500);
      } catch (error) {
        showModal(error);
      }
    });
  },
};

export default CreateEvent;
