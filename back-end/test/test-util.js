import bcrypt from 'bcrypt';
import { prismaClient } from '../src/application/database.js';

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: 'test',
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: 'test',
      password: await bcrypt.hash('test', 10),
      name: 'test',
      accountType: 'user',
      token: 'test',
    },
  });
};

export const getTestUser = async () => prismaClient.user.findUnique({
  where: {
    username: 'test',
  },
});

export const removeAllTestEvent = async () => {
  await prismaClient.event.deleteMany({
    where: {
      username: 'test',
    },
  });
};

export const createTestEvent = async () => {
  await prismaClient.event.create({
    data: {
      bloodProvider: 'Test Blood Provider',
      region: 'Test Region',
      date: new Date().toISOString(), // Gunakan tanggal sekarang
      time: '08:00 AM',
      location: 'Test Location',
      capacity: 50,
      registered: 0,
      username: 'test', // Sesuaikan dengan username yang benar
    },
  });
};

export const getTestEvent = async () => prismaClient.event.findFirst({
  where: {
    username: 'test',
  },
});
