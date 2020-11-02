/* eslint-disable import/no-extraneous-dependencies */
const Faker = require('faker');

function printErrorStatus(requestParams, response, context, ee, next) {
  if (response.statusCode === 400) {
    console.info(`${response.req.path}: ${response.statusCode}`);
    console.info(response.body);
  }
  return next();
}

/* eslint-disable no-param-reassign */
function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  const name = `${Faker.name.firstName()} ${Faker.name.lastName()}`;
  const email = Faker.internet.exampleEmail();
  const pass = Faker.internet.password();
  // add variables to virtual user's context:
  userContext.vars.name = name;
  userContext.vars.email = email;
  userContext.vars.pass = pass;
  // continue with executing the scenario:
  return done();
}

module.exports = {
  printErrorStatus,
  generateRandomData,
};
