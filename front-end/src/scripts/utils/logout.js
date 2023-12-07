import SatuDarahSource from '../data/satu-darah-source';

const logout = () => {
// Temukan elemen tombol "Logout"
  const logoutButton = document.querySelector('a[href="#logout"]');

  // Tambahkan event listener untuk tombol "Logout"
  logoutButton.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
    // Lakukan proses logout di sini (gunakan fungsi logout yang telah Anda buat)
      await SatuDarahSource.logout();

      // Membersihkan data autentikasi lokal (token dan username)
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');

      // Redirect ke halaman login atau halaman lain yang sesuai
      // Di sini, saya menggunakan navigasi langsung ke halaman login
      window.location.href = '#/login';
    } catch (error) {
      console.error('Failed to logout:', error);
    // Tangani kesalahan jika gagal logout
    // Misalnya, tampilkan pesan kesalahan kepada pengguna
    }
  });
};


export default logout;