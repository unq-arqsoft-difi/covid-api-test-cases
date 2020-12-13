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

function saveToken(requestParams, response, context, ee, next) {
  if (response.statusCode === 200) {
    const token = response.body.token;
    context.vars.token = token;
  }
  return next();
}

/* eslint-disable no-param-reassign */
function generateRandomData(context, events, done) {
  // generate data with Faker:
  const name = `${Faker.name.firstName()} ${Faker.name.lastName()}`;
  const email = Faker.internet.exampleEmail();
  const pass = Faker.internet.password();
  // add variables to virtual user's context:
  context.vars.name = name;
  context.vars.email = email;
  context.vars.pass = pass;
  // continue with executing the scenario:
  return done();
}

async function fetchRegisterData(context, events, done) {
  const area = api.get("/support/areas").then((res) => {
    context.vars.areaId = res.data[randomIndex(res.data.length)].id;
  });
  const institution = api.get("/support/institutions").then((res) => {
    context.vars.institutionId = res.data[randomIndex(res.data.length)].id;
  });
  const province = api.get("/support/provinces").then((res) => {
    context.vars.provinceId = res.data[randomIndex(res.data.length)].id;
  });

  await Promise.all([area, institution, province]);
  const response = await api.get(
    `/support/provinces/${context.vars.provinceId}?include=towns`
  );
  context.vars.townId = response.data.towns[0].id;
  done();
}

async function fetchSupplyId(context, events, done) {
  await api.get("/support/supplies").then((res) => {
    context.vars.supplyId = res.data[randomIndex(res.data.length)].id;
  });
  done();
}

module.exports = {
  fetchSupplyId,
  fetchRegisterData,
  generateRandomData,
  printErrorStatus,
  saveToken,
};
