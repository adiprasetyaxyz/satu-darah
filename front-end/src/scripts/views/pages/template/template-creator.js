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
          <button id="daftar" onclick="location.href='#'">Daftar Akun</button>
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
export { createEventList, createGetUser, createEvent };
