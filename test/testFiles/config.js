module.exports = {
  baseDirectory: "./test/testFiles/mocks",
  port: 5000,
  mocks: [
    {
      name: "Get users",
      method: "GET",
      url: "/users",
      directory: "get-users"
    },
    {
      name: "Add user",
      method: "POST",
      url: "/users",
      directory: "add-user"
    }
  ]
};
