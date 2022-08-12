const chai = require("chai");
const expect = chai.expect;
const api = require("../api/fazztrackApi");
const scenarioCreateUser = require("../scenarios/createUser");
const scenarioGetUserById = require("../scenarios/getUserById");
const scenarioUpdateUser = require("../scenarios/updateUser");
const requestBody = require("../data/create-user.json");

//urutan matters
chai.use(require("chai-like"));
chai.use(require("chai-things"));

// MOCHA FRAMEWORK TEST

// create user
// describe(`${scenarioCreateUser.testcaseCreateUser.description}`, async () => {
//   it(`${scenarioCreateUser.testcaseCreateUser.positive.case1}`, async () => {
//     let nama = requestBody.firstName;
//     let response = await api.postUser(requestBody);
//     let bodyData = response.body;

//     expect(response.status).to.equal(200);
//     expect(bodyData.firstName).to.equal(nama);
//     expect(bodyData.id).not.to.be.null;

//     // Additional Assertion
//     response = await api.getUser(nama);
//     bodyData = response.body;
//     expect(response.status).to.equal(200);

//     for (let index = 0; index < bodyData.data.length; index += 1) {
//       expect(bodyData.data[index].firstName.toLowerCase()).to.equal(
//         nama.toLowerCase()
//       );
//     }
//   });
// });

// Get User By Id
describe(`${scenarioGetUserById.testcaseGetUserById.description}`, async () => {
  it(`${scenarioGetUserById.testcaseGetUserById.positive.case1}`, async () => {
    let nama = requestBody.firstName;
    let response = await api.postUser(requestBody);
    let bodyData = response.body;
    response = await api.getUserById(bodyData.id);

    expect(response.status).to.equal(200);
    expect(bodyData.firstName).to.equal(nama);
    expect(bodyData.id).to.equal(bodyData.id);

    // delete data
    response = await api.deleteUser(bodyData.id);

    console.log(bodyData);
  });

  it(`${scenarioGetUserById.testcaseGetUserById.negative.case1}`, async () => {
    let id = requestBody.id;
    let response = await api.getUserById(id);

    expect(response.status).to.equal(400);
    expect(response.statusCode).to.equal(400);
  });
});

// Update User
describe(`${scenarioUpdateUser.testcaseUpdateUser.description}`, async () => {
  it(`${scenarioUpdateUser.testcaseUpdateUser.positive.case1}`, async () => {
    let response = await api.postUser(requestBody);
    let bodyData = response.body;
    bodyData.occupation = "guru";
    bodyData.nationality = "inggris";
    response = await api.updateUser(bodyData);

    expect(response.status).to.equal(200);
    expect(response.body.occupation).to.equal("guru");
    expect(response.body.nationality).to.equal("inggris");
    // delete data
    response = await api.deleteUser(bodyData.id);
  });

  it(`${scenarioUpdateUser.testcaseUpdateUser.negative.case1}`, async () => {
    let response = await api.postUser(requestBody);
    let bodyData = response.body;
    bodyData.age = 0;
    response = await api.updateUser(bodyData);

    expect(response.status).to.equal(400);
    expect(response.body.errorCode).to.equal("ER-03");

    // delete data
    response = await api.deleteUser(bodyData.id);
  });

  it(`${scenarioUpdateUser.testcaseUpdateUser.negative.case2}`, async () => {
    let response = await api.postUser(requestBody);
    let bodyData = response.body;
    bodyData.hobbies = [];
    response = await api.updateUser(bodyData);

    expect(response.status).to.equal(400);
    expect(response.body.errorCode).to.equal("ER-03");
    // delete data
    response = await api.deleteUser(bodyData.id);
  });

  it(`${scenarioUpdateUser.testcaseUpdateUser.negative.case3}`, async () => {
    let response = await api.postUser(requestBody);
    let bodyData = response.body;
    bodyData.id = "";
    response = await api.updateUser(bodyData);

    expect(response.status).to.equal(404);
    expect(response.body.errorCode).to.equal("ER-01");

    // delete data
    response = await api.deleteUser(bodyData.id);
  });
});
