const About = {
  async render() {
    return `
    <div class="aboutUs">
    <h2>History</h2>
    <h3>Kami merupakan partisipan dari Dicoding Bootcamp dengan kode CB23-PS010. Demi mewujudkan informasi
        faktual dan cepat mengenai stok darah ini, kami bekerja sama sebagai tim mencoba untuk membuat website
        “Satu Darah” sebagai bentuk penyelesaian terhadap permasalahan tersebut</h3>
</div>

<div class="tujuan">
    <h2>Tujuan Kami</h2>
    <h3>Menyediakan akses gratis serta informasi akurat mengenai adanya stok darah merupakan tujuan dari
        pembuatan website ini. Sebagai tim developer, kami berpartisipasi dalam pengembangan website “Satu
        Darah” sehingga pengguna dapat memperoleh informasi mengenai stok darah dari berbagai lokasi di
        Indonesia.</h3>
</div>
<h2 id="ourTeam">Our Team</h2>

<div class="icon-container">
    <div class="icon">
        <i class="fa-solid fa-circle-user" style="color: #bd2222; font-size: 5em;"></i>
        <p>Aldorino Muharram</p>
    </div>
    <div class="icon">
        <i class="fa-solid fa-circle-user" style="color: #bd2222; font-size: 5em;"></i>
        <p>Adi Prasetyawan</p>
    </div>
    <div class="icon">
        <i class="fa-solid fa-circle-user" style="color: #bd2222; font-size: 5em;"></i>
        <p>Fredrik Muda Sinaga</p>
    </div>
</div>
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
  },
};

export default About;
