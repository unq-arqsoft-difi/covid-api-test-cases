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

const logStatus = (number, status, expected) => {
  const statusOK = status === expected;
  const message = statusOK ? 'OK' : `FAIL: expected ${expected}, got ${status}`;
  console.log(`> STEP ${number}: ${message}`);
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runCase() {
  let data;
  let headers;

  console.log('Running Test Case 1');

  // Step 1: Failed Registration
  await api.post('/users', {})
    .then(response => logStatus(1, response.status, 400))
    .catch(error => logStatus(1, error.response.status, 400));
  await sleep(100);

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
    .then(response => logStatus(2, response.status, 201))
    .catch(error => logStatus(2, error.response.status, 201));
  await sleep(100);

  // Step 3: Login & Get Token
  let token;
  data = { email: 'jon.snow@winterfell.com', pass: '1234' };
  await api.post('/session', data)
    .then((response) => {
      token = response.data.token;
      logStatus(3, response.status, 200);
    })
    .catch(error => logStatus(3, error.response.status, 200));
  await sleep(100);

  // Step 4: View Request Supplies
  headers = { Authorization: `Bearer ${token}` };
  await api.get('/request-supplies', { headers })
    .then(response => logStatus(4, response.status, 200))
    .catch(error => logStatus(4, error.response.status, 200));
  await sleep(100);

  // Step 5: Create Request Supply
  headers = { Authorization: `Bearer ${token}` };
  data = { supplyId: 1, areaId: 2, amount: 3 };
  await api.post('/request-supplies', data, { headers })
    .then(response => logStatus(5, response.status, 201))
    .catch(error => logStatus(5, error.response.status, 201));
  await sleep(100);
}

runCase();
