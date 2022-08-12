const testcaseUpdateUser = {
  description: "[@updateUser] Update User API Test",
  positive: {
    case1:
      "[@positive] User berhasil mengupdate data Occupation dan Nationality, return status code 200",
  },
  negative: {
    case1:
      "[@negative] User gagal mengupdate data ketika age bernilai 0, return status code 400",
    case2:
      "[@negative] User gagal mengupdate data ketika data hobbies merupakan empty array, return status code 400",
    case3:
      "[@negative] User gagal mengupdate data ketika data id null, return status code 400",
  },
};

module.exports = {
  testcaseUpdateUser,
};
