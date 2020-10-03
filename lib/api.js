require('dotenv').config();
const axios = require('axios');

module.exports = axios.create({
  baseURL: process.env.API_URL,
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
