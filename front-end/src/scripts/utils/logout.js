import SatuDarahSource from '../data/satu-darah-source';

const showLogoutConfirmationModal = () => {
  // Temukan elemen modal logout
  const logoutModal = document.getElementById('logoutModal');
  logoutModal.style.display = 'block';

  // Event listener untuk tombol "Ya"
  document.getElementById('confirmLogout').addEventListener('click', async () => {
    try {
      await SatuDarahSource.logout();

      // Membersihkan data autentikasi lokal (token dan username)
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');

      // Redirect ke halaman login atau halaman lain yang sesuai
      // Di sini, saya menggunakan navigasi langsung ke halaman login
      window.location.href = '#/login';
      location.reload(true);
      logoutModal.style.display = 'none';
    } catch (error) {
      console.error('Failed to logout:', error);
      // Tangani kesalahan jika gagal logout
      // Misalnya, tampilkan pesan kesalahan kepada pengguna
    }
  });

  // Event listener untuk tombol "Tidak" atau tutup modal
  document.getElementById('cancelLogout').addEventListener('click', () => {
    logoutModal.style.display = 'none'; // Sembunyikan modal
  });

  // Event listener untuk menutup modal jika di luar area modal diklik
  window.addEventListener('click', (event) => {
    if (event.target === logoutModal) {
      logoutModal.style.display = 'none'; // Sembunyikan modal
    }
  });
};

const logout = () => {
  // Temukan elemen tombol "Logout"
  const logoutButton = document.getElementById('logout-button');

  // Tambahkan event listener untuk tombol "Logout"
  logoutButton.addEventListener('click', () => {
    // Tampilkan modal konfirmasi sebelum logout
    showLogoutConfirmationModal();
  });
};

export default logout;
