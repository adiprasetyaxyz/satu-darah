/* eslint-disable no-plusplus */
import SatuDarahSource from '../../data/satu-darah-source';
import ProvinceList from '../../utils/province-list';
import { createEventList } from './template/template-creator';

const Event = {
  async render() {
    return `
      <h2 class="show-event">Events</h2>
      <div id="dropdown-container">
      <h3>Pilih Kota Anda</h3>
      <select id="province-dropdown">
      <option value="">Semua Provinsi</option>
    </select>
    </div>
      <div id="show-event"></div>
      <div id="pagination-buttons">
        <button id="prev-page"><i class="fa-solid fa-chevron-left fa-sm" style="color: #ffffff;"></i></i></button>
        <div id="page-numbers"></div>
        <button id="next-page"><i class="fa-solid fa-chevron-right fa-sm" style="color: #ffffff;"></i></button>
      </div>
    `;
  },

  async afterRender() {
    ProvinceList();
    const events = await SatuDarahSource.getAllEvent();
    const eventContainer = document.getElementById('show-event');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageNumberContainer = document.getElementById('page-numbers');

    const pageSize = 4;
    let currentPage = 1;

    const displayEvents = (Events, page) => {
      eventContainer.innerHTML = '';
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const displayedEvents = Events.slice(startIndex, endIndex);

      displayedEvents.forEach((event) => {
        eventContainer.innerHTML += createEventList(event);
      });
    };

    displayEvents(events, currentPage);

    prevPageButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        displayEvents(events, currentPage);
      }
    });

    nextPageButton.addEventListener('click', () => {
      const maxPage = Math.ceil(events.length / pageSize);
      if (currentPage < maxPage) {
        currentPage++;
        displayEvents(events, currentPage);
      }
    });

    const displayPageNumbers = (totalPages) => {
      pageNumberContainer.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        // eslint-disable-next-line no-loop-func
        pageButton.addEventListener('click', () => {
          currentPage = i;
          displayEvents(events, currentPage);
        });
        pageNumberContainer.appendChild(pageButton);
      }
    };

    const provinceDropdown = document.getElementById('province-dropdown');

    provinceDropdown.addEventListener('change', async (event) => {
      const selectedProvince = event.target.value.toLowerCase().trim();

      if (selectedProvince !== '') {
        const searchedEvents = await SatuDarahSource.searchEvent(selectedProvince);
        displayEvents(searchedEvents, 1); // Menampilkan hasil pencarian pada halaman pertama
        displayPageNumbers(Math.ceil(searchedEvents.length / pageSize));
      } else {
        // Handle jika tidak ada provinsi yang dipilih (misalnya menampilkan semua event)
        const allEvents = await SatuDarahSource.getAllEvent();
        displayEvents(allEvents, 1);
        displayPageNumbers(Math.ceil(allEvents.length / pageSize));
      }
    });
    const maxPage = Math.ceil(events.length / pageSize);
    displayPageNumbers(maxPage);

    eventContainer.addEventListener('click', async (event) => {
      // Periksa apakah yang diklik adalah tombol Daftar Event
      if (event.target.id.startsWith('daftar-')) {
        const eventId = event.target.id.split('-')[1];

        // Periksa apakah authToken ada di local storage
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          // Jika tidak ada authToken, tampilkan popup login
          const confirmed = confirm('Login untuk Daftar Event. Apakah Anda ingin login sekarang?');
          if (confirmed) {
            window.location.href = '#/login'; // Ganti dengan URL login yang sesuai
          }
        } else {
          window.location.href = `#/register-event/${eventId}`;
        }
      }
    });
  },
};

export default Event;
