require('dotenv').config();
const axios = require('axios');

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

module.exports = {
  api: instance,
};
