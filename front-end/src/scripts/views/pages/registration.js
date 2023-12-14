import CONFIG from '../../globals/config';
import { navigateTo } from '../../utils/navigate';

const Registration = {
  async render() {
    return `
    <div id="register-container">
    <div class="section-form">
      <div class="section-image">
        <img src="./images/images4.png" alt="register-image" id="register-image">
      </div>
      <form id="registration-form">
      <div id="message"></div>
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

        const data = await response.json();
        alert('User registered successfully!');
        navigateTo('/#/login');
        console.log(data); // Data respons dari server, jika diperlukan
      } catch (error) {
        const messageContainer = document.getElementById('message');
        messageContainer.innerText = error.message;
      }
    });
  },
};

export default Registration;
