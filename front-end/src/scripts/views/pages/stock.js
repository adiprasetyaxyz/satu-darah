/* eslint-disable no-plusplus */
import SatuDarahSource from '../../data/satu-darah-source';
import ProvinceList from '../../utils/province-list';
import { createBloodStock } from './template/template-creator';

const Stock = {
  async render() {
    return `
      <h2>Temukan Stok Darah</h2>
      <div id="dropdown-container">
      <h3>Pilih Kota Anda</h3>
      <select id="province-dropdown">
        <option value="">Semua Provinsi</option>
      </select>
      </div>
      <div id="blood-stock"></div>
      <div id="pagination-buttons">
        <button id="prev-page"><i class="fa-solid fa-chevron-left fa-sm" style="color: #ffffff;"></i></button>
        <div id="page-numbers"></div>
        <button id="next-page"><i class="fa-solid fa-chevron-right fa-sm" style="color: #ffffff;"></i></button>
      </div>
    `;
  },

  async afterRender() {
    ProvinceList();
    const bloodStockContainer = document.getElementById('blood-stock');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageNumberContainer = document.getElementById('page-numbers');

    const pageSize = 5;
    let currentPage = 1;
    let filteredStocks = []; // Menyimpan stok darah yang sudah difilter

    const displayBloodStocks = (page) => {
      bloodStockContainer.innerHTML = ''; // Kosongkan container sebelum menambahkan stok darah

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const displayedBloodStocks = filteredStocks.slice(startIndex, endIndex);

      displayedBloodStocks.forEach((bloodStock) => {
        bloodStockContainer.innerHTML += createBloodStock(bloodStock);
      });
    };

    const displayPageNumbers = () => {
      const maxPage = Math.ceil(filteredStocks.length / pageSize);

      pageNumberContainer.innerHTML = ''; // Kosongkan container sebelum menambahkan tombol nomor halaman

      for (let i = 1; i <= maxPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
          currentPage = i;
          displayBloodStocks(currentPage);
        });
        pageNumberContainer.appendChild(pageButton);
      }
    };

    const updateStockAndPages = async (searchedEvents) => {
      filteredStocks = searchedEvents.bloodStock || []; // Menyimpan hasil pencarian ke dalam filteredStocks
      currentPage = 1;
      displayBloodStocks(currentPage);
      displayPageNumbers();
    };

    const provinceDropdown = document.getElementById('province-dropdown');

    provinceDropdown.addEventListener('change', async (event) => {
      const selectedProvince = event.target.value.trim();

      if (selectedProvince !== '') {
        const searchedEvents = await SatuDarahSource.searchStock(selectedProvince);
        updateStockAndPages(searchedEvents);
      } else {
        const allStocks = await SatuDarahSource.getAllstock();
        updateStockAndPages({ bloodStock: allStocks });
      }
    });

    const allStocks = await SatuDarahSource.getAllstock();
    updateStockAndPages({ bloodStock: allStocks });
    prevPageButton.addEventListener('click', async () => {
      if (currentPage > 1) {
        currentPage--;
        displayBloodStocks(currentPage);
      }
    });

    nextPageButton.addEventListener('click', () => {
      const maxPage = Math.ceil(filteredStocks.length / pageSize);
      if (currentPage < maxPage) {
        currentPage++;
        displayBloodStocks(currentPage);
      }
    });
  },
};

export default Stock;
