/**
 * Test Case 4
 *
 * Steps:
 *  1. Registration
 *  2. Login OK & Get Token
 *  3. Create Request Supply
 *  4. Login Admin & Get Token
 *  5. Admin Reject Request Supply
 *  6. View Request Supplies
 */

require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));
const api = require('../lib/api');
const { logStep, sleep } = require('./support');

async function runCase(options = {}) {
  let data;
  let token;
  let tokenAdmin;
  let headers;
  const ms = options.delay || 100; // time in ms to wait after each request

  console.log('Running Test Case 5');

  // Step 1: Registration
  data = {
    firstName: 'Jaime',
    lastName: 'Lannister',
    email: 'jaime@casterly-rock.com',
    phone: '+54 11 4444-5555',
    institutionId: '10020012215215',
    job: 'King slayer',
    provinceId: '02',
    townId: '02028010001',
    pass: 'hand-off',
  };
  await api.post('/users', data)
    .then(response => logStep(1, response.status, 201))
    .catch(error => logStep(1, error.response.status, 201));
  await sleep(ms);

  // Step 2: Login OK & Get Token
  data = { email: 'jaime@casterly-rock.com', pass: 'hand-off' };
  await api.post('/session', data)
    .then((response) => {
      token = response.data.token;
      logStep(2, response.status, 200);
    })
    .catch(error => logStep(2, error.response.status, 200));
  await sleep(ms);

  // Step 3: Create Request Supply
  let requestSupply;
  headers = { Authorization: `Bearer ${token}` };
  data = { supplyId: 1, areaId: 2, amount: 3 };
  await api.post('/request-supplies', data, { headers })
    .then((response) => {
      requestSupply = response.data.request;
      logStep(3, response.status, 201);
    })
    .catch(error => logStep(3, error.response.status, 201));
  await sleep(ms);

  // Step 4: Login Admin & Get Token
  data = { email: 'admin@difi.com', pass: process.env.ADMIN_PASS };
  await api.post('/session', data)
    .then((response) => {
      tokenAdmin = response.data.token;
      logStep(2, response.status, 200);
    })
    .catch(error => logStep(2, error.response.status, 200));
  await sleep(ms);

  // Step 5: Admin Reject Request Supply
  headers = { Authorization: `Bearer ${tokenAdmin}` };
  data = { status: 'Rejected' };
  await api.patch(`/request-supplies/${requestSupply.id}`, data, { headers })
    .then(response => logStep(3, response.status, 200))
    .catch(error => logStep(3, error.response.status, 200));
  await sleep(ms);

  // Step 6: View Request Supplies
  headers = { Authorization: `Bearer ${token}` };
  await api.get('/request-supplies', { headers })
    .then(response => logStep(4, response.status, 200))
    .catch(error => logStep(4, error.response.status, 200));
  await sleep(ms);
}

runCase({ delay: argv.delay });
