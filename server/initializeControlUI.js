const express = require("express");
const path = require("path");
const fs = require("fs");

const { getConfig, getEndpointConfig } = require("./config");

const {
  createScenarioModel,
  createEndpointModel,
  getScenarioPath
} = require("./utils");

const { getEndpointScenario, setEndpointScenario } = require("./endpointState");

module.exports = () => {
  const router = express.Router();

  router.use(express.static(path.resolve(__dirname, "../ui")));

  router.get("/get-endpoints", (_, res) => {
    try {
      const config = getConfig();

      const model = config.mocks.map(endpointConfig => {
        const scenariosPath = path.resolve(
          process.cwd(),
          config.baseDirectory,
          endpointConfig.directory
        );

        const scenarios = fs
          .readdirSync(scenariosPath)
          .filter(fileName => !fileName.startsWith("_"))
          .map(createScenarioModel);

        const selectedScenario = getEndpointScenario(
          endpointConfig.url,
          endpointConfig.method
        );

        return createEndpointModel(endpointConfig, scenarios, selectedScenario);
      });

      res.json(model);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });

  router.post("/set-scenario", (req, res) => {
    try {
      const params = req.body;
      const scenarioToServe = params.file;

      const endpointConfig = getEndpointConfig(params.url, params.method);
      const scenarioPath = getScenarioPath(endpointConfig, scenarioToServe);

      if (!fs.existsSync(scenarioPath)) {
        return res
          .status(400)
          .send(
            `Chosen scenario - ${scenarioToServe} - doesn't exist. File path inspected: ${scenarioPath}`
          );
      }

      setEndpointScenario(params.url, params.method, scenarioToServe);

      console.log(
        `Scenario for ${params.method} ${params.url} changed to ${params.file}`
      );
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });

  return router;
};
