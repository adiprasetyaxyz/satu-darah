import SatuDarahSource from '../../data/satu-darah-source';
import { navigateTo } from '../../utils/navigate';
import { createEvent } from './template/template-creator';

const CreateEvent = {
  async render() {
    return `
    <div id="create-notif"></div>
    <div id="create-container">
    <div id="create-event"></div>
    <div>
      `;
  },

  async afterRender() {
    const createEventContainer = document.getElementById('create-event');
    const createNotif = document.getElementById('create-notif');
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

        // Misalnya, tambahkan pesan ke halaman bahwa event berhasil dibuat
        createNotif.innerHTML = '<p>Event created successfully!</p>';
        await navigateTo('/#/profile');
      } catch (error) {
        console.error('Failed to create event:', error.message);
        // Tangani kesalahan jika gagal membuat event

        // Misalnya, tambahkan pesan kesalahan ke halaman
        createNotif.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    });
  },
};

export default CreateEvent;
