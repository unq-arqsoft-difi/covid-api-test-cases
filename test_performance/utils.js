/* eslint-disable import/no-extraneous-dependencies */
const Faker = require("faker");
const api = require("../lib/api");

/* Private */
function randomIndex(length) {
  return Math.floor(Math.random() * length);
}

/* Public */

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

async function fetchRegisterData(userContext, events, done) {
  const area = api.get("/support/areas").then((res) => {
    userContext.vars.areaId = res.data[randomIndex(res.data.length)].id;
  });
  const institution = api.get("/support/institutions").then((res) => {
    userContext.vars.institutionId = res.data[randomIndex(res.data.length)].id;
  });
  const province = api.get("/support/provinces").then((res) => {
    userContext.vars.provinceId = res.data[randomIndex(res.data.length)].id;
  });

  return Promise.all([area, institution, province])
    .then(() => {
      api
        .get(`/support/provinces/${userContext.vars.provinceId}?include=towns`)
        .then((res) => {
          userContext.vars.townId = res.data.towns[0].id;
          done();
        });
    })
    .catch((error) => console.error(error));
}

module.exports = {
  fetchRegisterData,
  generateRandomData,
  printErrorStatus,
};
