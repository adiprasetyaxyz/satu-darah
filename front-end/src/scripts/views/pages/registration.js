import CONFIG from '../../globals/config';
import { navigateTo } from '../../utils/navigate';

const Registration = {
  async render() {
    return `
    <h2>Registration Form</h2>
    <form id="registration-form">
      <label for="username">Username:</label><br>
      <input type="text" id="username" name="username" required><br><br>
      <label for="password">Password:</label><br>
      <input type="password" id="password" name="password" required><br><br>
      <label for="name">Name:</label><br>
      <input type="text" id="name" name="name" required><br><br>
      <label for="accountType">Account Type:</label><br>
      <select id="accountType" name="accountType" required>
      <option value="User">User</option>
        <option value="Provider">Provider</option>
      </select><br><br>
      <input type="submit" value="Register">
    </form>
    
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
        alert(error.message);
      }
    });
  },
};

export default Registration;
