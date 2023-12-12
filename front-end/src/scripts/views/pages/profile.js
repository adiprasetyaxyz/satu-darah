import SatuDarahSource from '../../data/satu-darah-source';
import { createBloodStock, createGetUser, createMyEventList } from './template/template-creator';

const Profile = {
  async render() {
    return `
        <h2 id="profile-page" class="profile-page">Profile</h2>
        <div id="profile-event"></div>
        <div id="profile-stock"></div>
        <div>
        <div id="create-event-container">
        <button id="create-btn" style="display: none;">Buat Event</button>
        <button id="create-btn-stock" style="display: none;">Buat Stock Darah</button>
        <button id="update-btn-stock" style="display: none;">Ubah Stock Darah</button>
        </div>
        </div>
      `;
  },
  async afterRender() {
    // mendapatkan data user
    const users = await SatuDarahSource.getUser();
    const { username, accountType } = users;

    // mendapatkan data event user
    const events = await SatuDarahSource.getAllEvent();
    const filteredEvents = events.filter((event) => event.username === username);

    // mendapatkan data stock darah user
    const bloodStocks = await SatuDarahSource.getAllstock();
    // eslint-disable-next-line max-len
    const filteredBloodStocks = bloodStocks.filter((bloodStock) => bloodStock.username === username);
    const createBtnStock = document.getElementById('create-btn-stock');
    const updateBtnStock = document.getElementById('update-btn-stock');
    const eventContainer = document.getElementById('profile-page');
    const myEventContainer = document.getElementById('profile-event');
    const myStockContainer = document.getElementById('profile-stock');
    const createBtn = document.getElementById('create-btn');
    createBtnStock.addEventListener('click', () => {
      window.location.href = '#/create-stock'; // Arahkan ke halaman buat stok darah
    });
    updateBtnStock.addEventListener('click', () => {
      window.location.href = '#/update-stock'; // Arahkan ke halaman buat stok darah
    });

    if (accountType === 'Provider') {
      createBtn.style.display = 'block';
      if (filteredBloodStocks.length === 0) {
        createBtnStock.style.display = 'block'; // Jika tidak ada stok darah, tampilkan tombol 'Buat Stock Darah'
      } else {
        updateBtnStock.style.display = 'block'; // Jika ada stok darah, tampilkan tombol 'Ubah Stock Darah'
      }
    }

    eventContainer.innerHTML += createGetUser(users);

    filteredEvents.forEach((event) => {
      myEventContainer.innerHTML += createMyEventList(event);
      const deleteBtn = document.getElementById(`delete-event-${event.id}`);
      createBtn.addEventListener('click', () => {
        window.location.href = '#/create-event';
      });
      console.log(deleteBtn);
      if (deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
          try {
            await SatuDarahSource.deleteEvent(event.id);
            console.log(`Event with ID ${event.id} deleted`);
            deleteBtn.parentNode.parentNode.remove(); // Menghapus parent dari tombol yang diklik
          } catch (error) {
            console.error(`Error deleting event: ${event.id}`, error.message);
            // Handle error if there's an issue while deleting the event
          }
        });
      }
    });
    myEventContainer.addEventListener('click', async (event) => {
      if (event.target && event.target.matches('[id^="delete-event-"]')) {
        const eventId = event.target.id.split('-')[2]; // Mengambil ID event dari ID tombol delete
        try {
          await SatuDarahSource.deleteEvent(eventId);
          console.log(`Event with ID ${eventId} deleted`);
          event.target.parentNode.parentNode.remove(); // Menghapus parent dari tombol yang diklik
        } catch (error) {
          console.error(`Error deleting event: ${eventId}`, error.message);
        // Handle error if there's an issue while deleting the event
        }
      }
    });
    filteredBloodStocks.forEach((bloodStock) => {
      myStockContainer.innerHTML += createBloodStock(bloodStock);
      const deleteStockBtn = document.getElementById(`delete-stock-${bloodStock.id}`);
      console.log(deleteStockBtn);
      if (deleteStockBtn) {
        deleteStockBtn.addEventListener('click', async () => {
          try {
            await SatuDarahSource.deleteBloodStock(bloodStock.id);
            console.log(`Blood stock with ID ${bloodStock.id} deleted`);
            deleteStockBtn.parentNode.remove(); // Menghapus parent dari tombol yang diklik
          } catch (error) {
            console.error(`Error deleting blood stock: ${bloodStock.id}`, error.message);
            // Handle error if there's an issue while deleting the blood stock
          }
        });
      }
    });
  },

};

export default Profile;
