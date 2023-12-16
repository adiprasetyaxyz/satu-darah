import CONFIG from '../../globals/config';
import { navigateTo } from '../../utils/navigate';

const Registration = {
  async render() {
    return `
    <div class="modal" id="successModal" style="display: none;">
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <p id="message">Akun Berhasil dibuat!</p>
    </div>
  </div>
    <div id="register-container">
    <div class="section-form">
      <div class="section-image">
        <img class="lazyload" data-src="./images/images4.png" alt="register-image" id="register-image">
      </div>
      <form id="registration-form">
        <label for="username">Username:</label><br>
        <input type="text" id="reg-username" name="username" required><br><br>
        <label for="password">Password:</label><br>
        <input type="password" id="reg-password" name="password" required><br><br>
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name" required><br><br>
        <label for="accountType">Account Type:</label><br>
        <select id="accountType" name="accountType" required>
          <option value="User">User</option>
          <option value="Provider">Provider</option>
        </select><br><br>
        <input type="submit" value="Register">
        <p>Sudah punya akun? <a onclick="location.href='#/login'" style="color: blue">Login</a> sekarang</p>
      </form>
    </div>
  </div>
  
    
      `;
  },

  async afterRender() {
    window.scrollTo(0, 0); // Geser ke bagian atas halaman
    document.getElementById('registration-form').addEventListener('submit', async function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const registrationData = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(`${CONFIG.BASE_URL}api/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });

        if (!response.ok) {
          throw new Error('Username already registered');
        }

        await response.json();
        setTimeout(() => {
          navigateTo('/#/login');
          window.location.reload();
        }, 2000);
        // Tampilkan modal setelah login berhasil
        const successModal = document.getElementById('successModal');
        successModal.style.display = 'block';

        // Close modal when close button is clicked
        const closeModal = document.getElementById('closeModal');
        closeModal.addEventListener('click', () => {
          successModal.style.display = 'none';
        });
      } catch (error) {
        const messageContainer = document.getElementById('message');
        const successModal = document.getElementById('successModal');
        successModal.style.display = 'block';
        messageContainer.innerText = error.message;
        const closeModal = document.getElementById('closeModal');
        closeModal.addEventListener('click', () => {
          successModal.style.display = 'none';
        });
      }
    });
  },
};

export default Registration;
