const chai = require("chai");
const expect = chai.expect;
const api = require("../api/fazztrackApi");
// const scenarioCreateUser = require("../scenarios/createUser");
const scenarioGetUserById = require("../scenarios/getUserById");
const scenarioUpdateUser = require("../scenarios/updateUser");
const requestBody = require("../data/create-user.json");
const getUserIdSchema = require("../schemas/getUserIdSchema.json");
const updateSchema = require("../schemas/updateSchema.json");

//urutan matters
chai.use(require("chai-like"));
chai.use(require("chai-things"));
chai.use(require("chai-json-schema"));

// MOCHA FRAMEWORK TEST

// Get User By Id
describe(`${scenarioGetUserById.testcaseGetUserById.description}`, async () => {
  let id = "";
  before(async () => {
    let response = await api.postUser(requestBody);
    id = response.body.id;
    expect(response.status).to.equal(200);
  });

  afterEach(async () => {
    response = await api.deleteUser(id);
  });

  it(`${scenarioGetUserById.testcaseGetUserById.positive.case1}`, async () => {
    let nama = requestBody.firstName;
    response = await api.getUserById(id);
    let bodyData = response.body;

    expect(response.status).to.equal(200);
    expect(bodyData.firstName).to.equal(nama);
    expect(bodyData.id).to.equal(id);
    expect(response.body).has.jsonSchema(getUserIdSchema);
  });

  it(`${scenarioGetUserById.testcaseGetUserById.negative.case1}`, async () => {
    id = requestBody.id;
    let response = await api.getUserById(id);

    expect(response.status).to.equal(400);
    expect(response.statusCode).to.equal(400);
  });
});

// Update User
describe(`${scenarioUpdateUser.testcaseUpdateUser.description}`, async () => {
  let id = "";
  let bodyData;
  beforeEach(async () => {
    let response = await api.postUser(requestBody);
    id = response.body.id;
    bodyData = response.body;
    expect(response.status).to.equal(200);
  });

  afterEach(async () => {
    response = await api.deleteUser(id);
  });

  it(`${scenarioUpdateUser.testcaseUpdateUser.positive.case1}`, async () => {
    bodyData.occupation = "guru";
    bodyData.nationality = "inggris";
    response = await api.updateUser(bodyData);

    expect(response.status).to.equal(200);
    expect(response.body.occupation).to.equal("guru");
    expect(response.body.nationality).to.equal("inggris");
    expect(response.body).has.jsonSchema(updateSchema);
  });

  it(`${scenarioUpdateUser.testcaseUpdateUser.negative.case1}`, async () => {
    bodyData.age = 0;
    response = await api.updateUser(bodyData);

    expect(response.status).to.equal(400);
    expect(response.body.errorCode).to.equal("ER-03");
  });

  it(`${scenarioUpdateUser.testcaseUpdateUser.negative.case2}`, async () => {
    bodyData.hobbies = [];
    response = await api.updateUser(bodyData);

    expect(response.status).to.equal(400);
    expect(response.body.errorCode).to.equal("ER-03");
  });

  it(`${scenarioUpdateUser.testcaseUpdateUser.negative.case3}`, async () => {
    bodyData.id = null;
    response = await api.updateUser(bodyData);

    expect(response.status).to.equal(404);
    expect(response.body.errorCode).to.equal("ER-01");
  });
});
