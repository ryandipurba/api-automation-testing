const testcaseGetUserById = {
  description: "[@getUserId] Get User by id API Test",
  positive: {
    case1:
      "[@positive] User menggunakan data user id yang valid, return status code 200",
  },
  negative: {
    case1:
      "[@negative] User gagal mendapatkan data ketika data id yang diinputkan invalid , return status code 404",
  },
};

module.exports = {
  testcaseGetUserById,
};
