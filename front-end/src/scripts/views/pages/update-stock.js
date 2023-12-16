/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import SatuDarahSource from '../../data/satu-darah-source';
import showModal from '../../utils/modal';
import { navigateTo } from '../../utils/navigate';
import { stockFormCreator } from './template/template-creator';

const UpdateStock = {
  async render() {
    return `
    <div class="modal" id="successModal" style="display: none;">
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <p id="message">Berhasil Login!</p>
    </div>
  </div>
      <div id="create-stock"></div>
      <div id="stock-container"></div>
    `;
  },

  async afterRender() {
    window.scrollTo(0, 0); // Geser ke bagian atas halaman
    const stockContainer = document.getElementById('create-stock');
    stockContainer.innerHTML += stockFormCreator();
    const inputs = document.querySelectorAll('#bloodStockForm input[type="number"]');
    const users = await SatuDarahSource.getUser();
    const { username } = users;
    const bloodStocks = await SatuDarahSource.getAllstock();
    const myBloodStocks = bloodStocks[0];
    const stockId = myBloodStocks.id;

    if (myBloodStocks) {
      document.getElementById('providerName').value = myBloodStocks.providerName || '';
      document.getElementById('address').value = myBloodStocks.address || '';
      document.getElementById('region').value = myBloodStocks.region || '';
      document.getElementById('phoneNumber').value = myBloodStocks.phoneNumber || '';

      document.getElementById('packedRedCellsA').value = myBloodStocks.packedRedCells?.A || 0;
      document.getElementById('packedRedCellsB').value = myBloodStocks.packedRedCells?.B || 0;
      document.getElementById('packedRedCellsO').value = myBloodStocks.packedRedCells?.O || 0;
      document.getElementById('packedRedCellsAB').value = myBloodStocks.packedRedCells?.AB || 0;

      document.getElementById('trombocyteConcentrateA').value = myBloodStocks.trombocyteConcentrate?.A || 0;
      document.getElementById('trombocyteConcentrateB').value = myBloodStocks.trombocyteConcentrate?.B || 0;
      document.getElementById('trombocyteConcentrateO').value = myBloodStocks.trombocyteConcentrate?.O || 0;
      document.getElementById('trombocyteConcentrateAB').value = myBloodStocks.trombocyteConcentrate?.AB || 0;

      document.getElementById('freshFrozenPlasmaA').value = myBloodStocks.freshFrozenPlasma?.A || 0;
      document.getElementById('freshFrozenPlasmaB').value = myBloodStocks.freshFrozenPlasma?.B || 0;
      document.getElementById('freshFrozenPlasmaO').value = myBloodStocks.freshFrozenPlasma?.O || 0;
      document.getElementById('freshFrozenPlasmaAB').value = myBloodStocks.freshFrozenPlasma?.AB || 0;

      document.getElementById('cryoprecipitatedAHFA').value = myBloodStocks.cryoprecipitatedAHF?.A || 0;
      document.getElementById('cryoprecipitatedAHFB').value = myBloodStocks.cryoprecipitatedAHF?.B || 0;
      document.getElementById('cryoprecipitatedAHFO').value = myBloodStocks.cryoprecipitatedAHF?.O || 0;
      document.getElementById('cryoprecipitatedAHFAB').value = myBloodStocks.cryoprecipitatedAHF?.AB || 0;

      document.getElementById('leucodepletedA').value = myBloodStocks.leucodepleted?.A || 0;
      document.getElementById('leucodepletedB').value = myBloodStocks.leucodepleted?.B || 0;
      document.getElementById('leucodepletedO').value = myBloodStocks.leucodepleted?.O || 0;
      document.getElementById('leucodepletedAB').value = myBloodStocks.leucodepleted?.AB || 0;
    }

    // Menetapkan nilai default '0' jika input kosong
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.value = '0';
      }
    });
    const createStockForm = document.getElementById('bloodStockForm');
    createStockForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Dapatkan nilai dari input fields
      const providerName = document.getElementById('providerName').value;
      const address = document.getElementById('address').value;
      const region = document.getElementById('region').value;
      const phoneNumber = document.getElementById('phoneNumber').value;

      const packedRedCells = {
        A: parseInt(document.getElementById('packedRedCellsA').value, 10),
        B: parseInt(document.getElementById('packedRedCellsB').value, 10),
        O: parseInt(document.getElementById('packedRedCellsO').value, 10),
        AB: parseInt(document.getElementById('packedRedCellsAB').value, 10),
      };

      const trombocyteConcentrate = {
        A: parseInt(document.getElementById('trombocyteConcentrateA').value, 10),
        B: parseInt(document.getElementById('trombocyteConcentrateB').value, 10),
        O: parseInt(document.getElementById('trombocyteConcentrateO').value, 10),
        AB: parseInt(document.getElementById('trombocyteConcentrateAB').value, 10),
      };

      const freshFrozenPlasma = {
        A: parseInt(document.getElementById('freshFrozenPlasmaA').value, 10),
        B: parseInt(document.getElementById('freshFrozenPlasmaB').value, 10),
        O: parseInt(document.getElementById('freshFrozenPlasmaO').value, 10),
        AB: parseInt(document.getElementById('freshFrozenPlasmaAB').value, 10),
      };

      const cryoprecipitatedAHF = {
        A: parseInt(document.getElementById('cryoprecipitatedAHFA').value, 10),
        B: parseInt(document.getElementById('cryoprecipitatedAHFB').value, 10),
        O: parseInt(document.getElementById('cryoprecipitatedAHFO').value, 10),
        AB: parseInt(document.getElementById('cryoprecipitatedAHFAB').value, 10),
      };

      const leucodepleted = {
        A: parseInt(document.getElementById('leucodepletedA').value, 10),
        B: parseInt(document.getElementById('leucodepletedB').value, 10),
        O: parseInt(document.getElementById('leucodepletedO').value, 10),
        AB: parseInt(document.getElementById('leucodepletedAB').value, 10),
      };

      // Konstruksi objek data untuk pembaharuan stok darah
      const updatedStockData = {
        providerName,
        address,
        region,
        phoneNumber,
        username,
        packedRedCells,
        trombocyteConcentrate,
        freshFrozenPlasma,
        cryoprecipitatedAHF,
        leucodepleted,
      };

      try {
        // Mendapatkan ID stok yang akan diupdate
        const stockIdToUpdate = stockId;
        // Melakukan update stok ke server menggunakan SatuDarahSource
        const updatedStock = await SatuDarahSource.updateBloodStock(stockIdToUpdate, updatedStockData);
        console.log('Stock updated:', updatedStock);

        // Handle tindakan setelah stok berhasil diperbarui
        showModal('Stock Darah berhasil diubah!');
        setTimeout(() => {
          navigateTo('/#/profile');
        }, 1000);
      } catch (error) {
        showModal(error);
      }
    });
  },
};

export default UpdateStock;
