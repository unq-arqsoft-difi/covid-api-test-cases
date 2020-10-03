/**
 * Test Case 2
 *
 * Steps:
 *  1. Failed Login
 *  2. Successful Registration
 *  3. Login OK & Get Token
 *  4. Create Request Supply
 *  5. Cancel Request Supply
 */

const argv = require('minimist')(process.argv.slice(2));
const api = require('../lib/api');
const { logStep, sleep } = require('./support');

async function runCase(options = {}) {
  let data;
  let token;
  let headers;
  const ms = options.delay || 100; // time in ms to wait after each request

  console.log('Running Test Case 2');

  // Step 1: Failed Login
  data = { email: 'arya.stark@nobody.org', pass: 'braavos' };
  await api.post('/session', {})
    .then(response => logStep(1, response.status, 400))
    .catch(error => logStep(1, error.response.status, 400));
  await sleep(ms);

  // Step 2: Successful Registration
  data = {
    firstName: 'Arya',
    lastName: 'Stark',
    email: 'arya.stark@nobody.org',
    phone: '+54 11 4444-5555',
    institutionId: '10020012215215',
    job: 'Espadachín',
    provinceId: '02',
    townId: '02028010001',
    pass: 'braavos',
  };
  await api.post('/users', data)
    .then(response => logStep(2, response.status, 201))
    .catch(error => logStep(2, error.response.status, 201));
  await sleep(ms);

  // Step 3: Login OK & Get Token
  data = { email: 'arya.stark@nobody.org', pass: 'braavos' };
  await api.post('/session', data)
    .then((response) => {
      token = response.data.token;
      logStep(3, response.status, 200);
    })
    .catch(error => logStep(3, error.response.status, 200));
  await sleep(ms);

  // Step 4: Create Request Supply
  let requestSupply;
  headers = { Authorization: `Bearer ${token}` };
  data = { supplyId: 1, areaId: 2, amount: 3 };
  await api.post('/request-supplies', data, { headers })
    .then((response) => {
      requestSupply = response.data.request;
      logStep(4, response.status, 201);
    })
    .catch(error => logStep(4, error.response.status, 201));
  await sleep(ms);

  // Step 5: Cancel Request Supply
  headers = { Authorization: `Bearer ${token}` };
  await api.delete(`/request-supplies/${requestSupply.id}`, { headers })
    .then(response => logStep(5, response.status, 200))
    .catch(error => logStep(5, error.response.status, 200));
  await sleep(ms);
}

runCase({ delay: argv.delay });
