const runBackgroundCommand = require("./runBackgroundCommand");

module.exports = test => {
  let mockServerCommand;

  test.before.cb(t => {
    t.timeout(3000);

    mockServerCommand = runBackgroundCommand({
      command: "mockayo test/testFiles/config.js",
      onStdout: data => {
        if (data.includes("Mock server is running")) {
          t.end();
        }
      },
      onStderr: error => {
        setTimeout(() => {
          // allow error messages to appear before killing the server (would result in ECONNRESET on fetch otherwise)
          mockServerCommand.stop();
          t.fail(error);
        }, 100);
      }
    });
  });

  test.after.always(() => {
    mockServerCommand.stop();
  });
};
