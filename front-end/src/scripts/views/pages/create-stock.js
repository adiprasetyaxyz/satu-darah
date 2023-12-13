import SatuDarahSource from '../../data/satu-darah-source';
import { navigateTo } from '../../utils/navigate';
import { stockFormCreator } from './template/template-creator';

const CreateStock = {
  async render() {
    return `
    <div id="create-stock"></div>
    <div id="stock-container"></div>
    `;
  },

  async afterRender() {
    const stockContainer = document.getElementById('create-stock');
    stockContainer.innerHTML += stockFormCreator();
    const users = await SatuDarahSource.getUser();
    const { username } = users;
    const inputs = document.querySelectorAll('#bloodStockForm input[type="number"]');

    // Menetapkan nilai default '0' jika input kosong
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        // eslint-disable-next-line no-param-reassign
        input.value = '0';
      }
    });

    const createStock = document.getElementById('bloodStockForm');
    createStock.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Get values from input fields
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

      // Construct data object
      const stockData = {
        providerName,
        address,
        region,
        phoneNumber,
        packedRedCells,
        trombocyteConcentrate,
        freshFrozenPlasma,
        cryoprecipitatedAHF,
        leucodepleted,
        username,
      };

      try {
        // Send data to the server using SatuDarahSource
        const createdStock = await SatuDarahSource.createStock(stockData);
        console.log('Stock created:', createdStock);

        // Handle successful creation of stock
        const createStockContainer = document.getElementById('create-stock');
        createStockContainer.innerHTML = '<p>Stock created successfully!</p>';
        await navigateTo('/#/profile');
      } catch (error) {
        console.error('Failed to create stock:', error.message);
        // Handle error when creating stock

        const createStockContainer = document.getElementById('create-stock');
        createStockContainer.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    });
  },
};

export default CreateStock;
