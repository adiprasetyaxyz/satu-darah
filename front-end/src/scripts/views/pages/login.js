import CONFIG from '../../globals/config';
import { navigateTo } from '../../utils/navigate';

const Login = {
  async render() {
    return `
    <div id="login-container">
    <div class="section-form">
    <div class="section-image">
    <img src="./images/images4.png" alt="login-image" id="login-image">
    </div>
          <form id="login-form">
          <div id="message"></div>
            <label for="username">Username:</label><br>
            <input type="text" id="username" name="username" required><br><br>
            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password" required><br><br>
            <input type="submit" value="Masuk">
            <p>Belum punya akun? <a onclick="location.href='#/register'" style="color: blue">Buat Akun</a> sekarang</p>
          </form>
          </div>
          </div>
        `;
  },

  async afterRender() {
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
        alert('Login successful!');
        // eslint-disable-next-line prefer-destructuring
        const token = data.data.token;
        const { username } = data.data;
        console.log(token);
        localStorage.setItem('username', username);
        localStorage.setItem('authToken', token);
        navigateTo('/#/home');
        window.location.reload();
        const tokenTrue = localStorage.getItem('authToken');
        if (!tokenTrue) {
          window.location.reload();
        }
      } catch (error) {
        const messageContainer = document.getElementById('message');
        messageContainer.innerText = error.message;
      }
    });
  },
};

export default Login;
