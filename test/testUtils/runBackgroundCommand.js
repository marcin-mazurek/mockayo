const { spawn } = require("child_process");

module.exports = ({ command, onStdout, onStderr }) => {
  const [commandName, ...args] = command.split(" ");
  const subprocess = spawn(commandName, [...args]);

  subprocess.stderr.on("data", data => {
    onStderr(String(data));
  });

  subprocess.stdout.on("data", data => {
    onStdout(String(data));
  });

  return {
    stop: () => subprocess.kill("SIGTERM")
  };
};
