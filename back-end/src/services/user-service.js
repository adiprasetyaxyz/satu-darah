import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import validate from '../validation/validation.js';
import { registerUserValidation, loginUserValidation, getUserValidatin } from '../validation/user-validation.js';
import { prismaClient } from '../application/database.js';
import ResponseError from '../error/response-error.js';

const register = async (request) => {
  const user = validate(registerUserValidation, request);
  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });
  if (countUser === 1) {
    throw new ResponseError(400, 'Username allredy taken');
  }
  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
      accountType: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });
  if (!user) {
    throw new ResponseError(401, 'Username or password wrong');
  }
  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(401, 'Username or password wrong');
  }
  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
      username: true,
    },
  });
};

const get = async (username) => {
  // eslint-disable-next-line no-param-reassign
  username = validate(getUserValidatin, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      name: true,
      accountType: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'user is not found');
  }

  return user;
};

const logout = async (username) => {
  // eslint-disable-next-line no-param-reassign
  username = validate(getUserValidatin, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'user is not found');
  }

  return prismaClient.user.update({
    where: {
      username,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    },
  });
};
export default {
  register,
  login,
  get,
  logout,
};
