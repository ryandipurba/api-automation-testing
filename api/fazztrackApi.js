const httpCaller = require("supertest");
const serverAPI = httpCaller("http://localhost:1234");

function getUser(inputNama) {
  return serverAPI
    .get(`/v1/users`)
    .query({
      name: inputNama,
    })
    .set("Connection", "keep-alive")
    .set("Content-type", "application/json");
}

function postUser(bodyRequestData) {
  return serverAPI
    .post("/v1/users")
    .set("Connection", "keep-alive")
    .set("Content-type", "application/json")
    .send(bodyRequestData);
}

function updateUser(bodyRequestData) {
  return serverAPI
    .put("/v1/users")
    .set("Connection", "keep-alive")
    .set("Content-type", "application/json")
    .send(bodyRequestData);
}

function getUserById(id) {
  return serverAPI
    .get(`/v1/users/${id}`)
    .set("Connection", "keep-alive")
    .set("Content-type", "application/json");
}

function deleteUser(id) {
  return serverAPI
    .delete(`/v1/users/${id}`)
    .set("Connection", "keep-alive")
    .set("Content-type", "application/json");
}

module.exports = {
  getUser,
  postUser,
  getUserById,
  deleteUser,
  updateUser,
};
