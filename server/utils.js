const path = require("path");

const { DEFAULT_HTTP_METHOD } = require('./defaults');
const { getConfig } = require("./config");

const getScenarioPath = (endpointConfig, scenario) =>
  path.resolve(
    process.cwd(),
    getConfig("baseDirectory"),
    endpointConfig.directory,
    scenario
  );

const generateKeyForRequest = (url, method = DEFAULT_HTTP_METHOD) =>
  `${method}##${url}`;

const createScenarioModel = scenario => {
  const label = scenario
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace(".js", "");

  return { name: scenario, label };
};

const createEndpointModel = (entry, scenarios, selectedScenario) => ({
  ...entry,
  scenarios,
  selectedScenario
});

module.exports = {
  getScenarioPath,
  generateKeyForRequest,
  createScenarioModel,
  createEndpointModel
};
