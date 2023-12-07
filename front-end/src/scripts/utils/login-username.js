const loginUsername = () => {
  const token = localStorage.getItem('authToken');
  const usernameData = localStorage.getItem('username');

  const loginButtonContainer = document.getElementById('loginButtonContainer');
  const dropdownContainer = document.getElementById('dropdownContainer');
  const username = document.getElementById('username-corner');

  if (token) {
    // Token exists, show dropdown
    loginButtonContainer.style.display = 'none'; // Hide login button
    dropdownContainer.style.display = 'block'; // Show dropdown
    console.log('Sudah login');
    username.textContent = usernameData;
  } else {
    // Token doesn't exist, show login button
    loginButtonContainer.style.display = 'block'; // Show login button
    dropdownContainer.style.display = 'none'; // Hide dropdown
    console.log('Belum login');
  }
};

export default loginUsername;
