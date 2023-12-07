import SatuDarahSource from '../../data/satu-darah-source';
import { createGetUser } from './template/template-creator';

const Profile = {
  async render() {
    return `
        <h2 id="profile-page" class="profile-page">Profile</h2>
        <div>
        <div id="create-event-container">
        <button id="create-btn" style="display: none;">Buat Event</button>
      </div>
        </div>
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const events = await SatuDarahSource.getUser();
    console.log(events.accountType);
    const eventContainer = document.getElementById('profile-page');
    const createBtn = document.getElementById('create-btn');
    const createEventContainer = document.getElementById('create-event-container');
    createEventContainer.addEventListener('click', () => {
      // Lakukan navigasi atau tindakan lainnya saat tombol "Buat Event" diklik
      window.location.href = '#/create-event';
    });
    if (events.accountType === 'Provider') {
      createBtn.style.display = 'block';
    }
    console.log(`test${events}`);
    eventContainer.innerHTML += createGetUser(events);
  },
};

export default Profile;
