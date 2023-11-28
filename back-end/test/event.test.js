import supertest from 'supertest';
import { web } from '../src/application/web.js';
import {
  createTestEvent, createTestUser, getTestEvent, removeAllTestEvent, removeTestUser,
} from './test-util.js';

describe('POST /api/events', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestEvent(); // Ganti fungsi untuk menghapus event
    await removeTestUser();
  });

  it('should can create new event', async () => {
    const result = await supertest(web)
      .post('/api/events') // Ubah endpoint ke '/api/events' sesuai kebutuhan
      .set('Authorization', 'test')
      .send({
        bloodProvider: 'Test Blood Provider', // Ubah sesuai field yang diperlukan
        region: 'Test Region',
        date: '2023-12-01T08:00:00.000Z', // Ubah sesuai tanggal yang diperlukan
        time: '08:00 AM',
        location: 'Test Location',
        capacity: 50,
        registered: 0,
        username: 'test',
      });
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.bloodProvider).toBe('Test Blood Provider');
    expect(result.body.data.region).toBe('Test Region');
    expect(result.body.data.date).toBe('2023-12-01T08:00:00.000Z'); // Sesuaikan dengan format tanggal yang diharapkan
    expect(result.body.data.time).toBe('08:00 AM');
    expect(result.body.data.location).toBe('Test Location');
    expect(result.body.data.capacity).toBe(50);
    expect(result.body.data.registered).toBe(0);
    expect(result.body.data.username).toBe('test');
  });

  it('should reject if request is not valid', async () => {
    const result = await supertest(web)
      .post('/api/events')
      .set('Authorization', 'test')
      .send({
        // Data yang tidak valid untuk memeriksa pengembalian respons yang sesuai
        bloodProvider: '', // Harusnya tidak boleh kosong
        region: 'Test Region',
        date: '2023-12-01T08:00:00.000Z', // Data tanggal yang valid
        time: '08:00 AM',
        location: 'Test Location',
        capacity: 50,
        registered: -1, // Nilai yang tidak valid, seharusnya tidak boleh negatif
        username: 'test',
      });

    expect(result.status).toBe(400); // Harapannya adalah respons 400 Bad Request
    expect(result.body.errors).toBeDefined();
    // Harapannya adalah terdapat properti 'errors' dalam body respons
  });
});

describe('GET /api/events/:eventId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestEvent(); // Fungsi untuk membuat event test
  });

  afterEach(async () => {
    await removeAllTestEvent(); // Fungsi untuk menghapus semua event test
    await removeTestUser();
  });

  it('should can get event', async () => {
    const testEvent = await getTestEvent();

    const result = await supertest(web)
      .get(`/api/events/${testEvent.id}`) // Ubah sesuai dengan endpoint yang benar
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testEvent.id);
    // Lakukan assertion untuk properti lainnya sesuai dengan yang diharapkan
    expect(result.body.data.bloodProvider).toBe(testEvent.bloodProvider);
    expect(result.body.data.region).toBe(testEvent.region);
    expect(result.body.data.time).toBe(testEvent.time);
    expect(result.body.data.location).toBe(testEvent.location);
    expect(result.body.data.capacity).toBe(testEvent.capacity);
    expect(result.body.data.registered).toBe(testEvent.registered);
    expect(result.body.data.username).toBe(testEvent.username);
  });
});
