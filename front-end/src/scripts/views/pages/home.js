import SatuDarahSource from '../../data/satu-darah-source';
import { createEventList } from './template/template-creator';

const Home = {
  async render() {
    return `
    <div id="hero">
      <div id="gambarhero">
      <div id="img-container">
      <img class="lazyload" data-src="./images/images1.png" alt="Icon-satudarah" id="hero-image">
      </div>
      <div id="hero-text">
        <h1>Satu Darah</h1>
        <p>Menyediakan informasi seputar stok darah dari berbagai lokasi</p>
        <button onclick="location.href='#/stock-darah';">Cari Stock Darah</button>
        </div>
    </div>
    </div>
<h2>Event Terbaru</h2>
<div id="show-event"></div>
<button onclick="redirectToEvent();" class="buttons" style="width: 200px;">Lihat lebih Banyak</button>
    </div>

    <div id="syarat-donor">
        <h2>Syarat donor darah</h2>
    <div class="syarat-container">
        <div class="syarat-card"><h4>Usia</h4>
            <p>Usia 17-60 tahun  (usia 17 tahun boleh menjadi donor
            bila mendapat izin tertulis dari orangtua)</p>
        </div>
        <div class="syarat-card"><h4>Tekanan darah</h4>
            <p>Tekanan darah yang harus dimiliki oleh pendonor berkisar diantara tekanan darah Sistol 100 - 180 dan Diastole 70 - 100</p>
        </div>
        <div class="syarat-card"><h4>Berat Badan</h4>
            <p>Berat badan minimal untuk mendonor darah yaitu 45 Kg.</p>
        </div>
        <div class="syarat-card"><h4>Kadar hemoglobin</h4>
            <p>Kadar hemoglobin diharuskan berkisar diantara 12,5 - 17,0 gr/dl%</p>
        </div>
    </div>
    </div>

    <div id="keuntungan-donor">
        <h2>Keuntungan Donor Darah</h2>
        <div class="keuntungan-container">
            <img class="lazyload" data-src="./images/images3.png" alt="">
            <div class="keuntungan-info">
                <ul>
                    <li><h4>Menjaga kesehatan jantung</h4></li>
                    <li><p>Kegiatan ini bermanfaat untuk melancarkan aliran darah hingga mencegah penyumbatan arteri. Rajin mendonorkan darah kira-kira mampu menurunkan risiko serangan jantung hingga 88 persen.</p></li>
                    <li><h4>Menurunkan risiko kanker</h4></li>
                    <li><p>Pemicu utama sel kanker adalah paparan radikal bebas dalam tubuh. Nah, zat ini biasanya menumpuk di dalam peredaran darah kamu. Dengan melakukannya, risiko kanker pun bisa diminimalisir.</p></li>
                    <li><h4>Donor darah tingkatkan produksi sel darah</h4></li>
                    <li><p>Donor darah bukan berarti bisa mengurang kadar darah yang kamu punya. Justru, kegiatan ini bisa meningkatkan produksi sel darah merah.</p></li>
                    <li><h4>Donor darah dapat turunkan kolesterol</h4></li>
                    <li><p>Dengan mendonorkan darah, secara kadar kolesterol akan berkurang seiring dengan lamanya pendarahan.</p></li>
                   </ul>
            </div>
        </div>
    </div>

    `;
  },

  async afterRender() {
    window.scrollTo(0, 0); // Geser ke bagian atas halaman
    const events = await SatuDarahSource.getAllEvent();

    // Mengambil dua acara terbaru dari array events
    const latestEvents = events.slice(0, 2);

    const eventContainer = document.getElementById('show-event');
    latestEvents.forEach((event) => {
      eventContainer.innerHTML += createEventList(event);
    });
  },
};

export default Home;
