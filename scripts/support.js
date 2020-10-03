const logStep = (number, status, expected) => {
  const statusOK = status === expected;
  const message = statusOK ? 'OK' : `FAIL: expected ${expected}, got ${status}`;
  console.log(`> STEP ${number}: ${message}`);
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = { logStep, sleep };
