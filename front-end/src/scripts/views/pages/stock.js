/* eslint-disable no-plusplus */
import SatuDarahSource from '../../data/satu-darah-source';
import { createBloodStock } from './template/template-creator';

const Stock = {
  async render() {
    return `
      <h2>Temukan Stok Darah</h2>
      <div id="blood-stock"></div>
      <div id="pagination-buttons">
        <button id="prev-page">Previous Page</button>
        <div id="page-numbers"></div>
        <button id="next-page">Next Page</button>
      </div>
    `;
  },

  async afterRender() {
    const bloodStockContainer = document.getElementById('blood-stock');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageNumberContainer = document.getElementById('page-numbers');

    const pageSize = 5; // Ubah sesuai dengan jumlah stok darah per halaman
    let currentPage = 1;

    const displayBloodStocks = async (page) => {
      const bloodStocks = await SatuDarahSource.getAllstock();
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const displayedBloodStocks = bloodStocks.slice(startIndex, endIndex);

      bloodStockContainer.innerHTML = ''; // Mengosongkan kontainer sebelum menambahkan stok darah

      displayedBloodStocks.forEach((bloodStock) => {
        bloodStockContainer.innerHTML += createBloodStock(bloodStock);
      });
    };

    const displayPageNumbers = async () => {
      const bloodStocks = await SatuDarahSource.getAllstock();
      const maxPage = Math.ceil(bloodStocks.length / pageSize);

      pageNumberContainer.innerHTML = ''; // Mengosongkan kontainer sebelum menambahkan tombol nomor halaman

      for (let i = 1; i <= maxPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        // eslint-disable-next-line no-loop-func
        pageButton.addEventListener('click', async () => {
          currentPage = i;
          await displayBloodStocks(currentPage);
        });
        pageNumberContainer.appendChild(pageButton);
      }
    };

    await displayBloodStocks(currentPage);
    await displayPageNumbers();

    prevPageButton.addEventListener('click', async () => {
      if (currentPage > 1) {
        currentPage--;
        await displayBloodStocks(currentPage);
      }
    });

    nextPageButton.addEventListener('click', async () => {
      const bloodStocks = await SatuDarahSource.getAllstock();
      const maxPage = Math.ceil(bloodStocks.length / pageSize);
      if (currentPage < maxPage) {
        currentPage++;
        await displayBloodStocks(currentPage);
      }
    });
  },
};

export default Stock;
