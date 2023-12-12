import SatuDarahSource from '../data/satu-darah-source';

const notif = async () => {
  try {
    const events = await SatuDarahSource.getAllEvent();
    const token = localStorage.getItem('authToken');
    const notifContent = document.getElementById('notif-content');
    const dropdownContainer = document.getElementById('notificationContainer');
    if (token) {
      dropdownContainer.style.display = 'block'; // Tampilkan dropdown jika token ada
    } else {
      dropdownContainer.style.display = 'none'; // Sembunyikan dropdown jika tidak ada token
    }

    // Bersihkan konten notifikasi sebelum menambahkan notifikasi baru
    notifContent.innerHTML = '';

    // Memeriksa apakah ada event yang ditemukan
    if (events && events.length > 0) {
      // Temukan event terbaru dari array events
      const latestEvent = events.reduce((latest, current) => {
        const latestDate = new Date(latest.date);
        const currentDate = new Date(current.date);
        return currentDate > latestDate ? current : latest;
      });

      // Buat notifikasi untuk event terbaru
      const latestEventNotification = document.createElement('a');
      latestEventNotification.href = '#/event'; // Ganti dengan URL yang sesuai untuk event terbaru
      latestEventNotification.textContent = `Terbaru: ${latestEvent.bloodProvider} Mengadakan Event Donor Darah`;

      // Tambahkan notifikasi event terbaru ke dalam elemen notifikasi
      notifContent.appendChild(latestEventNotification);

      // Ambil tanggal besok
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowString = tomorrow.toISOString().split('T')[0]; // Format tanggal untuk membandingkan dengan tanggal event

      // Temukan event yang akan berlangsung besok
      const eventTomorrow = events.find((event) => {
        const eventDate = new Date(event.date);
        const eventDateString = eventDate.toISOString().split('T')[0];
        return eventDateString === tomorrowString;
      });

      if (eventTomorrow) {
        const eventDate = new Date(eventTomorrow.date);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = eventDate.toLocaleDateString('id-ID', options);

        // Buat link notifikasi untuk event besok
        const notificationLink = document.createElement('a');
        notificationLink.href = '#/event'; // Ganti dengan URL yang sesuai untuk event besok
        notificationLink.textContent = `Besok: ${eventTomorrow.bloodProvider} Mengadakan Event Donor Darah pada tanggal ${formattedDate}`;

        // Tambahkan link notifikasi ke dalam elemen notifikasi
        notifContent.appendChild(notificationLink);
      } else {
        // Jika tidak ada event besok, tampilkan pesan bahwa tidak ada notifikasi event besok
        const noTomorrowNotification = document.createElement('p');
        noTomorrowNotification.textContent = 'Tidak ada event besok';

        // Tambahkan pesan ke dalam elemen notifikasi
        notifContent.appendChild(noTomorrowNotification);
      }
    } else {
      // Jika tidak ada event, tampilkan pesan bahwa tidak ada notifikasi
      const noNotification = document.createElement('p');
      noNotification.textContent = 'Tidak ada event';

      // Tambahkan pesan ke dalam elemen notifikasi
      notifContent.appendChild(noNotification);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

export default notif;
