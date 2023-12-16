import CONFIG from '../../globals/config';
import { navigateTo } from '../../utils/navigate';

const Login = {
  async render() {
    return `
    <div class="modal" id="successModal" style="display: none;">
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <p id="message">Berhasil Login!</p>
    </div>
  </div>

    <div id="login-container">
    <div class="section-form">
    <div class="section-image">
    <img class="lazyload" data-src="./images/images4.png" alt="login-image" id="login-image">
    </div>
          <form id="login-form">
            <label for="username">Username:</label><br>
            <input type="text" id="username" name="username" required><br><br>
            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password" required><br><br>
            <input type="submit" value="Login">
            <p>Belum punya akun? <a onclick="location.href='#/register'" style="color: blue">Buat Akun</a> sekarang</p>
          </form>
          </div>
          </div>
        `;
  },

  async afterRender() {
    window.scrollTo(0, 0); // Geser ke bagian atas halaman
    // eslint-disable-next-line func-names
    document.getElementById('login-form').addEventListener('submit', async function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const loginData = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(`${CONFIG.BASE_URL}api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
          throw new Error('Username or password wrong');
        }

        const data = await response.json();
        const { token } = data.data;
        const { username } = data.data;
        localStorage.setItem('username', username);
        localStorage.setItem('authToken', token);
        setTimeout(() => {
          navigateTo('/#/home');
          window.location.reload();
        }, 500);
        const tokenTrue = localStorage.getItem('authToken');
        if (!tokenTrue) {
          window.location.reload();
        }

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

export default Login;
