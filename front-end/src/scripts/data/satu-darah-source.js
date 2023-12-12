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
    console.log(`token:${token}`);
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}api/list`, axiosConfig);
      console.log(response.status);
      const { events } = response.data;
      console.log(response.data);
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
    console.log(`token:${token}`);
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}events/${eventId}`, axiosConfig);
      console.log(response.status);
      const { events } = response.data;
      console.log(response.data);
      return events || [];
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
      console.log(response.status);
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
    console.log(`token:${token}`);
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}api/blood-stocks`, axiosConfig);
      const bloodStocks = response.data.bloodStock;

      console.log(bloodStocks); // Menampilkan data bloodStock ke konsol

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
    console.log(`token:${token}`);
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}api/users/current`, axiosConfig);
      console.log(response.status);
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
      console.log(response.status);
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
      console.log(response.status);
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
      console.log(response.status);
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
      console.log(response.status);
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
      console.log(response.status);
      return response.data; // Mengembalikan data dari server jika diperlukan
    } catch (error) {
      console.error('Error updating blood stock:', error);
      throw new Error('Failed to update blood stock');
    }
  }
}

export default SatuDarahSource;
