import SatuDarahSource from '../../data/satu-darah-source';
import { createEventList } from './template/template-creator';

const Home = {
  async render() {
    return `
    <div id="hero">
      <div id="gambarhero"></div>
      <div id="hero-text">
        <h1>Temukan Stok darah</h1>
        <p>Menyediakan informasi seputar stok darah dari berbagai lokasi</p>
        <button>About Us</button>
        
    </div>
</div>
<h2>Event Terbaru</h2>
<div id="show-event"></div>
<button>Lihat lebih Banyak</button>
    </div>

    <div id="syarat-donor">
        <h2>Syarat donor darah</h2>
    <div class="syarat-container">
        <div class="syarat-card"><h4>Usia</h4>
            <p>Usia 17-60 tahun  (usia 17 tahun boleh menjadi donor
            bila mendapat izin tertulis dari orangtua)</p>
        </div>
        <div class="syarat-card"><h4>Usia</h4>
            <p>Usia 17-60 tahun  (usia 17 tahun boleh menjadi donor
            bila mendapat izin tertulis dari orangtua)</p>
        </div>
        <div class="syarat-card"><h4>Usia</h4>
            <p>Usia 17-60 tahun  (usia 17 tahun boleh menjadi donor
            bila mendapat izin tertulis dari orangtua)</p>
        </div>
        <div class="syarat-card"><h4>Usia</h4>
            <p>Usia 17-60 tahun  (usia 17 tahun boleh menjadi donor
            bila mendapat izin tertulis dari orangtua)</p>
        </div>
    </div>
    </div>

    <div id="keuntungan-donor">
        <h2>Keuntungan Donor Darah</h2>
        <div class="keuntungan-container">
            <img src="./images/poster/image 1.png" alt="">
            <div class="keuntungan-info">
                <ul>
                    <li><h4>Menjaga kesehatan jantung</h4></li>
                    <li><p>Kegiatan ini bermanfaat untuk melancarkan aliran darah hingga mencegah penyumbatan arteri. Rajin mendonorkan darah kira-kira mampu menurunkan risiko serangan jantung hingga 88 persen.</p></li>
                    <li><h4>Menjaga kesehatan jantung</h4></li>
                    <li><p>Kegiatan ini bermanfaat untuk melancarkan aliran darah hingga mencegah penyumbatan arteri. Rajin mendonorkan darah kira-kira mampu menurunkan risiko serangan jantung hingga 88 persen.</p></li>
                    <li><h4>Menjaga kesehatan jantung</h4></li>
                    <li><p>Kegiatan ini bermanfaat untuk melancarkan aliran darah hingga mencegah penyumbatan arteri. Rajin mendonorkan darah kira-kira mampu menurunkan risiko serangan jantung hingga 88 persen.</p></li>
                    <li><h4>Menjaga kesehatan jantung</h4></li>
                    <li><p>Kegiatan ini bermanfaat untuk melancarkan aliran darah hingga mencegah penyumbatan arteri. Rajin mendonorkan darah kira-kira mampu menurunkan risiko serangan jantung hingga 88 persen.</p></li>
                    <li><h4>Menjaga kesehatan jantung</h4></li>
                    <li><p>Kegiatan ini bermanfaat untuk melancarkan aliran darah hingga mencegah penyumbatan arteri. Rajin mendonorkan darah kira-kira mampu menurunkan risiko serangan jantung hingga 88 persen.</p></li>
                </ul>
            </div>
        </div>
    </div>

    `;
  },

  async afterRender() {
    const events = await SatuDarahSource.getAllEvent();
    console.log(events);

    // Mengambil dua acara terbaru dari array events
    const latestEvents = events.slice(0, 2);

    const eventContainer = document.getElementById('show-event');
    latestEvents.forEach((event) => {
      console.log(`test${event}`);
      eventContainer.innerHTML += createEventList(event);
    });
  },
};

export default Home;
