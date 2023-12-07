import SatuDarahSource from '../../data/satu-darah-source';
import { createEvent } from './template/template-creator';

const CreateEvent = {
  async render() {
    return `
        <div id="create-event"></div>
      `;
  },

  async afterRender() {
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

        // Misalnya, tambahkan pesan ke halaman bahwa event berhasil dibuat
        createEventContainer.innerHTML = '<p>Event created successfully!</p>';
      } catch (error) {
        console.error('Failed to create event:', error.message);
        // Tangani kesalahan jika gagal membuat event

        // Misalnya, tambahkan pesan kesalahan ke halaman
        createEventContainer.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    });
  },
};

export default CreateEvent;
