/**
 * Test Case 1
 *
 * Steps:
 *  1. Failed Registration
 *  2. Successful Registration
 *  3. Login & Get Token
 *  4. View Request Supplies
 *  5. Create Request Supply
 */

const api = require('../lib/api');
const { logStep, sleep } = require('./support');

async function runCase(options = {}) {
  let data;
  let headers;
  const ms = options.delay || 100; // time in ms to wait after each request

  console.log('Running Test Case 1');

  // Step 1: Failed Registration
  await api.post('/users', {})
    .then(response => logStep(1, response.status, 400))
    .catch(error => logStep(1, error.response.status, 400));
  await sleep(ms);

  // Step 2: Successful Registration
  data = {
    firstName: 'Jon',
    lastName: 'Snow',
    email: 'jon.snow@winterfell.com',
    phone: '+54 11 4444-5555',
    institutionId: '10020012215215',
    job: 'Enfermero',
    provinceId: '02',
    townId: '02028010001',
    pass: '1234',
  };
  await api.post('/users', data)
    .then(response => logStep(2, response.status, 201))
    .catch(error => logStep(2, error.response.status, 201));
  await sleep(ms);

  // Step 3: Login & Get Token
  let token;
  data = { email: 'jon.snow@winterfell.com', pass: '1234' };
  await api.post('/session', data)
    .then((response) => {
      token = response.data.token;
      logStep(3, response.status, 200);
    })
    .catch(error => logStep(3, error.response.status, 200));
  await sleep(ms);

  // Step 4: View Request Supplies
  headers = { Authorization: `Bearer ${token}` };
  await api.get('/request-supplies', { headers })
    .then(response => logStep(4, response.status, 200))
    .catch(error => logStep(4, error.response.status, 200));
  await sleep(ms);

  // Step 5: Create Request Supply
  headers = { Authorization: `Bearer ${token}` };
  data = { supplyId: 1, areaId: 2, amount: 3 };
  await api.post('/request-supplies', data, { headers })
    .then(response => logStep(5, response.status, 201))
    .catch(error => logStep(5, error.response.status, 201));
  await sleep(ms);
}

runCase();
