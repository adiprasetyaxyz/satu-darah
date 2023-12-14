import SatuDarahSource from '../../data/satu-darah-source';
import {
  createEventList, createGetUser, createMyBloodStock, createMyEventList,
} from './template/template-creator';

const Profile = {
  async render() {
    return `
    <div id="profile=container">  
    <div class="sidenav">
    <button id="profile-tab" style="display:none">Profile</button>  
      <button id="events-tab" style="display:none">Events</button>
      <button id="stocks-tab" style="display:none">Stocks</button>
      <button id="registered-events-tab" style="display:none;">Event Anda</button>
      </div>
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
    const userType = await SatuDarahSource.getUser();
    const { accountType } = userType;
    console.log(accountType);
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

    const displayEvents = async () => {
      const users = await SatuDarahSource.getUser();
      const { username } = users;
      const events = await SatuDarahSource.getAllEvent();
      const filteredEvents = events.filter((event) => event.username === username);
      eventContainer.innerHTML = '';
      createBtn.addEventListener('click', () => {
        window.location.href = '#/create-event';
      });

      filteredEvents.forEach((event) => {
        eventContainer.innerHTML += createMyEventList(event);
        const deleteBtn = document.getElementById(`delete-event-${event.id}`);

        if (deleteBtn) {
          deleteBtn.addEventListener('click', async () => {
            try {
              await SatuDarahSource.deleteEvent(event.id);
              console.log(`Event with ID ${event.id} deleted`);
              deleteBtn.parentNode.parentNode.remove();
            } catch (error) {
              console.error(`Error deleting event: ${event.id}`, error.message);
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
              console.log(`Blood stock with ID ${bloodStock.id} deleted`);
              deleteStockBtn.parentNode.remove();
            } catch (error) {
              console.error(`Error deleting blood stock: ${bloodStock.id}`, error.message);
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
            console.log(eventDetails.data);
            console.log(registeredEvent.eventId);
            return eventDetails.data;
          } catch (error) {
            console.error('Error fetching event details:', error.message);
            return null;
          }
        });

        const eventDetailsArray = await Promise.all(eventDetailsPromises);
        eventDetailsArray.forEach((eventDetails) => {
          if (eventDetails) {
            registeredContainer.innerHTML += createEventList(eventDetails);
          }
        });

        console.log(filteredEvents);
        // ... (tindakan lain, seperti menambahkan event listener atau penyesuaian UI)
      } catch (error) {
        console.error('Error displaying registered events:', error.message);
      }
    };

    eventsTab.addEventListener('click', () => {
      displayEvents();
    });
    registeredEventsTab.addEventListener('click', () => {
      displayRegisteredEvents();
    });
    stocksTab.addEventListener('click', () => {
      displayStocks();
    });

    profileTab.addEventListener('click', () => {
      displayProfile();
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

    displayProfile(); // Menampilkan tab Events secara default saat halaman terbuka
  },
};

export default Profile;
