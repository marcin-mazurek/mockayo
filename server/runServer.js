const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const initializeControlUI = require("./initializeControlUI");
const { getConfig, getEndpointConfig } = require("./config");
const { getScenarioPath } = require("./utils");
const { getEndpointScenario } = require("./endpointState");
const { DEFAULT_CODE } = require("./defaults");
const requireFresh = require("./requireFresh");

module.exports = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use("/__admin", initializeControlUI());

  app.use("*", (req, res) => {
    try {
      const url = req.originalUrl;
      const method = req.method;

      const endpointConfig = getEndpointConfig(url, method);

      if (!endpointConfig) {
        return res.status(404).send();
      }

      const scenarioName = getEndpointScenario(url, method);

      console.log(
        `Request received: ${method} ${url} - serving ${scenarioName} scenario`
      );

      const scenarioPath = getScenarioPath(endpointConfig, scenarioName);

      if (!fs.existsSync(scenarioPath)) {
        return res
          .status(400)
          .send(
            `Chosen scenario - ${scenarioName} - doesn't exist. File path inspected: ${scenarioPath}`
          );
      }

      const responseConfig = requireFresh(scenarioPath);
      return res
        .status(responseConfig.code || DEFAULT_CODE)
        .send(responseConfig.body);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });

  try {
    const config = getConfig();
    const port = config.port || 8080;
    const baseUrl = config.uiBaseUrl || "http://localhost";

    app.listen(port, () => {
      console.log(
        `Mock server is running on port ${port}. Open the UI to control the server behaviour: ${baseUrl}:${port}/__admin`
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
