import { navigateTo } from '../../utils/navigate';

const Login = {
  async render() {
    return `
          <h2>Login Form</h2>
          <form id="login-form">
            <label for="username">Username:</label><br>
            <input type="text" id="username" name="username" required><br><br>
            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password" required><br><br>
            <input type="submit" value="Login">
            <button id="daftar" onclick="location.href='#/register'">Buat Akun</button>
          </form>
        `;
  },

  async afterRender() {
    document.getElementById('login-form').addEventListener('submit', async function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const loginData = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('http://localhost:3000/api/users/login', {
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
        console.log(data); // Data respons dari server, jika diperlukan
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
        alert(error.message);
      }
    });
  },
};

export default Login;
