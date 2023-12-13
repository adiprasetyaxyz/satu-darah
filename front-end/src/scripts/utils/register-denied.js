const displayLoginPopup = () => {
  // Buat sebuah elemen popup atau tampilan yang menunjukkan pesan "Login untuk Daftar Event"
  const loginPopup = document.createElement('div');
  loginPopup.innerHTML = `
      <div class="login-popup">
        <p>Login untuk Daftar Event</p>
        <!-- Tambahkan tombol login atau tautan login ke halaman login -->
        <button id="login-button">Login</button>
      </div>
    `;

  // Tambahkan elemen popup ke dalam body dokumen
  document.body.appendChild(loginPopup);

  // Tambahkan event listener untuk tombol login di popup
  const loginButton = document.getElementById('login-button');
  loginButton.addEventListener('click', () => {
    // Redirect ke halaman login atau lakukan logika login sesuai dengan kebutuhan aplikasi Anda
    // Misalnya, Anda bisa menambahkan kode untuk menunjukkan form login
    // atau membuat fungsi untuk menampilkan halaman login di dalam popup lainnya
    // window.location.href = '/login'; // Contoh untuk redirect ke halaman login
    // Atau tampilkan form login dalam popup lain
  });
};

export default displayLoginPopup;
