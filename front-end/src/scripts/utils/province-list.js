const ProvinceList = () => {
  const provinces = [
    'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Jambi', 'Sumatera Selatan', 'Bengkulu', 'Lampung',
    'Kepulauan Bangka Belitung', 'Kepulauan Riau', 'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta',
    'Jawa Timur', 'Banten', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Kalimantan Barat',
    'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara', 'Sulawesi Utara',
    'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat', 'Maluku',
    'Maluku Utara', 'Papua Barat', 'Papua',
  ];
  const provinceDropdown = document.getElementById('province-dropdown');
  provinces.forEach((province) => {
    const option = document.createElement('option');
    option.value = province;
    option.text = province;
    provinceDropdown.appendChild(option);
  });
};
export default ProvinceList;
