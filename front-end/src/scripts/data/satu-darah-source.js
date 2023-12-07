import axios from 'axios';
import token from '../utils/token';

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
      const response = await axios.get('http://localhost:3000/api/list', axiosConfig);
      console.log(response.status);
      const { events } = response.data;
      return events || [];
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
      const response = await axios.get('http://localhost:3000/api/users/current', axiosConfig);
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
      const response = await axios.post('http://localhost:3000/api/events/', eventData, axiosConfig);
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
      const response = await axios.delete('http://localhost:3000/api/users/logout', axiosConfig);
      console.log(response.status);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
  }
}

export default SatuDarahSource;
