import SatuDarahSource from '../../data/satu-darah-source';
import showModal from '../../utils/modal';
import {
  createGetUser, createMyBloodStock, createMyEventList, createRegisteredEventList,
} from './template/template-creator';

const Profile = {
  async render() {
    return `
    <div id="profile=container">  
    <div class="modal" id="successModal" style="display: none;">
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <p id="message">Berhasil Login!</p>
    </div>
  </div>

    <div class="sidenav">
    <button id="profile-tab" style="display:none">Profile</button>  
      <button id="events-tab" style="display:none">Event Donor</button>
      <button id="stocks-tab" style="display:none">Stock Darah</button>
      <button id="registered-events-tab" style="display:none;">Event Terdaftar</button>
      </div>
      <h3 id="profile-title"> Profile </h3>
      <div class="main">
        <div id="profile-event" style="display:none;"></div>
        <div id="profile-stock" style="display:none;"></div>
        <div id="profile-user" style="display:none;"></div>
        <div id="profile-registered-event" style="display:none;">
        
        </div>
        <div>
          <div id="create-event-container" style="display: none;">
            <button id="create-btn">Buat Event</button>
          </div>
          <div id="create-stock-container" style="display: none;">
            <button id="create-btn-stock">Buat Stock Darah</button>
            <button id="update-btn-stock">Ubah Stock Darah</button>
          </div>
        </div>
      </div>
      </div>
    `;
  },
  async afterRender() {
    window.scrollTo(0, 0); // Geser ke bagian atas halaman
    const userType = await SatuDarahSource.getUser();
    const { accountType } = userType;
    const eventContainer = document.getElementById('profile-event');
    const registeredContainer = document.getElementById('profile-registered-event');
    const stockContainer = document.getElementById('profile-stock');
    const userContainer = document.getElementById('profile-user');
    const createBtn = document.getElementById('create-btn');
    const createBtnStock = document.getElementById('create-btn-stock');
    const updateBtnStock = document.getElementById('update-btn-stock');
    const eventsTab = document.getElementById('events-tab');
    const stocksTab = document.getElementById('stocks-tab');
    const profileTab = document.getElementById('profile-tab');
    const profileTitle = document.getElementById('profile-title');

    const setActiveTab = (tabElement) => {
      const tabs = document.querySelectorAll('.sidenav button');
      tabs.forEach((tab) => {
        tab.classList.remove('active');
      });
      tabElement.classList.add('active');
    };
    const displayEvents = async () => {
      profileTitle.innerText = 'Kelola Event Anda';
      const users = await SatuDarahSource.getUser();
      const { username } = users;
      const events = await SatuDarahSource.getAllEvent();
      const filteredEvents = events.filter((event) => event.username === username);
      eventContainer.innerHTML = '';
      createBtn.addEventListener('click', () => {
        window.location.href = '#/create-event';
      });
      filteredEvents.forEach(async (event) => {
        eventContainer.innerHTML += createMyEventList(event);
        const registerEvents = await SatuDarahSource.getAllRegisterEvent();
        // eslint-disable-next-line max-len
        const filteredRegisterEvents = registerEvents.data.filter((registeredEvent) => registeredEvent.eventId === event.id);
        const registeredCount = filteredRegisterEvents.length;
        const registered = document.getElementById(`registered-${event.id}`);
        registered.innerText = `: ${registeredCount}`;
        filteredRegisterEvents.forEach((userRegistered) => {
          const registeredAccountContainer = document.getElementById(`account-${event.id}`);
          registeredAccountContainer.innerHTML += `<p>${userRegistered.username}</p>`;
        });
        const deleteBtn = document.getElementById(`delete-event-${event.id}`);

        if (deleteBtn) {
          deleteBtn.addEventListener('click', async () => {
            try {
              await SatuDarahSource.deleteEvent(event.id);
              deleteBtn.parentNode.parentNode.remove();
            } catch (error) {
              showModal(error);
            }
          });
        }
      });
      eventContainer.style.display = 'block';
      stockContainer.style.display = 'none';
      userContainer.style.display = 'none';
      registeredContainer.style.display = 'none';
      document.getElementById('create-event-container').style.display = 'block';
      document.getElementById('create-stock-container').style.display = 'none';
    };

    const displayStocks = async () => {
      profileTitle.innerText = 'Kelola Stock Darah Anda';
      const users = await SatuDarahSource.getUser();
      const { username } = users;
      const bloodStocks = await SatuDarahSource.getAllstock();
      // eslint-disable-next-line max-len
      const filteredBloodStocks = bloodStocks.filter((bloodStock) => bloodStock.username === username);
      stockContainer.innerHTML = '';
      createBtnStock.addEventListener('click', () => {
        window.location.href = '#/create-stock';
      });
      updateBtnStock.addEventListener('click', () => {
        window.location.href = '#/update-stock';
      });

      if (filteredBloodStocks.length === 0) {
        createBtnStock.style.display = 'block';
        updateBtnStock.style.display = 'none';
      } else {
        createBtnStock.style.display = 'none';
        updateBtnStock.style.display = 'block';
      }

      filteredBloodStocks.forEach((bloodStock) => {
        stockContainer.innerHTML += createMyBloodStock(bloodStock);
        const deleteStockBtn = document.getElementById(`delete-stock-${bloodStock.id}`);

        if (deleteStockBtn) {
          deleteStockBtn.addEventListener('click', async () => {
            try {
              await SatuDarahSource.deleteBloodStock(bloodStock.id);
              deleteStockBtn.parentNode.parentNode.remove();
              showModal('Stock berhasil dihapus!');
            } catch (error) {
              showModal(error);
            }
          });
        }
      });
      userContainer.style.display = 'none';
      eventContainer.style.display = 'none';
      stockContainer.style.display = 'block';
      registeredContainer.style.display = 'none';
      document.getElementById('create-event-container').style.display = 'none';
      document.getElementById('create-stock-container').style.display = 'block';
    };
    const displayProfile = async () => {
      profileTitle.innerText = '';
      const user = await SatuDarahSource.getUser();
      userContainer.innerHTML = createGetUser(user);
      userContainer.style.display = 'block';
      eventContainer.style.display = 'none';
      stockContainer.style.display = 'none';
      registeredContainer.style.display = 'none';
      document.getElementById('create-event-container').style.display = 'none';
      document.getElementById('create-stock-container').style.display = 'none';
    };
    const registeredEventsTab = document.getElementById('registered-events-tab');

    const displayRegisteredEvents = async () => {
      profileTitle.innerText = 'Event yang anda Ikuti';
      try {
        const user = await SatuDarahSource.getUser();
        const { username } = user;
        const registeredEvents = await SatuDarahSource.getAllRegisterEvent();
        const filteredEvents = registeredEvents.data.filter((event) => event.username === username);
        registeredContainer.innerHTML = '';
        userContainer.style.display = 'none';
        eventContainer.style.display = 'none';
        stockContainer.style.display = 'none';
        registeredContainer.style.display = 'block';

        const eventDetailsPromises = filteredEvents.map(async (registeredEvent) => {
          try {
            const eventDetails = await SatuDarahSource.getEvent(registeredEvent.eventId);
            return eventDetails.data;
          } catch (error) {
            console.error('Error fetching event details:', error.message);
            return null;
          }
        });

        const eventDetailsArray = await Promise.all(eventDetailsPromises);
        eventDetailsArray.forEach((eventDetails) => {
          if (eventDetails) {
            registeredContainer.innerHTML += createRegisteredEventList(eventDetails);
          }
        });

        // ... (tindakan lain, seperti menambahkan event listener atau penyesuaian UI)
      } catch (error) {
        console.error('Error displaying registered events:', error.message);
      }
    };

    eventsTab.addEventListener('click', () => {
      displayEvents();
      setActiveTab(eventsTab);
    });
    registeredEventsTab.addEventListener('click', () => {
      displayRegisteredEvents();
      setActiveTab(registeredEventsTab);
    });
    stocksTab.addEventListener('click', () => {
      displayStocks();
      setActiveTab(stocksTab);
    });

    profileTab.addEventListener('click', () => {
      displayProfile();
      setActiveTab(profileTab);
    });

    // Menampilkan tab sesuai dengan tipe akun
    if (accountType === 'User') {
      registeredEventsTab.style.display = 'block';
      profileTab.style.display = 'block';
    } else if (accountType === 'Provider') {
      eventsTab.style.display = 'block';
      stocksTab.style.display = 'block';
      profileTab.style.display = 'block';
    }
    setActiveTab(profileTab);
    displayProfile(); // Menampilkan tab Events secara default saat halaman terbuka
  },
};

export default Profile;
