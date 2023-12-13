const createEventList = (event) => {
  const eventDate = new Date(event.date);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = eventDate.toLocaleDateString('id-ID', options);
  return `

      <div class="event-wrapper">
        <div class="poster"><img src="./images/poster/image 1.png" alt="poster"></div>
        <div class="card-event">
          <div class="event-info">
            <table>
              <tr>
                <td>Penyelenggara:</td>
                <td> : ${event.bloodProvider}</td>
              </tr>
              <tr>
                <td>Wilayah</td>
                <td> : ${event.region}</td>
              </tr>
              <tr>
                <td>Tanggal</td>
                <td> : ${formattedDate}</td>
              </tr>
              <tr>
                <td>Waktu</td>
                <td> : ${event.time}</td>
              </tr>
              <tr>
                <td>Tempat</td>
                <td> : ${event.location}</td>
              </tr>
              <tr>
                <td>Kapasitas</td>
                <td> : ${event.capacity}</td>
              </tr>
              <tr>
                <td>Terdaftar</td>
                <td> : ${event.registered}</td>
              </tr>
            </table>
          </div>
          <button id="daftar-${event.id}">Daftar Event</button>
        </div>
      </div>
    `;
};
const createMyEventList = (event) => {
  const eventDate = new Date(event.date);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = eventDate.toLocaleDateString('id-ID', options);
  return `

      <div class="event-wrapper">
        <div class="poster"><img src="./images/poster/image 1.png" alt="poster"></div>
        <div class="card-event">
          <div class="event-info">
            <table>
              <tr>
                <td>Penyelenggara:</td>
                <td> : ${event.bloodProvider}</td>
              </tr>
              <tr>
                <td>Wilayah</td>
                <td> : ${event.region}</td>
              </tr>
              <tr>
                <td>Tanggal</td>
                <td> : ${formattedDate}</td>
              </tr>
              <tr>
                <td>Waktu</td>
                <td> : ${event.time}</td>
              </tr>
              <tr>
                <td>Tempat</td>
                <td> : ${event.location}</td>
              </tr>
              <tr>
                <td>Kapasitas</td>
                <td> : ${event.capacity}</td>
              </tr>
              <tr>
                <td>Terdaftar</td>
                <td> : ${event.registered}</td>
              </tr>
            </table>
          </div>
          <button id="delete-event-${event.id}" class="delete-btn">Delete Event</button>
          <button id="update-event">Ubah Event</button>
        </div>
      </div>
    `;
};

const createGetUser = (event) => `
  <h3>Selamat Datang, ${event.name}</h3>
  `;
const createEvent = () => {
  const username = localStorage.getItem('username') || '';
  return `
<form id="create-form">

    <label for="bloodProvider">Blood Provider:</label><br>
    <input type="text" id="bloodProvider" name="bloodProvider" maxlength="100" required><br>

    <label for="region">Region:</label><br>
    <input type="text" id="region" name="region" maxlength="100" required><br>

    <label for="date">Date:</label><br>
    <input type="date" id="date" name="date" required><br>

    <label for="time">Time:</label><br>
    <input type="text" id="time" name="time" maxlength="100" required><br>

    <label for="location">Location:</label><br>
    <input type="text" id="location" name="location" maxlength="255" required><br>

    <label for="capacity">Capacity:</label><br>
    <input type="number" id="capacity" name="capacity" min="0" required><br>

    <label for="registered">Registered:</label><br>
    <input type="number" id="registered" name="registered" min="0" required><br>

    <label for="username" style="display: none;">Username:</label><br>
    <input type="text" id="username" name="username" maxlength="100" value="${username}"style="display: none;" required><br>

    <input type="submit" value="Submit">
  </form>
`;
};

const stockFormCreator = () => `  <h2>Formulir Stok Darah</h2>
<form id="bloodStockForm">
  <table>
    <tr>
      <td>Komposisi</td>
      <td>Gol A</td>
      <td>Gol B</td>
      <td>Gol O</td>
      <td>Gol AB</td>
    </tr>
    <tr>
      <td>Packed Red Cells</td>
      <td><input type="number" id="packedRedCellsA" name="packedRedCellsA"></td>
      <td><input type="number" id="packedRedCellsB" name="packedRedCellsB"></td>
      <td><input type="number" id="packedRedCellsO" name="packedRedCellsO"></td>
      <td><input type="number" id="packedRedCellsAB" name="packedRedCellsAB"></td>
    </tr>
    <tr>
      <td>Trombocyte Concentrate</td>
      <td><input type="number" id="trombocyteConcentrateA" name="trombocyteConcentrateA"></td>
      <td><input type="number" id="trombocyteConcentrateB" name="trombocyteConcentrateB"></td>
      <td><input type="number" id="trombocyteConcentrateO" name="trombocyteConcentrateO"></td>
      <td><input type="number" id="trombocyteConcentrateAB" name="trombocyteConcentrateAB"></td>
    </tr>
    <tr>
      <td>Fresh Frozen Plasma</td>
      <td><input type="number" id="freshFrozenPlasmaA" name="freshFrozenPlasmaA"></td>
      <td><input type="number" id="freshFrozenPlasmaB" name="freshFrozenPlasmaB"></td>
      <td><input type="number" id="freshFrozenPlasmaO" name="freshFrozenPlasmaO"></td>
      <td><input type="number" id="freshFrozenPlasmaAB" name="freshFrozenPlasmaAB"></td>
    </tr>
    <tr>
      <td>Cryoprecipitated AHF</td>
      <td><input type="number" id="cryoprecipitatedAHFA" name="cryoprecipitatedAHFA"></td>
      <td><input type="number" id="cryoprecipitatedAHFB" name="cryoprecipitatedAHFB"></td>
      <td><input type="number" id="cryoprecipitatedAHFO" name="cryoprecipitatedAHFO"></td>
      <td><input type="number" id="cryoprecipitatedAHFAB" name="cryoprecipitatedAHFAB"></td>
    </tr>
    <tr>
      <td>Leucodepleted</td>
      <td><input type="number" id="leucodepletedA" name="leucodepletedA"></td>
      <td><input type="number" id="leucodepletedB" name="leucodepletedB"></td>
      <td><input type="number" id="leucodepletedO" name="leucodepletedO"></td>
      <td><input type="number" id="leucodepletedAB" name="leucodepletedAB"></td>
    </tr>
  </table>
  <br>
  <table>
  <tr>
    <td>Username</td>
    <td><input type="text" id="username" name="username"></td>
  </tr>
  <tr>
    <td>Provider Name</td>
    <td><input type="text" id="providerName" name="providerName"></td>
  </tr>
  <tr>
    <td>Address</td>
    <td><input type="text" id="address" name="address"></td>
  </tr>
  <tr>
    <td>Region</td>
    <td><input type="text" id="region" name="region"></td>
  </tr>
  <tr>
    <td>Phone Number</td>
    <td><input type="text" id="phoneNumber" name="phoneNumber"></td>
  </tr>
</table>
<br>
  <input type="submit" value="Submit">
</form>`;
const createBloodStock = (bloodStock) => `
<table>
  <tr>
    <td>Komposisi</td>
    <td>Gol A</td>
    <td>Gol B</td>
    <td>Gol O</td>
    <td>Gol AB</td>
  </tr>
  <tr>
    <td>Packed Red Cells</td>
    <td>${bloodStock.packedRedCells ? bloodStock.packedRedCells.A : '0'}</td>
    <td>${bloodStock.packedRedCells ? bloodStock.packedRedCells.B : '0'}</td>
    <td>${bloodStock.packedRedCells ? bloodStock.packedRedCells.O : '0'}</td>
    <td>${bloodStock.packedRedCells ? bloodStock.packedRedCells.AB : '0'}</td>
  </tr>
  <tr>
    <td>Trombocyte Concentrate</td>
    <td>${bloodStock.trombocyteConcentrate ? bloodStock.trombocyteConcentrate.A : '0'}</td>
    <td>${bloodStock.trombocyteConcentrate ? bloodStock.trombocyteConcentrate.B : '0'}</td>
    <td>${bloodStock.trombocyteConcentrate ? bloodStock.trombocyteConcentrate.O : '0'}</td>
    <td>${bloodStock.trombocyteConcentrate ? bloodStock.trombocyteConcentrate.AB : '0'}</td>
  </tr>
  <tr>
    <td>Fresh Frozen Plasma</td>
    <td>${bloodStock.freshFrozenPlasma ? bloodStock.freshFrozenPlasma.A : '0'}</td>
    <td>${bloodStock.freshFrozenPlasma ? bloodStock.freshFrozenPlasma.B : '0'}</td>
    <td>${bloodStock.freshFrozenPlasma ? bloodStock.freshFrozenPlasma.O : '0'}</td>
    <td>${bloodStock.freshFrozenPlasma ? bloodStock.freshFrozenPlasma.AB : '0'}</td>
  </tr>
  <tr>
    <td>Cryoprecipitated AHF</td>
    <td>${bloodStock.cryoprecipitatedAHF ? bloodStock.cryoprecipitatedAHF.A : '0'}</td>
    <td>${bloodStock.cryoprecipitatedAHF ? bloodStock.cryoprecipitatedAHF.B : '0'}</td>
    <td>${bloodStock.cryoprecipitatedAHF ? bloodStock.cryoprecipitatedAHF.O : '0'}</td>
    <td>${bloodStock.cryoprecipitatedAHF ? bloodStock.cryoprecipitatedAHF.AB : '0'}</td>
  </tr>
  <tr>
    <td>Leucodepleted</td>
    <td>${bloodStock.leucodepleted ? bloodStock.leucodepleted.A : '0'}</td>
    <td>${bloodStock.leucodepleted ? bloodStock.leucodepleted.B : '0'}</td>
    <td>${bloodStock.leucodepleted ? bloodStock.leucodepleted.O : '0'}</td>
    <td>${bloodStock.leucodepleted ? bloodStock.leucodepleted.AB : '0'}</td>
  </tr>
</table>

<table>
<tr>
  <td>Username</td>
  <td>${bloodStock.username}</td>
</tr>
  <tr>
    <th>Field</th>
    <th>Data</th>
  </tr>
  <tr>
    <td>ID</td>
    <td>${bloodStock.id}</td>
  </tr>
  <tr>
    <td>Provider Name</td>
    <td>${bloodStock.providerName}</td>
  </tr>
  <tr>
    <td>Address</td>
    <td>${bloodStock.address}</td>
  </tr>
  <tr>
    <td>Region</td>
    <td>${bloodStock.region}</td>
  </tr>
  <tr>
    <td>Phone Number</td>
    <td>${bloodStock.phoneNumber}</td>
  </tr>
  </table>
  <button id="request" class="requestBtn">Request Stock Darah</button>
`;
const createMyBloodStock = (bloodStock) => `
<table>
  <tr>
    <td>Komposisi</td>
    <td>Gol A</td>
    <td>Gol B</td>
    <td>Gol O</td>
    <td>Gol AB</td>
  </tr>
  <tr>
    <td>Packed Red Cells</td>
    <td>${bloodStock.packedRedCells ? bloodStock.packedRedCells.A : '0'}</td>
    <td>${bloodStock.packedRedCells ? bloodStock.packedRedCells.B : '0'}</td>
    <td>${bloodStock.packedRedCells ? bloodStock.packedRedCells.O : '0'}</td>
    <td>${bloodStock.packedRedCells ? bloodStock.packedRedCells.AB : '0'}</td>
  </tr>
  <tr>
    <td>Trombocyte Concentrate</td>
    <td>${bloodStock.trombocyteConcentrate ? bloodStock.trombocyteConcentrate.A : '0'}</td>
    <td>${bloodStock.trombocyteConcentrate ? bloodStock.trombocyteConcentrate.B : '0'}</td>
    <td>${bloodStock.trombocyteConcentrate ? bloodStock.trombocyteConcentrate.O : '0'}</td>
    <td>${bloodStock.trombocyteConcentrate ? bloodStock.trombocyteConcentrate.AB : '0'}</td>
  </tr>
  <tr>
    <td>Fresh Frozen Plasma</td>
    <td>${bloodStock.freshFrozenPlasma ? bloodStock.freshFrozenPlasma.A : '0'}</td>
    <td>${bloodStock.freshFrozenPlasma ? bloodStock.freshFrozenPlasma.B : '0'}</td>
    <td>${bloodStock.freshFrozenPlasma ? bloodStock.freshFrozenPlasma.O : '0'}</td>
    <td>${bloodStock.freshFrozenPlasma ? bloodStock.freshFrozenPlasma.AB : '0'}</td>
  </tr>
  <tr>
    <td>Cryoprecipitated AHF</td>
    <td>${bloodStock.cryoprecipitatedAHF ? bloodStock.cryoprecipitatedAHF.A : '0'}</td>
    <td>${bloodStock.cryoprecipitatedAHF ? bloodStock.cryoprecipitatedAHF.B : '0'}</td>
    <td>${bloodStock.cryoprecipitatedAHF ? bloodStock.cryoprecipitatedAHF.O : '0'}</td>
    <td>${bloodStock.cryoprecipitatedAHF ? bloodStock.cryoprecipitatedAHF.AB : '0'}</td>
  </tr>
  <tr>
    <td>Leucodepleted</td>
    <td>${bloodStock.leucodepleted ? bloodStock.leucodepleted.A : '0'}</td>
    <td>${bloodStock.leucodepleted ? bloodStock.leucodepleted.B : '0'}</td>
    <td>${bloodStock.leucodepleted ? bloodStock.leucodepleted.O : '0'}</td>
    <td>${bloodStock.leucodepleted ? bloodStock.leucodepleted.AB : '0'}</td>
  </tr>
</table>

<table>
<tr>
  <td>Username</td>
  <td>${bloodStock.username}</td>
</tr>
  <tr>
    <th>Field</th>
    <th>Data</th>
  </tr>
  <tr>
    <td>ID</td>
    <td>${bloodStock.id}</td>
  </tr>
  <tr>
    <td>Provider Name</td>
    <td>${bloodStock.providerName}</td>
  </tr>
  <tr>
    <td>Address</td>
    <td>${bloodStock.address}</td>
  </tr>
  <tr>
    <td>Region</td>
    <td>${bloodStock.region}</td>
  </tr>
  <tr>
    <td>Phone Number</td>
    <td>${bloodStock.phoneNumber}</td>
  </tr>
  </table>
  <button id="delete-stock-${bloodStock.id}" class="delete-btn">Delete Event</button>

`;

const createRegisterForm = () => `
    <form id="register-form">
      <label for="nama">Nama:</label>
      <input type="text" id="nama" name="nama"><br><br>
      
      <label for="umur">Umur:</label>
      <input type="number" id="umur" name="umur"><br><br>
      
      <label for="bloodType">Golongan Darah:</label>
      <input type="text" id="bloodType" name="bloodType" required><br><br>
      
      <button type="submit">Register</button>
    </form>
  `;

export {
  createEventList,
  createGetUser,
  createEvent,
  stockFormCreator,
  createBloodStock,
  createMyBloodStock,
  createMyEventList,
  createRegisterForm,
};
