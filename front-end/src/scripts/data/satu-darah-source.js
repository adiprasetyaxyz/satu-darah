import axios from 'axios';
import token from '../utils/token';
import CONFIG from '../globals/config';

class SatuDarahSource {
  static async getAllEvent() {
    // Membuat konfigurasi Axios dengan token sebagai header Authorization
    const axiosConfig = {
      headers: {
        Authorization: token, // Menambahkan token ke header Authorization dengan skema "Bearer"
      },
    };
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}api/list`, axiosConfig);
      const { events } = response.data;
      return events || [];
    } catch (error) {
      // Menangani kesalahan yang terjadi saat melakukan permintaan
      console.error('Error fetching events:', error);
      return []; // Mengembalikan array kosong jika terjadi kesalahan
    }
  }

  static async getEvent(eventId) {
    // Membuat konfigurasi Axios dengan token sebagai header Authorization
    const axiosConfig = {
      headers: {
        Authorization: token, // Menambahkan token ke header Authorization dengan skema "Bearer"
      },
    };
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}api/events/${eventId}`, axiosConfig);
      return response.data || [];
    } catch (error) {
      // Menangani kesalahan yang terjadi saat melakukan permintaan
      console.error('Error fetching events:', error);
      return []; // Mengembalikan array kosong jika terjadi kesalahan
    }
  }

  static async deleteEvent(eventId) {
    const axiosConfig = {
      headers: {
        Authorization: token, // Menambahkan token ke header Authorization dengan skema "Bearer"
      },
    };

    try {
      const response = await axios.delete(`${CONFIG.BASE_URL}api/events/${eventId}`, axiosConfig);

      return response.data; // Mengembalikan data dari server jika diperlukan
    } catch (error) {
      // Menangani kesalahan yang terjadi saat melakukan permintaan
      console.error('Error deleting event:', error);
      throw new Error('Failed to delete event');
    }
  }

  static async getAllstock() {
    // Membuat konfigurasi Axios dengan token sebagai header Authorization
    const axiosConfig = {
      headers: {
        Authorization: token, // Menambahkan token ke header Authorization dengan skema "Bearer"
      },
    };

    try {
      const response = await axios.get(`${CONFIG.BASE_URL}api/blood-stocks`, axiosConfig);
      const bloodStocks = response.data.bloodStock;

      return bloodStocks || [];
    } catch (error) {
      // Menangani kesalahan yang terjadi saat melakukan permintaan
      console.error('Error fetching events:', error);
      return []; // Mengembalikan array kosong jika terjadi kesalahan
    }
  }

  static async getUser() {
    const axiosConfig = {
      headers: {
        Authorization: token, // Menambahkan token ke header Authorization dengan skema "Bearer"
      },
    };
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}api/users/current`, axiosConfig);
      const { data } = response.data;
      return data;
    } catch (error) {
      // Menangani kesalahan yang terjadi saat melakukan permintaan
      console.error('Error fetching events:', error);
      return []; // Mengembalikan array kosong jika terjadi kesalahan
    }
  }

  static async createEvent(eventData) {
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(`${CONFIG.BASE_URL}api/events/`, eventData, axiosConfig);
      return response.data; // Mengembalikan data event yang dibuat dari server jika diperlukan
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
  }

  static async createStock(stockData) {
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(`${CONFIG.BASE_URL}api/blood-stocks/`, stockData, axiosConfig);
      return response.data; // Mengembalikan data event yang dibuat dari server jika diperlukan
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
  }

  static async logout() {
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.delete(`${CONFIG.BASE_URL}api/users/logout`, axiosConfig);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
  }

  static async deleteBloodStock(bloodstockId) {
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.delete(`${CONFIG.BASE_URL}api/blood-stocks/${bloodstockId}`, axiosConfig);
      return response.data; // Mengembalikan data dari server jika diperlukan
    } catch (error) {
      console.error('Error deleting blood stock:', error);
      throw new Error('Failed to delete blood stock');
    }
  }

  static async updateBloodStock(bloodstockId, updatedData) {
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.put(`${CONFIG.BASE_URL}api/blood-stocks/${bloodstockId}`, updatedData, axiosConfig);
      return response.data; // Mengembalikan data dari server jika diperlukan
    } catch (error) {
      console.error('Error updating blood stock:', error);
      throw new Error('Failed to update blood stock');
    }
  }

  static async searchEvent(searchQuery) {
    let apiUrl = `${CONFIG.BASE_URL}api/list/search`;
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
      params: {},
    };

    // Jika query pencarian tidak kosong, tambahkan parameter pencarian
    if (searchQuery) {
      axiosConfig.params.region = searchQuery;
    } else {
      // Jika query pencarian kosong, kosongkan parameter pencarian
      axiosConfig.params = {};
      apiUrl = `${CONFIG.BASE_URL}api/list`;
    }

    try {
      const response = await axios.get(apiUrl, axiosConfig);
      const { events } = response.data;
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  static async searchStock(searchQuery) {
    let apiUrl = `${CONFIG.BASE_URL}api/blood-stocks/search`;
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
      params: {},
    };

    // Jika query pencarian tidak kosong, tambahkan parameter pencarian
    if (searchQuery) {
      axiosConfig.params.region = searchQuery;
    } else {
      // Jika query pencarian kosong, kosongkan parameter pencarian
      axiosConfig.params = {};
      apiUrl = `${CONFIG.BASE_URL}api/blood-stocks`;
    }

    try {
      const response = await axios.get(apiUrl, axiosConfig);
      return response.data;
    } catch (error) {
      console.error('Error fetching stocks:', error);
      return [];
    }
  }

  static async registerEvent(eventId, registerData) {
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(`${CONFIG.BASE_URL}api/events/${eventId}/register`, registerData, axiosConfig);
      return response.data; // Return registered event data from the server if needed
    } catch (error) {
      console.error('Error registering event:', error);
      throw new Error('Failed to register event');
    }
  }

  static async getRegisterEvent(eventId, registerId) {
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.get(`${CONFIG.BASE_URL}api/events/${eventId}/register/${registerId}`, axiosConfig);
      return response.data; // Return register details data from the server if needed
    } catch (error) {
      console.error('Error fetching register details:', error);
      throw new Error('Failed to fetch register details');
    }
  }

  static async getAllRegisterEvent(eventId) {
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.get(`${CONFIG.BASE_URL}api/events/${eventId}/register/`, axiosConfig);
      return response.data;
    } catch (error) {
      console.error('Error fetching all registers:', error);
      throw new Error('Failed to fetch all registers');
    }
  }
}

export default SatuDarahSource;
